export const mockGeo = {
  counties: [
    {
      name: "Broward",
      zips: [
        { zip: "33021", name: "Hollywood", cases_count: 26, hot_count: 8 },
        { zip: "33023", name: "Miramar", cases_count: 19, hot_count: 6 },
      ],
    },
    {
      name: "Miami-Dade",
      zips: [
        { zip: "33147", name: "NW Miami", cases_count: 31, hot_count: 10 },
        { zip: "33142", name: "Allapattah", cases_count: 22, hot_count: 7 },
      ],
    },
  ],
};

export const mockCases = [
  {
    id: "c1",
    case_number: "CACE-25-012345",
    filing_date: "2025-10-24",
    status: "Active",
    doc_type: "Lis Pendens",
    owner_1: "Ben Adams",
    situs_address: "123 Main St, Hollywood, FL 33021",
    lead_score: 8,
    phones_verified: 2,
    phones_total: 3,
    latest_event_desc: "Pre-foreclosure notice published",
    latest_event_at: "2025-10-31T21:05:00Z",
  },
  {
    id: "c2",
    case_number: "CACE-25-012346",
    filing_date: "2025-10-22",
    status: "Active",
    doc_type: "Final Judgment",
    owner_1: "Maria Rodriguez",
    situs_address: "456 Oak Ave, Miramar, FL 33023",
    lead_score: 9,
    phones_verified: 3,
    phones_total: 3,
    latest_event_desc: "Final judgment entered by court",
    latest_event_at: "2025-10-30T14:30:00Z",
  },
  {
    id: "c3",
    case_number: "CACE-25-012347",
    filing_date: "2025-10-20",
    status: "Active",
    doc_type: "Sale Scheduled",
    owner_1: "John Smith",
    situs_address: "789 Palm Dr, NW Miami, FL 33147",
    lead_score: 7,
    phones_verified: 1,
    phones_total: 2,
    latest_event_desc: "Foreclosure sale scheduled for Nov 15",
    latest_event_at: "2025-10-29T10:00:00Z",
  },
];

export const mockCaseDetail = {
  id: "c1",
  case_number: "CACE-25-012345",
  filing_date: "2025-10-24",
  status: "Active",
  doc_type: "Lis Pendens",
  owner_1: "Ben Adams",
  lead_score: 8,
  property: {
    address: "123 Main St, Hollywood, FL 33021",
    apn: "5042-03-123-4560",
    portal_link: "https://broward.clerkofcourts.org/case/CACE-25-012345",
  },
  parties: [
    { name: "Ben Adams", role: "Defendant" },
    { name: "Sarah Adams", role: "Defendant" },
    { name: "First National Bank", role: "Plaintiff" },
    { name: "Johnson & Associates", role: "Attorney" },
  ],
  contacts: [
    {
      name: "Ben Adams",
      role: "Owner",
      phones: [
        { number: "(954) 555-0101", verified: "verified" },
        { number: "(954) 555-0102", verified: "verified" },
        { number: "(954) 555-0103", verified: "unknown" },
      ],
      emails: [
        { email: "ben.adams@email.com", status: "verified" },
      ],
    },
    {
      name: "Sarah Adams",
      role: "Co-Owner",
      phones: [
        { number: "(954) 555-0201", verified: "invalid" },
      ],
      emails: [],
    },
  ],
  events: [
    {
      type: "Notice",
      desc: "Pre-foreclosure notice published",
      at: "2025-10-31T21:05:00Z",
    },
    {
      type: "Filing",
      desc: "Lis Pendens filed with clerk",
      at: "2025-10-24T09:15:00Z",
    },
    {
      type: "Service",
      desc: "Defendant served at property address",
      at: "2025-10-20T14:30:00Z",
    },
  ],
};
