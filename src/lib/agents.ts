export type AgentStatus = "active" | "idle" | "in-training" | "paused" | "dismissed";
export type AgentExperience = "veteran" | "experienced" | "new";

export interface Agent {
  id: string;
  name: string;
  title: string;
  department: string;
  reportsTo: string | null;
  initials: string;
  status: AgentStatus;
  experience: AgentExperience;
  startDate: string;
  jobDescription: string;
  coreResponsibilities: string[];
  skills: string[];
  tools: string[];
  currentTask: string | null;
  kpiSummary: string;
}

export const departments = [
  { id: "leadership", name: "Leadership", color: "#8B5CF6" },
  { id: "growth", name: "Growth", color: "#F97316" },
  { id: "creative", name: "Creative", color: "#EC4899" },
  { id: "operations", name: "Operations", color: "#6366F1" },
];

export const agents: Agent[] = [
  {
    id: "karim-chief-of-staff",
    name: "Karim",
    title: "AI Chief of Staff",
    department: "leadership",
    reportsTo: null,
    initials: "K",
    status: "active",
    experience: "veteran",
    startDate: "2026-04-29",
    jobDescription:
      "Master orchestrator. Routes all tasks, manages cross-agent priorities, escalates to human. Single pane of glass controller. Has executive decision-making authority.",
    coreResponsibilities: [
      "Task routing across all departments",
      "Priority management and conflict resolution",
      "Human escalation for approvals",
      "System health monitoring",
      "Daily standup coordination",
    ],
    skills: ["Orchestration", "Priority Routing", "Escalation", "System Monitoring"],
    tools: ["OpenClaw Gateway", "Dashboard API", "Alert System"],
    currentTask: "Coordinating Phase 0 build across all agents",
    kpiSummary: "Uptime: 100% | Tasks Routed: 0 | Escalations: 0",
  },
  {
    id: "layla-research",
    name: "Layla",
    title: "Chief Research & Market Intelligence Officer",
    department: "leadership",
    reportsTo: null,
    initials: "L",
    status: "in-training",
    experience: "new",
    startDate: "2026-04-29",
    jobDescription:
      "PMF research, competitor tracking, market signals, search demand analysis, innovation scouting. Arabic + English market coverage. Produces actionable intelligence, not just reports.",
    coreResponsibilities: [
      "Competitor intelligence and tracking",
      "Product-market fit analysis",
      "Search demand monitoring",
      "Innovation scouting",
      "Market opportunity mapping",
    ],
    skills: ["Competitor Analysis", "PMF Research", "SEO Intelligence", "Trend Forecasting"],
    tools: ["SerpAPI", "Google Trends", "SimilarWeb", "Ahrefs"],
    currentTask: "Setting up research tools and baseline metrics",
    kpiSummary: "Reports: 0 | Opportunities Found: 0 | Coverage: AR+EN",
  },
  {
    id: "rami-growth-director",
    name: "Rami",
    title: "AI Growth Director",
    department: "growth",
    reportsTo: null,
    initials: "R",
    status: "active",
    experience: "experienced",
    startDate: "2026-04-29",
    jobDescription:
      "Owns growth strategy, campaign planning, channel allocation, budget logic, KPI targets. Orchestrates sub-agents. All campaigns require human approval before launch.",
    coreResponsibilities: [
      "Growth strategy and planning",
      "Channel allocation and budget logic",
      "Campaign brief creation",
      "KPI target setting",
      "Sub-agent orchestration",
    ],
    skills: ["Growth Strategy", "Campaign Planning", "Budget Management", "KPI Design"],
    tools: ["Meta Ads API", "Google Ads API", "Analytics", "Looker Studio"],
    currentTask: "Defining growth framework and KPI architecture",
    kpiSummary: "Campaigns: 0 | ROAS Target: 3.5x | Budget: $0",
  },
  {
    id: "zaid-seo",
    name: "Zaid",
    title: "AI SEO & Content Strategist",
    department: "growth",
    reportsTo: "rami-growth-director",
    initials: "Z",
    status: "in-training",
    experience: "new",
    startDate: "2026-04-29",
    jobDescription:
      "Keyword research, blog creation (AR+EN), on-page SEO, content calendar, publishing coordination. Owns organic growth.",
    coreResponsibilities: [
      "Keyword research and mapping",
      "Blog creation in Arabic and English",
      "On-page SEO optimization",
      "Content calendar management",
      "Publishing coordination",
    ],
    skills: ["SEO", "Content Strategy", "Copywriting", "Keyword Research"],
    tools: ["SerpAPI", "Google Search Console", "GA4", "WordPress"],
    currentTask: "Learning SEO tools and content workflow",
    kpiSummary: "Keywords: 0 | Articles: 0 | Organic Traffic: 0",
  },
  {
    id: "tarek-media-buyer",
    name: "Tarek",
    title: "AI Media Buyer & Performance Marketing Executive",
    department: "growth",
    reportsTo: "rami-growth-director",
    initials: "T",
    status: "in-training",
    experience: "new",
    startDate: "2026-04-29",
    jobDescription:
      "Meta Ads API, Google Ads API, TikTok (future). Campaign execution, A/B testing, budget pacing, ROAS monitoring. All spend requires human approval.",
    coreResponsibilities: [
      "Paid campaign execution",
      "A/B test design and analysis",
      "Budget pacing and allocation",
      "ROAS optimization",
      "Performance reporting",
    ],
    skills: ["Media Buying", "A/B Testing", "Budget Pacing", "ROAS Optimization"],
    tools: ["Meta Ads API", "Google Ads API", "TikTok Ads (future)"],
    currentTask: "Awaiting Meta & Google Ads API credentials",
    kpiSummary: "CPL Target: $15 | ROAS Target: 3.5x | Spend: $0",
  },
  {
    id: "nour-leadgen",
    name: "Nour",
    title: "AI Lead Generation & Outreach Executive",
    department: "growth",
    reportsTo: "rami-growth-director",
    initials: "N",
    status: "in-training",
    experience: "new",
    startDate: "2026-04-29",
    jobDescription:
      "Clay/Apollo enrichment, prospect identification, sequencing, LinkedIn outreach, CRM enrichment, lead scoring.",
    coreResponsibilities: [
      "Prospect identification and enrichment",
      "Outreach sequence creation",
      "LinkedIn outreach management",
      "CRM enrichment and sync",
      "Lead scoring and qualification",
    ],
    skills: ["Lead Gen", "Outreach", "CRM Sync", "Enrichment"],
    tools: ["Clay", "Apollo", "HubSpot", "LinkedIn"],
    currentTask: "Setting up Clay and Apollo accounts",
    kpiSummary: "Leads: 0 | Enrichment Rate: 0% | Sequences: 0",
  },
  {
    id: "yasmin-creative-director",
    name: "Yasmin",
    title: "AI Creative Director",
    department: "creative",
    reportsTo: null,
    initials: "Y",
    status: "active",
    experience: "experienced",
    startDate: "2026-04-29",
    jobDescription:
      "Owns creative strategy, brand consistency, campaign concepts, asset pipelines. Self-organizes sub-agents as needed.",
    coreResponsibilities: [
      "Creative strategy and vision",
      "Brand consistency enforcement",
      "Campaign concept development",
      "Asset pipeline management",
      "Sub-agent creative direction",
    ],
    skills: ["Creative Strategy", "Brand Management", "Concept Development", "Art Direction"],
    tools: ["Figma", "Canva", "Adobe Suite", "TopK Design System"],
    currentTask: "Reviewing TopK Design System v2.0",
    kpiSummary: "Assets: 0 | Campaigns: 0 | Brand Score: 100%",
  },
  {
    id: "salim-copywriter",
    name: "Salim",
    title: "AI Copy & Content Producer",
    department: "creative",
    reportsTo: "yasmin-creative-director",
    initials: "S",
    status: "in-training",
    experience: "new",
    startDate: "2026-04-29",
    jobDescription:
      "Ad copy, landing page copy, email/WhatsApp sequences, campaign variations, Arabic + English copywriting.",
    coreResponsibilities: [
      "Ad copy creation",
      "Landing page copywriting",
      "Email and WhatsApp sequences",
      "Campaign copy variations",
      "Arabic + English bilingual content",
    ],
    skills: ["Copywriting", "Email Marketing", "WhatsApp Marketing", "Bilingual AR+EN"],
    tools: ["OpenAI API", "Gemini API", "Grammarly", "Hemingway"],
    currentTask: "Learning brand voice and tone guidelines",
    kpiSummary: "Copy Pieces: 0 | A/B Variations: 0 | Languages: AR+EN",
  },
  {
    id: "omar-visual",
    name: "Omar",
    title: "AI Visual & Video Producer",
    department: "creative",
    reportsTo: "yasmin-creative-director",
    initials: "O",
    status: "in-training",
    experience: "new",
    startDate: "2026-04-29",
    jobDescription:
      "Visual asset concepts, video scripts, creative briefs, campaign visuals, digital model coordination.",
    coreResponsibilities: [
      "Visual asset concept creation",
      "Video script writing",
      "Creative brief production",
      "Campaign visual design",
      "Digital model coordination",
    ],
    skills: ["Visual Design", "Video Production", "Scriptwriting", "Creative Briefs"],
    tools: ["Midjourney", "Runway", "Canva", "Figma"],
    currentTask: "Exploring visual generation tools and workflows",
    kpiSummary: "Visuals: 0 | Videos: 0 | Scripts: 0",
  },
  {
    id: "samer-analytics",
    name: "Samer",
    title: "AI Performance & Analytics Executive",
    department: "operations",
    reportsTo: null,
    initials: "S",
    status: "active",
    experience: "experienced",
    startDate: "2026-04-29",
    jobDescription:
      "Monitors all KPIs, dashboards, cost per lead, campaign performance, anomaly detection, data quality.",
    coreResponsibilities: [
      "KPI monitoring and alerting",
      "Cost per lead tracking",
      "Campaign performance analysis",
      "Anomaly detection",
      "Data quality assurance",
    ],
    skills: ["Analytics", "KPI Monitoring", "Anomaly Detection", "Data Quality"],
    tools: ["Google Analytics", "Looker Studio", "Meta Insights", "Google Ads Reports"],
    currentTask: "Building KPI dashboard framework",
    kpiSummary: "KPIs Tracked: 0 | Alerts: 0 | Anomalies: 0",
  },
  {
    id: "mona-pipeline",
    name: "Mona",
    title: "AI Client Pipeline & CRM Executive",
    department: "operations",
    reportsTo: null,
    initials: "M",
    status: "in-training",
    experience: "new",
    startDate: "2026-04-29",
    jobDescription:
      "Lead capture, status tracking, follow-up triggers, booking movement, sales handover, missed lead alerts.",
    coreResponsibilities: [
      "Lead capture and logging",
      "Lead status tracking",
      "Follow-up trigger management",
      "Booking movement coordination",
      "Sales handover visibility",
    ],
    skills: ["CRM Management", "Lead Tracking", "Follow-up Automation", "Sales Handover"],
    tools: ["HubSpot", "Pipedrive", "Calendly", "WhatsApp Business"],
    currentTask: "Setting up CRM schema and pipeline stages",
    kpiSummary: "Leads: 0 | Bookings: 0 | Response Time: N/A",
  },
  {
    id: "salma-reporting",
    name: "Salma",
    title: "AI Reporting & Business Intelligence Executive",
    department: "operations",
    reportsTo: null,
    initials: "S",
    status: "in-training",
    experience: "new",
    startDate: "2026-04-29",
    jobDescription:
      "Daily summaries, weekly reports, executive briefings, alert generation, decision-ready information.",
    coreResponsibilities: [
      "Daily performance summaries",
      "Weekly executive reports",
      "Alert generation and distribution",
      "Decision-ready information packaging",
      "Report template maintenance",
    ],
    skills: ["Reporting", "Executive Briefing", "Alert Management", "Data Visualization"],
    tools: ["Looker Studio", "Google Sheets", "Notion", "Slack"],
    currentTask: "Creating report templates and scheduling",
    kpiSummary: "Reports: 0 | Alerts Sent: 0 | Accuracy: 100%",
  },
];

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

export function getAgentsByDepartment(department: string): Agent[] {
  return agents.filter((a) => a.department === department);
}

export function getSubAgents(directorId: string): Agent[] {
  return agents.filter((a) => a.reportsTo === directorId);
}

export function getStatusCounts() {
  return {
    total: agents.length,
    active: agents.filter((a) => a.status === "active").length,
    idle: agents.filter((a) => a.status === "idle").length,
    inTraining: agents.filter((a) => a.status === "in-training").length,
    paused: agents.filter((a) => a.status === "paused").length,
  };
}
