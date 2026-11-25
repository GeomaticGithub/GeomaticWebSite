"use client";

import { useRef } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useDialog } from "@/app/[locale]/_components/useDialog";
import { useCommon } from "@/i18n/useCommon";

/** Turns a YouTube watch URL into an embeddable one; other URLs are returned unchanged. */
export function toEmbedUrl(url: string) {
  return url.replace("watch?v=", "embed/");
}

/**
 * Accessible, translated video dialog: Escape closes it, focus stays inside
 * and returns to the button that opened it.
 */
export default function VideoModal({
  open,
  url,
  onClose,
  title,
}: {
  open: boolean;
  url: string;
  onClose: () => void;
  /** Heading shown above the video; defaults to "Watch the video". */
  title?: string;
}) {
  const t = useCommon();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  useDialog(open, panelRef, onClose, closeRef);

  if (!open || !url) return null;
  const heading = title || t.watchVideo;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 id="video-modal-title" className="text-lg font-semibold">
            {heading}
          </h3>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.closeVideo}
            className="p-1 rounded text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <RiCloseLine className="w-6 h-6" aria-hidden />
          </button>
        </div>
        <div className="relative" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={toEmbedUrl(url)}
            title={heading}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
