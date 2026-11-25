// Checks the mail settings of the contact form (.env.local) without going through the site.
//   node tools/mail-test.mjs          -> connects to the mail server and logs in; sends nothing
//   node tools/mail-test.mjs --send   -> also sends one short test message to each mailbox
// The defaults below are the same as in src/app/api/contact/route.ts.
import nextEnv from "@next/env";
import nodemailer from "nodemailer";

nextEnv.loadEnvConfig(process.cwd(), true, { info: () => {}, error: console.error });

const env = (name, fallback = "") => (process.env[name] ?? "").trim() || fallback;
const host = env("SMTP_HOST");
const port = Number(env("SMTP_PORT")) || 587;
const user = env("SMTP_USER");
const pass = process.env.SMTP_PASS ?? "";
const general = env("CONTACT_TO", "contact@geomatic.ma");
const boxes = {
  "Autre demande": general,
  "Ventes et licences": env("CONTACT_TO_SALES", "sales@geomatic.ma"),
  "Support et service client": env("CONTACT_TO_SUPPORT", "support@geomatic.ma"),
  Formation: env("CONTACT_TO_TRAINING", general),
  Conseil: env("CONTACT_TO_CONSULTING", general),
};
const from = env("CONTACT_FROM", user.includes("@") ? user : general);

const tlsName = env("SMTP_TLS_SERVERNAME");

console.log("Serveur      :", host ? `${host}:${port}` : "(SMTP_HOST vide)", tlsName ? `— certificat vérifié sous le nom ${tlsName}` : "");
console.log("Compte       :", user || "(SMTP_USER vide)", pass ? "— mot de passe renseigné" : "— SMTP_PASS vide");
console.log("Expéditeur   :", from);
for (const [topic, to] of Object.entries(boxes)) console.log(`${topic.padEnd(26)}-> ${to}`);
// The site should not hold the password of a mailbox that people read.
if (user && Object.values(boxes).some((to) => to.toLowerCase() === user.toLowerCase())) {
  console.log(
    `\nConseil de sécurité : ${user} est aussi une boîte de réception. Créez plutôt une boîte réservée au site` +
      " (par exemple site@geomatic.ma) et mettez-la dans SMTP_USER : le mot de passe de vos boîtes de travail n’est alors écrit nulle part."
  );
}

if (!host) {
  console.error("\nSMTP_HOST est vide dans .env.local : le formulaire ne peut pas envoyer d’e-mail.");
  process.exit(1);
}

// Without a password, only the connection is checked: no login is attempted with an empty password.
const login = Boolean(user && pass);
const secure = env("SMTP_SECURE") ? env("SMTP_SECURE") === "true" : port === 465;
const transport = nodemailer.createTransport({
  host,
  port,
  secure,
  // same rule as the site: no login and no message without encryption
  requireTLS: !secure && env("SMTP_REQUIRE_TLS") !== "false",
  auth: login ? { user, pass } : undefined,
  tls: tlsName ? { servername: tlsName } : undefined,
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
});

try {
  await transport.verify();
  console.log(login ? "\nConnexion et identification : OK" : "\nConnexion sécurisée au serveur : OK");
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`\n${login ? "Connexion ou identification refusée" : "Connexion refusée"} :`, message);
  if (/altnames/i.test(message)) {
    const names = [...message.matchAll(/DNS:([^,\s]+)/g)].map((m) => m[1]);
    const wildcard = names.find((n) => n.startsWith("*."));
    const suggestion = wildcard ? wildcard.replace("*.", "smtp.") : names[0];
    console.error(
      `Le certificat du serveur est émis pour ${names.join(", ") || "un autre nom"}, pas pour ${host}.` +
        (suggestion ? `\nAjoutez dans .env.local :  SMTP_TLS_SERVERNAME=${suggestion}` : "")
    );
  }
  process.exit(1);
}

if (!login) {
  console.error(
    user
      ? "SMTP_PASS est vide dans .env.local : l’identification n’a pas été testée et le formulaire ne pourra pas envoyer d’e-mail."
      : "SMTP_USER est vide dans .env.local : l’identification n’a pas été testée."
  );
  process.exit(1);
}

if (process.argv.includes("--send")) {
  let failed = false;
  for (const to of new Set(Object.values(boxes))) {
    try {
      await transport.sendMail({
        from: { name: "Site web Geomatic", address: from },
        to,
        subject: "[Site web] Message de test",
        text: `Message de test du formulaire de contact du site.\nSi vous le recevez, la boîte ${to} est bien configurée.`,
      });
      console.log(`Message de test envoyé à ${to}`);
    } catch (err) {
      failed = true;
      console.error(`Envoi refusé pour ${to} :`, err instanceof Error ? err.message : err);
    }
  }
  if (failed) process.exit(1);
} else {
  console.log("Aucun message envoyé. Pour envoyer un message de test à chaque boîte : npm run mail:send-test");
}
