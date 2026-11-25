// The pages of the "Solutions" menu, in one place: sectors, business needs and partner solutions.
// `key` is the name of the label in nav.links (src/messages/{fr,en}/home.json); `slug` is the name of the content file.
import type { IconType } from "react-icons";
import {
  RiAlarmWarningLine,
  RiBankLine,
  RiBaseStationLine,
  RiBuilding2Line,
  RiCommunityLine,
  RiDashboard3Line,
  RiDropLine,
  RiFlashlightLine,
  RiFlightTakeoffLine,
  RiGlassesLine,
  RiGovernmentLine,
  RiGraduationCapLine,
  RiHeartPulseLine,
  RiLeafLine,
  RiLineChartLine,
  RiMapPin2Line,
  RiMapPinTimeLine,
  RiMapPinUserLine,
  RiOilLine,
  RiPieChartLine,
  RiRadarLine,
  RiShieldCheckLine,
  RiShieldFlashLine,
  RiShoppingBag3Line,
  RiSignalTowerLine,
  RiSpeedLine,
  RiToolsLine,
  RiTruckLine,
} from "react-icons/ri";

export type CatalogEntry = { key: string; slug: string; href: string; icon: IconType };

/** Sectors: content in industries/<slug>/overview.json. */
export const SECTORS: CatalogEntry[] = [
  { key: "municipalities", slug: "municipalities", href: "/industries/municipalities/overview", icon: RiGovernmentLine },
  { key: "electricAndGasUtilities", slug: "electric-gas-utilities", href: "/industries/electric-gas-utilities/overview", icon: RiFlashlightLine },
  { key: "petroleum", slug: "petroleum", href: "/industries/petroleum/overview", icon: RiOilLine },
  { key: "telecommunications", slug: "telecommunications", href: "/industries/telecommunications/overview", icon: RiSignalTowerLine },
  { key: "transportation", slug: "transportation", href: "/industries/transportation/overview", icon: RiTruckLine },
  { key: "banking", slug: "banking", href: "/industries/banking/overview", icon: RiBankLine },
  { key: "insurance", slug: "insurance", href: "/industries/insurance/overview", icon: RiShieldCheckLine },
  { key: "health", slug: "health", href: "/industries/health/overview", icon: RiHeartPulseLine },
  { key: "education", slug: "education", href: "/industries/education/overview", icon: RiGraduationCapLine },
  { key: "retailAndCPG", slug: "retail", href: "/industries/retail/overview", icon: RiShoppingBag3Line },
  { key: "naturalResources", slug: "natural-resources", href: "/industries/natural-resources/overview", icon: RiLeafLine },
];

/** Business needs: content in industries/needs/<slug>.json. */
export const NEEDS: CatalogEntry[] = [
  { key: "AssetTrackingAndAnalysis", slug: "asset-tracking-analysis", href: "/industries/needs/asset-tracking-analysis", icon: RiRadarLine },
  { key: "logisticsFulfillment", slug: "logistics-fulfillment", href: "/industries/needs/logistics-fulfillment", icon: RiTruckLine },
  { key: "marketCustomerAnalysis", slug: "market-customer-analysis", href: "/industries/needs/market-customer-analysis", icon: RiPieChartLine },
  { key: "operationalEfficiency", slug: "operational-efficiency", href: "/industries/needs/operational-efficiency", icon: RiSpeedLine },
  { key: "realTimeLocation", slug: "real-time-location-tracking", href: "/industries/needs/real-time-location-tracking", icon: RiMapPinTimeLine },
  { key: "siteAnalysisTerritory", slug: "site-analysis-territory-planning", href: "/industries/needs/site-analysis-territory-planning", icon: RiMapPin2Line },
  { key: "economicDevelopment", slug: "economic-development", href: "/industries/needs/economic-development", icon: RiLineChartLine },
  { key: "facilityManagement", slug: "facility-management", href: "/industries/needs/facility-management", icon: RiCommunityLine },
  { key: "fieldServiceManagement", slug: "field-service-management", href: "/industries/needs/field-service-management", icon: RiToolsLine },
  { key: "performanceMonitoring", slug: "performance-monitoring", href: "/industries/needs/performance-monitoring", icon: RiDashboard3Line },
  { key: "situationalAwareness", slug: "situational-awareness", href: "/industries/needs/situational-awareness", icon: RiShieldFlashLine },
];

/** Partner solutions (the folder names differ from the menu addresses, which are redirected to them). */
export const SOLUTIONS: CatalogEntry[] = [
  { key: "oilSpillMonitoring", slug: "oil", href: "/industries/solutions/oil", icon: RiDropLine },
  { key: "geoAttendance", slug: "geoAttendance", href: "/industries/solutions/geo-attendance", icon: RiMapPinUserLine },
  { key: "pulsiam", slug: "pulsiam", href: "/industries/solutions/pulsiam", icon: RiAlarmWarningLine },
  { key: "vgis", slug: "vgis", href: "/industries/solutions/vgis", icon: RiGlassesLine },
  { key: "buildingAndFacilitiesManagement", slug: "buildingAndFacilitiesManagement", href: "/industries/solutions/building-and-facilities-management", icon: RiBuilding2Line },
  { key: "telecominfrastructureManagement", slug: "gdi", href: "/industries/solutions/gdi", icon: RiBaseStationLine },
  { key: "droneSurveillance", slug: "drone", href: "/industries/solutions/drone", icon: RiFlightTakeoffLine },
];
