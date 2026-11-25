"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible dialog behaviour for modals and drawers:
 * - Escape closes it
 * - Tab / Shift+Tab stay inside the container (focus trap)
 * - focus moves into the dialog on open (initialFocus, else first focusable)
 * - focus returns to the element that opened it on close
 */
export function useDialog(
  open: boolean,
  containerRef: RefObject<HTMLElement | null>,
  onClose: () => void,
  initialFocusRef?: RefObject<HTMLElement | null>
) {
  // Keep the latest onClose without re-running the effect on every render.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []
      ).filter(
        (el) =>
          el.tabIndex >= 0 &&
          (el.offsetParent !== null || el === document.activeElement)
      );

    // Wait a frame so the dialog is rendered/visible before focusing.
    const raf = requestAnimationFrame(() => {
      (initialFocusRef?.current ?? focusables()[0])?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = containerRef.current?.contains(active);
      if (e.shiftKey && (active === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      // Return focus to the opener if it is still in the page.
      if (opener && document.contains(opener)) opener.focus();
    };
  }, [open, containerRef, initialFocusRef]);
}
