// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optional separate build folder (e.g. NEXT_DIST_DIR=.next-verify) so a production
  // build can run without overwriting the .next folder used by a running `next dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // This folder is the project root (an empty package-lock.json in the parent folder would otherwise be taken for it).
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en-ma", // change if needed
        permanent: false,
      },
      // Partner Solutions redirects
      {
        source: "/:locale/industries/solutions/oil-spill-monitoring",
        destination: "/:locale/industries/solutions/oil",
        permanent: false,
      },
      {
        source: "/:locale/industries/solutions/building-facilities-management",
        destination:
          "/:locale/industries/solutions/building-and-facilities-management",
        permanent: false,
      },
      {
        source:
          "/:locale/industries/solutions/telecom-infrastructure-management",
        destination: "/:locale/industries/solutions/gdi",
        permanent: false,
      },
      {
        source: "/:locale/industries/solutions/drone-surveillance",
        destination: "/:locale/industries/solutions/drone",
        permanent: false,
      },
    ];
  },
};
module.exports = nextConfig;
