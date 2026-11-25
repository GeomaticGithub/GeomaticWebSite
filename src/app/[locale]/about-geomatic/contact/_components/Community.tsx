"use client";
import { CommonText } from "@/i18n/useCommon";

import Link from "next/link";
import {
  HiOutlineArrowUpRight,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineCog6Tooth,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

type Props = {
  data: {
    title: string;
    cards: {
      title: string;
      desc?: string;
      image?: string;
      gradient: string;
      link: string;
      cta?: string;
    }[];
  };
  locale: string;
};

const getIcon = (title: string, cta?: string) => {
  const iconClass = "h-6 w-6";

  if (cta?.includes("+965") || title.toLowerCase().includes("question")) {
    return <HiOutlinePhone className={iconClass} />;
  }
  if (
    cta?.toLowerCase().includes("email") ||
    title.toLowerCase().includes("service")
  ) {
    return <HiOutlineEnvelope className={iconClass} />;
  }
  if (
    title.toLowerCase().includes("training") ||
    title.toLowerCase().includes("learning")
  ) {
    return <HiOutlineAcademicCap className={iconClass} />;
  }
  if (title.toLowerCase().includes("consulting")) {
    return <HiOutlineUserGroup className={iconClass} />;
  }
  if (
    title.toLowerCase().includes("explore") ||
    title.toLowerCase().includes("website")
  ) {
    return <HiOutlineGlobeAlt className={iconClass} />;
  }
  if (title.toLowerCase().includes("sales")) {
    return <HiOutlineCog6Tooth className={iconClass} />;
  }
  return <HiOutlineArrowUpRight className={iconClass} />;
};

export default function Community({ data, locale }: Props) {
  // Helper function to add locale to internal links
  const getLocalizedLink = (link: string) => {
    // If it's an external link (http, mailto, tel), return as is
    if (
      link.startsWith("http") ||
      link.startsWith("mailto:") ||
      link.startsWith("tel:")
    ) {
      return link;
    }
    // If it's an internal link starting with /, add locale prefix
    if (link.startsWith("/")) {
      return `/${locale}${link}`;
    }
    // Otherwise return as is
    return link;
  };

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {data.title}
          </h2>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.cards.map((card, index) => (
            <Link
              key={index}
              href={getLocalizedLink(card.link)}
              target={
                card.link.startsWith("http") ||
                card.link.startsWith("mailto:") ||
                card.link.startsWith("tel:")
                  ? "_blank"
                  : undefined
              }
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200/50"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Card Content */}
              <div className="relative z-10 p-6 h-full flex flex-col">
                {/* Icon and Arrow */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-100 group-hover:bg-white/20 transition-all duration-300 text-slate-600 group-hover:text-white">
                    {getIcon(card.title, card.cta)}
                  </div>
                  <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0">
                    <HiOutlineArrowUpRight className="h-4 w-4 text-slate-600 group-hover:text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-white transition-colors duration-300 mb-2">
                    {card.title}
                  </h3>
                  {card.desc && (
                    <p className="text-slate-600 group-hover:text-white/90 transition-colors duration-300 text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  )}
                </div>

                {/* CTA */}
                {card.cta && (
                  <div className="mt-4 pt-4 border-t border-slate-200 group-hover:border-white/20 transition-colors duration-300">
                    <span className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:text-white transition-colors duration-300">
                      {card.cta}
                      <HiOutlineArrowUpRight className="ml-1 h-3 w-3 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </span>
                  </div>
                )}
              </div>

              {/* Hover Glow Effect */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"
                style={{ animationDuration: "1s" }}
              />
            </Link>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-slate-500 text-sm">
            <div className="h-px w-8 bg-slate-300"></div>
            <span><CommonText k="hereToHelp" /></span>
            <div className="h-px w-8 bg-slate-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
