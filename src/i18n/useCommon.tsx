"use client";

import { useParams } from "next/navigation";
import { getCommon, type CommonKey } from "./common";

/** Shared UI strings for the current URL locale (client components). */
export function useCommon() {
  const params = useParams<{ locale?: string }>();
  return getCommon(params?.locale);
}

/**
 * Renders one shared UI string in the current locale.
 * Works inside server components too (it is a client leaf), so they need no locale prop.
 */
export function CommonText({ k }: { k: CommonKey }) {
  return <>{useCommon()[k]}</>;
}
