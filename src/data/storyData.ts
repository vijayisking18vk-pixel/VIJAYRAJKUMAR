export interface Venture {
  index: string;
  id: string;
  name: string;
  role: string;
  tagline: string;
  description: string;
  url: string | null;
  status: string;
  badge: string;
  accent: string;
}

export interface EducationEntry {
  period: string;
  school: string;
  note: string;
  metric?: string;
}

export const STORY_DATA = {
  founder: {
    name: "R. VIJAYRAJKUMAR",
    shortName: "R.V",
    age: 21,
    dob: "05.04.2005",
    birthplace: "Kovilpatti, Tuticorin (Thoothukudi)",
    currentBase: "Madambakkam, Chennai 600126",
    state: "Tamil Nadu, India",
    coordinates: "12.9056° N, 80.1582° E",
    tagline: "21. Debarred by the system. Building an empire anyway.",
    creed: "Non-technical. Debarred. Written off. Still standing — and running three companies at 21. I don't wait for permission or degrees to build.",
  },
  roles: [
    { title: "CEO", company: "DAAS MEDIA" },
    { title: "CEO", company: "CHENNAI RENTS" },
    { title: "CEO", company: "SCHLOSS LIVING" },
    { title: "OPS", company: "DISTRIBUTION" },
  ],
  education: [
    {
      period: "LKG",
      school: "St. Joseph Matriculation Higher Secondary School",
      note: "Early foundations in Kovilpatti roots.",
    },
    {
      period: "UKG",
      school: "Boaz School",
      note: "Transition to metropolitan schooling.",
    },
    {
      period: "STD I – XII",
      school: "Zion Matriculation Higher Secondary School",
      note: "Consistently above 85%+ without sweating — until the world stopped in 2020.",
      metric: "85%+",
    },
  ] as EducationEntry[],
  blackout: {
    year: "2020",
    standard: "10th Standard Lockdown",
    headline: "The Screen Replaced the World. Then Everything Crashed.",
    quote: "When discipline dies, talent counts for nothing.",
    story: "Stopped listening to online classes. Failed terminal exams. Took heavy scoldings from family. Entered 11th and 12th bearing the label of a weak student thrown head-first into a brutal, high-pressure Biology stream.",
  },
  defence: {
    institution: "SRMIST Kattankulathur (KTR)",
    degree: "B.Sc. Defence and Strategic Studies",
    spark: "Stories of discipline, fighter jets, and tactical resolve narrated by his father from his Indian Air Force career.",
    trap: "Moved into hostel to fix school-era habits. Instead, total lack of supervision fed peak laziness. Ambition stalled.",
    attendance: {
      actual: 70,
      required: 75,
      status: "DEBARRED",
    },
    timeline: {
      planned: "3 YEARS",
      extended: "5 YEARS",
      status: "Rejoined, course extended, still unfinished past year 4.",
    },
    quote: "Rock bottom wasn't dramatic. It was quiet, slow, and entirely my own doing.",
  },
  turningPoint: {
    spark: "A phone call from a friend rallying the gang around startup ventures in the depth of academic limbo.",
    insecurity: "Every single friend in the room was technical. Vijayrajkumar wasn't. The brutal imposter voice hit: What do I even bring to this room?",
    decision: "Stayed in the arena anyway. Backed the trust his friends had in him. Learned commercial distribution, operations, and raw execution on the fly.",
    theFive: 5,
    quote: "Everyone else chose the safe road. Five of us stayed. That was enough.",
  },
  ventures: [
    {
      index: "01",
      id: "daas-media",
      name: "DAAS MEDIA",
      role: "Chief Executive Officer",
      tagline: "Digital Media & Brand Architecture",
      description: "Modern creative engineering, high-impact brand narrative design, digital media platforms, and distribution pipelines built for the attention economy.",
      url: "https://daas.media/",
      status: "ACTIVE ENTERPRISE",
      badge: "MEDIA & BRANDING",
      accent: "#9D00FF",
    },
    {
      index: "02",
      id: "chennai-rents",
      name: "CHENNAI RENTS",
      role: "Chief Executive Officer",
      tagline: "Locality-First Rental Guide & Urban Platform",
      description: "Solving real-world urban rental friction across Chennai. Eliminating broker exploitation through transparent, street-level verified locality listings.",
      url: "https://www.chennairents.in/",
      status: "ACTIVE PLATFORM",
      badge: "REAL ESTATE TECH",
      accent: "#D147FF",
    },
    {
      index: "03",
      id: "schloss-living",
      name: "SCHLOSS LIVING",
      role: "Chief Executive Officer",
      tagline: "Elevated Living Spaces & Modern Stays",
      description: "Premium managed accommodations and hospitality architecture crafted for discerning urban dwellers and transient builders seeking aesthetic sanctuary.",
      url: "https://www.schloss.living/",
      status: "SCALING",
      badge: "HOSPITALITY",
      accent: "#4B009E",
    },
    {
      index: "04",
      id: "distribution",
      name: "DISTRIBUTION & SUPPLY",
      role: "Operations & Supply Lead",
      tagline: "Ground-Level Commercial Movement",
      description: "Real-world commercial supply chains, offline merchant networks, and high-velocity physical distribution systems operating beyond the screen.",
      url: null,
      status: "OPERATIONAL",
      badge: "LOGISTICS & TRADE",
      accent: "#F8ECFF",
    },
  ] as Venture[],
  chapters: [
    { id: "hero", label: "00 // COMMAND", title: "THE STOIC VOID" },
    { id: "origin", label: "01 // ORIGIN", title: "THE MISCHIEVOUS SPARK" },
    { id: "blackout", label: "02 // 2020", title: "THE COVID BLACKOUT" },
    { id: "defence", label: "03 // LABYRINTH", title: "DEFENCE & DEBARRED" },
    { id: "turning-point", label: "04 // THE FIVE", title: "THE REMAINING FIVE" },
    { id: "empire", label: "05 // EMPIRE", title: "COMMAND DECK AT 21" },
    { id: "signal", label: "06 // SIGNAL", title: "THE MANIFESTO" },
  ],
};
