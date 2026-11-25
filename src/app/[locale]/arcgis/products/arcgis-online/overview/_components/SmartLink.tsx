import type { ReactNode } from "react";
import Link from "next/link";

/** A link is usable when it is a page of this site ("/…") or a full web address; "#" and "" are not. */
export const linkKind = (href?: string) =>
  !href || href === "#" ? "none" : /^https?:\/\//.test(href) ? "external" : "internal";

/**
 * Link to a page of this site (the locale is added), to another site (new tab),
 * or plain text when the content has no address yet, so there is never a dead link.
 */
export default function SmartLink({
  href,
  locale,
  className,
  children,
}: {
  href?: string;
  locale: string;
  className?: string;
  children: ReactNode;
}) {
  const kind = linkKind(href);
  if (kind === "none") return <span className={className}>{children}</span>;
  if (kind === "external") {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={`/${locale}${href}`} className={className}>
      {children}
    </Link>
  );
}
