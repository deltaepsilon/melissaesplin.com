export const LEADS_API_URL =
  process.env.NEXT_PUBLIC_LEADS_API_URL || "https://www.calligraphy.org/api/leads";

// Valid serviceRequested values accepted by calligraphy.org/api/leads
export const SERVICE_TYPES = [
  { value: "engraving", label: "Live Onsite Engraving (Fragrance, Glass, Metal)" },
  { value: "corporate-services", label: "Brand Activation / Live Event Calligraphy & Painting" },
  { value: "wedding-calligraphy", label: "Wedding Calligraphy & Signage" },
  { value: "envelope-addressing", label: "Envelope Addressing" },
  { value: "place-cards", label: "Place Cards & Menus" },
  { value: "custom-invitations", label: "Custom Invitations & Stationery" },
  { value: "hand-lettering", label: "Custom Hand Lettering & Commission" },
  { value: "signage", label: "Event Signage" },
  { value: "classes-workshops", label: "Private Workshop or Class" },
  { value: "other", label: "Other" },
] as const;

export const BUDGETS = [
  { value: "under-250", label: "Under $250" },
  { value: "250-500", label: "$250 – $500" },
  { value: "500-1000", label: "$500 – $1,000" },
  { value: "1000-2500", label: "$1,000 – $2,500" },
  { value: "2500-plus", label: "$2,500+" },
  { value: "not-sure", label: "Not Sure Yet" },
] as const;

export const TIMELINES = [
  { value: "asap", label: "ASAP / Rush" },
  { value: "1-month", label: "Within 1 month" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "6-plus-months", label: "6+ months" },
  { value: "flexible", label: "Flexible" },
] as const;

export const US_STATES = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" }, { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" }, { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" }, { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" }, { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" }, { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" }, { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" }, { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" }, { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" }, { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" }, { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" }, { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" }, { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" },
] as const;

export function tomorrowIsoDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
