import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import { SECTORS } from "@/app/[locale]/industries/catalog";

type WhoUsesMsgs = { title: string; subtitle: string; clientsTitle: string };

// Selection of recent and major clients.
// Official names, identical in every locale.
// Logo = file in public/clients/ (null = no logo available yet, the name is shown instead).
const CLIENTS: [string, string, string | null][] = [
  ["Bank Al-Maghrib", "Banque centrale du Maroc", "/clients/bam.png"],
  ["OCP", "Groupe OCP", "/clients/ocp.png"],
  ["Attijariwafa bank", "Groupe bancaire", "/clients/attijari.png"],
  ["BCP", "Banque Centrale Populaire", "/clients/bcp.png"],
  ["ONCF", "Office National des Chemins de Fer", "/clients/oncf.png"],
  ["MASEN", "Moroccan Agency for Sustainable Energy", "/clients/masen.png"],
  ["Maroc Telecom", "Opérateur télécom", "/clients/iam.png"],
  ["inwi", "Opérateur télécom", "/clients/inwi.png"],
  ["Managem", "Groupe minier", "/clients/managem.png"],
  ["CDG", "Caisse de Dépôt et de Gestion", "/clients/cdg.png"],
  ["ONHYM", "Office National des Hydrocarbures et des Mines", "/clients/onhym.png"],
  ["PNUD", "Programme des Nations Unies pour le Développement", "/clients/pnud.png"],
  ["Ministère de l'Équipement et de l'Eau", "Direction Générale de l'Hydraulique", "/clients/mee.png"],
  ["Région Casablanca-Settat", "Collectivité territoriale", "/clients/region.png"],
  ["ANCFCC", "Conservation Foncière, Cadastre et Cartographie", "/clients/ancfcc.png"],
  ["SRM Casablanca-Settat (ex-Lydec)", "Distribution d'eau et d'électricité", "/clients/lydec.png"],
  ["COSUMAR", "Groupe sucrier", "/clients/cosumar.png"],
  ["JICA", "Agence Japonaise de Coopération Internationale", "/clients/jica.png"],
  ["IAV Hassan II", "Institut Agronomique et Vétérinaire", "/clients/iav.png"],
];

// The sectors (labels of the nav menu, routes, icons) are shared with the /industries page.

export default function WhoUses({
  data,
  labels,
  locale,
}: {
  data: WhoUsesMsgs;
  labels: Record<string, string>;
  locale: string;
}) {
  return (
    <section id="secteurs" className="scroll-mt-16 bg-gray-50 border-y border-gray-200">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-3xl">
          <h2 className="text-[28px] sm:text-[36px] font-semibold text-gray-900">
            {data.title}
          </h2>
          <p className="mt-3 text-gray-600 text-[16px] leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        <ul className="mt-10 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {SECTORS.map(({ key, href, icon: Icon }) => (
            <li key={key}>
              <Link
                href={`/${locale}${href}`}
                className="group flex h-full items-center gap-4 bg-white border border-gray-200 border-l-4 border-l-transparent px-4 py-4 transition hover:border-l-sky-600 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-700 transition group-hover:bg-sky-600 group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="flex-1 text-[15px] font-medium text-gray-800 group-hover:text-sky-700">
                  {labels[key]}
                </span>
                <RiArrowRightLine
                  className="h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-sky-700"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>

        <h3 className="mt-14 text-[20px] sm:text-[22px] font-semibold text-gray-900">
          {data.clientsTitle}
        </h3>
        {/* Auto-scrolling logo strip: list rendered twice so the loop is seamless; pauses on hover. */}
        <div className="group mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto">
          <ul className="flex w-max gap-4 py-2 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[...CLIENTS, ...CLIENTS].map(([name, desc, logo], i) => (
              <li
                key={i}
                title={`${name} — ${desc}`}
                aria-hidden={i >= CLIENTS.length}
                className="bg-white border border-gray-200 h-32 w-60 shrink-0 flex items-center justify-center px-6"
              >
                {logo ? (
                  <img
                    src={logo}
                    alt={i < CLIENTS.length ? name : ""}
                    loading="lazy"
                    className="h-[72px] w-full max-w-[180px] object-contain"
                  />
                ) : (
                  <span className="text-center text-[17px] font-bold tracking-tight text-gray-900">
                    {name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
