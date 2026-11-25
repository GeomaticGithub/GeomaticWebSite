import type { NavMessages, MenuEntry } from "./types";

export type Menus = {
  products: MenuEntry;
  solutions: MenuEntry;
  support: MenuEntry;
  news: MenuEntry;
  about: MenuEntry;
};

/* Build the localized menu object based on your fixed URLs */
export function buildMenus(nav: NavMessages): Menus {
  const L = nav.links;
  const H = nav.headings;

  return {
    products: {
      label: nav.products,
      sections: [
        {
          [H.capabilities]: {
            links: [
              { label: L.mapping, href: "/products/capabilities/mapping" },
              {
                label: L.fieldOperations,
                href: "/products/capabilities/field-operations",
              },
              {
                label: L.spatialAnalytics,
                href: "/arcgis/products/spatial-analytics-data-science/overview",
              },
              { label: L.threeD, href: "/arcgis/3d-gis/overview" },
            ],
          },
        },
        {
          [H.gisAndMappingProducts]: {
            links: [
              {
                label: L.arcgisOnline,
                href: "/arcgis/products/arcgis-online/overview",
              },
              {
                label: L.arcgisPro,
                href: "/arcgis/products/arcgis-pro/overview",
              },
              {
                label: L.arcgisEnterprise,
                href: "/arcgis/products/arcgis-enterprise/overview",
              },
              {
                label: L.arcgisForDevelopers,
                href: "/arcgis/products/arcgis-for-developers/overview",
              },
            ],
          },
        },
        {
          [H.locationEnabledProducts]: {
            links: [
              {
                label: L.arcgisUrban,
                href: "/arcgis/products/arcgis-urban/overview",
              },
              {
                label: L.arcgisBusinessAnalyst,
                href: "/arcgis/products/arcgis-business-analyst/overview",
              },
              {
                label: L.arcgisHub,
                href: "/arcgis/products/arcgis-hub/overview",
              },
              {
                label: L.arcgisExcalibur,
                href: "/arcgis/products/arcgis-excalibur/overview",
              },
              {
                label: L.arcgisMission,
                href: "/arcgis/products/arcgis-mission/overview",
              },
              {
                label: L.arcgisIndoors,
                href: "/arcgis/products/arcgis-indoors/overview",
              },
            ],
          },
        },
        {
          [H.locationAnalytics]: {
            links: [
              {
                label: L.arcgisInsights,
                href: "/arcgis/products/arcgis-insights/overview",
              },
              {
                label: L.arcgisMapsForOffice,
                href: "/arcgis/products/arcgis-maps-for-office/overview",
              },
              {
                label: L.arcgisMapsForMicrosoftPowerBI,
                href: "/arcgis/products/arcgis-maps-for-power-bi/overview",
              },
              {
                label: L.arcgisMapsForSharePoint,
                href: "/arcgis/products/arcgis-maps-for-sharepoint/overview",
              },
            ],
          },
        },
        {
          [H.exploreMore]: {
            links: [
              { label: L.allProducts, href: "/arcgis/products/index" },
              { label: L.whatIsGis, href: "/what-is-gis/overview" },
            ],
          },
        },
      ],
    },
    solutions: {
      label: nav.solutions,
      sections: [
        {
          [H.businessNeeds]: {
            links: [
              {
                label: L.AssetTrackingAndAnalysis,
                href: "/industries/needs/asset-tracking-analysis",
              },
              {
                label: L.logisticsFulfillment,
                href: "/industries/needs/logistics-fulfillment",
              },
              {
                label: L.marketCustomerAnalysis,
                href: "/industries/needs/market-customer-analysis",
              },
              {
                label: L.operationalEfficiency,
                href: "/industries/needs/operational-efficiency",
              },
              {
                label: L.realTimeLocation,
                href: "/industries/needs/real-time-location-tracking",
              },
              {
                label: L.siteAnalysisTerritory,
                href: "/industries/needs/site-analysis-territory-planning",
              },
            ],
          },
        },
        {
          [H.industries]: {
            links: [
              { label: L.petroleum, href: "/industries/petroleum/overview" },
              { label: L.banking, href: "/industries/banking/overview" },
              { label: L.education, href: "/industries/education/overview" },
              {
                label: L.electricAndGasUtilities,
                href: "/industries/electric-gas-utilities/overview",
              },
              {
                label: L.municipalities,
                href: "/industries/municipalities/overview",
              },
              { label: L.health, href: "/industries/health/overview" },
              { label: L.insurance, href: "/industries/insurance/overview" },
              {
                label: L.telecommunications,
                href: "/industries/telecommunications/overview",
              },
              {
                label: L.transportation,
                href: "/industries/transportation/overview",
              },
              { label: L.retailAndCPG, href: "/industries/retail/overview" },
              {
                label: L.naturalResources,
                href: "/industries/natural-resources/overview",
              },
            ],
          },
        },
        {
          [H.partnersSolutions]: {
            links: [
              {
                label: L.oilSpillMonitoring,
                href: "/industries/solutions/oil-spill-monitoring",
              },
              {
                label: L.geoAttendance,
                href: "/industries/solutions/geo-attendance",
              },
              { label: L.pulsiam, href: "/industries/solutions/pulsiam" },
              { label: L.vgis, href: "/industries/solutions/vgis" },
              {
                label: L.buildingAndFacilitiesManagement,
                href: "/industries/solutions/building-facilities-management",
              },
              {
                label: L.telecominfrastructureManagement,
                href: "/industries/solutions/telecom-infrastructure-management",
              },
              {
                label: L.droneSurveillance,
                href: "/industries/solutions/drone-surveillance",
              },
            ],
          },
        },
      ],
    },
    support: {
      label: nav.support,
      sections: [
        {
          links: [
            {
              label: L.overview,
              href: "/support-services",
            },
            {
              label: L.consultancyServices,
              href: "/support-services/consulting",
            },
            {
              label: L.supportServices,
              href: "/support-services/support",
            },
            {
              label: L.learningServices,
              href: "/support-services/learning",
            },
          ],
        },
      ],
    },
    news: {
      label: nav.news,
      sections: [
        {
          heading: nav.headings.publications,
          links: [
            { label: L.overview, href: "/news" },
            { label: nav.links.newsletters, href: "/news/newsletter" },
            { label: nav.links.ebooks, href: "/news/ebook" },
            {
              label: nav.links.customerStories,
              href: "/news/customer-stories",
            },
          ],
        },
      ],
    },
    about: {
      label: nav.about,
      sections: [
        {
          links: [
            // one entry for the presentation page (it used to be listed twice, as "Overview" and "About us")
            {
              label: L.aboutUs,
              href: "/about-geomatic/overview",
            },
            { label: L.events, href: "/about-geomatic/events" },
            { label: L.partners, href: "/about-geomatic/partners" },
            { label: L.careers, href: "/about-geomatic/careers" },
            {
              label: L.contactUs,
              href: "/about-geomatic/contact",
            },
          ],
        },
      ],
    },
  };
}
