"use client";

import Link from "next/link";

const GRADIENT_TEXT = "bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#8B5CF6] bg-clip-text text-transparent";

export default function DeckPage() {
  return (
    <div className="min-h-screen bg-[#0A0008] text-white font-[family-name:var(--font-inter)]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0008]/90 backdrop-blur-xl border-b border-white/[0.06] py-4">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="font-[family-name:var(--font-poppins)] font-extrabold text-lg tracking-tight">
            TopK <span className={GRADIENT_TEXT}>Agent OS</span>
          </Link>
          <span className="text-xs font-semibold tracking-wider uppercase text-white/40">Presentation Deck</span>
        </div>
      </nav>

      <div className="pt-24 pb-20 max-w-[1000px] mx-auto px-6">
        {/* SLIDE 1: Cover */}
        <div className="mb-20 p-12 rounded-3xl border border-white/[0.08] bg-white/[0.02] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500" />
              <span className="text-xs font-semibold tracking-wider uppercase text-white/60">Complete Marketing OS</span>
            </div>
            <h1 className="font-[family-name:var(--font-poppins)] font-extrabold text-5xl lg:text-7xl tracking-tight leading-[1.05] mb-6">
              AI Growth<br />
              <span className={GRADIENT_TEXT}>Engine</span>
            </h1>
            <p className="text-lg text-white/50 max-w-lg leading-relaxed mb-10">
              The fully automated marketing and lead generation system for high-ticket service businesses. 
              Researched. Built. Running.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Aesthetic Clinics", "Dental Practices", "Real Estate", "Legal Firms", "B2B Services"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-sm text-white/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SLIDE 2: What Is It */}
        <div className="mb-20">
          <div className="mb-10">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-orange-400">The System</span>
            <h2 className="font-[family-name:var(--font-poppins)] font-extrabold text-4xl text-white mt-4">
              One operating system.<br />Every growth lever.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { title: "Market Intelligence", desc: "AI reads your market daily. Competitors, keywords, content gaps, and ad angles are mapped automatically." },
              { title: "Strategy & Planning", desc: "Data transforms into a complete growth plan — content calendar, campaign funnel, offer strategy, and KPIs." },
              { title: "Content at Scale", desc: "Blog posts, social content, ad creatives, AI videos, and slide decks — produced continuously." },
              { title: "Lead Generation", desc: "Prospects are found, qualified, and nurtured automatically. The system books meetings without human intervention." },
            ].map((card) => (
              <div key={card.title} className="p-7 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>
                </div>
                <h3 className="font-[family-name:var(--font-poppins)] font-bold text-[#0A0008] mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="p-8 rounded-2xl bg-[#0A0008] border border-white/[0.08] flex flex-col lg:flex-row items-center gap-8">
            <p className="font-[family-name:var(--font-poppins)] font-bold text-xl text-white lg:flex-1">
              Set the strategy.<br />We deploy the agents.
            </p>
            <p className="text-sm text-white/45 lg:flex-1 leading-relaxed">
              All seven layers connect. Data from intelligence informs strategy. Strategy shapes content. 
              Content feeds distribution. Distribution generates leads. Leads are tracked and optimized. Continuously.
            </p>
            <span className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold text-sm whitespace-nowrap">
              Fully automated
            </span>
          </div>
        </div>

        {/* SLIDE 3: 7 Layers */}
        <div className="mb-20">
          <div className="mb-10">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-white/45">Infrastructure</span>
            <h2 className="font-[family-name:var(--font-poppins)] font-extrabold text-4xl text-white mt-4">
              The 7 core layers
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { num: "1", name: "Market Intelligence Layer", sub: "Research & Insights", desc: "We analyze your market, competitors, traffic, keywords, content gaps and ad strategies.", powered: ["SimilarWeb", "Ahrefs API", "Apify", "Search API"], output: ["Competitor Map", "SEO Opportunities", "Content Gaps", "Ad Angle Library", "Market Positioning Report"] },
              { num: "2", name: "Strategy & Planning Layer", sub: "Growth Strategy", desc: "We turn data into a clear growth strategy and execution plan.", powered: ["Claude Code (AI Agents)", "Notion API"], output: ["Monthly Content Calendar", "Campaign Plan", "Funnel & Offer Strategy", "Budget Allocation", "KPI Dashboard"] },
              { num: "3", name: "Brand System Layer", sub: "Identity & Design", desc: "We build a strong, consistent brand system that makes your business memorable.", powered: ["Claude Code", "Figma", "Canva"], output: ["Brand Voice & Messaging", "Design System", "Ad & Social Templates", "Landing Page Sections", "Style Guide"] },
              { num: "4", name: "Content Production Layer", sub: "Create & Produce", desc: "We produce high-quality content at scale with AI and automation.", powered: ["Claude Code (AI Writers)", "Image APIs", "Canva / Figma", "HeyGen (AI Video)"], output: ["Blog Posts", "Social Posts & Captions", "Ad Copy & Creatives", "AI Avatar Videos", "YouTube Videos", "Slides & Presentations"] },
              { num: "5", name: "Distribution Layer", sub: "Publish & Launch", desc: "We publish content and launch ad campaigns across all major channels automatically.", powered: ["Meta API", "Google Ads API", "TikTok API", "YouTube API", "Metricool / Scheduling API"], output: ["Scheduled Posts", "Published Videos", "Live Ad Campaigns", "A/B Tested Creatives", "Performance Tracking"] },
              { num: "6", name: "Lead Generation Layer", sub: "Find & Nurture", desc: "We find, qualify, and engage potential clients until they book a meeting.", powered: ["Clay", "Apify / Enrichment APIs", "CRM (HubSpot / Pipedrive)", "Email & WhatsApp APIs"], output: ["Clean Prospect Database", "Enriched & Segmented Leads", "Personalized Outreach", "Email + WhatsApp Follow-ups", "Meeting Booking System"] },
              { num: "7", name: "Reporting & Optimization Layer", sub: "Track & Improve", desc: "We track everything, report performance, and optimize continuously.", powered: ["Claude Code (AI Analysts)", "Notion API", "Ad & CRM APIs", "Dashboards"], output: ["Weekly Performance Report", "Cost Per Lead / Appointment", "Conversion Rate", "Best Performing Channels", "Next Week Action Plan"] },
            ].map((layer) => (
              <div key={layer.num} className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-orange-500/30 transition-colors">
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {layer.num}
                  </div>
                  <div className="flex-1">
                    <div className="font-[family-name:var(--font-poppins)] font-bold text-lg text-white">{layer.name}</div>
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-2">{layer.sub}</div>
                    <p className="text-sm text-white/50 mb-4">{layer.desc}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-2">Powered by</div>
                        <div className="flex flex-wrap gap-2">
                          {layer.powered.map((p) => (
                            <span key={p} className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs text-white/55">{p}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">Output</div>
                        <div className="flex flex-wrap gap-2">
                          {layer.output.map((o) => (
                            <span key={o} className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">{o}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SLIDE 4: 90-Day Roadmap */}
        <div className="mb-20">
          <div className="mb-10">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-orange-400">Implementation</span>
            <h2 className="font-[family-name:var(--font-poppins)] font-extrabold text-4xl text-white mt-4">
              90 days to full deployment
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { badge: "Foundation", badgeColor: "bg-emerald-500", num: "30", unit: "Days", name: "Foundation", desc: "Build the base infrastructure, research the market, and set up the brand system.", items: ["Market Research", "Brand & Strategy", "Content Calendar", "CRM & Database", "Dashboard Setup"] },
              { badge: "Automation", badgeColor: "bg-blue-500", num: "30", unit: "Days", name: "Automation", desc: "Launch campaigns, automate content production, and activate lead generation.", items: ["Content Workflows", "Ad Campaign Setup", "Lead Enrichment", "Email/WhatsApp Sequences", "Scheduling & Reporting"] },
              { badge: "Optimization", badgeColor: "bg-purple-500", num: "30", unit: "Days", name: "Optimization", desc: "Optimize performance, scale winning campaigns, and build playbooks.", items: ["Optimize Campaigns", "Improve Conversions", "Scale Winning Channels", "Build Playbooks", "Team Training & Handover"] },
            ].map((phase) => (
              <div key={phase.name} className="rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03]">
                <div className="p-8">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold text-white ${phase.badgeColor} mb-5`}>{phase.badge}</span>
                  <div className="font-[family-name:var(--font-poppins)] font-extrabold text-5xl text-white mb-1">{phase.num}</div>
                  <div className="text-xs font-semibold tracking-wider uppercase text-white/50 mb-4">{phase.unit}</div>
                  <div className="font-[family-name:var(--font-poppins)] font-bold text-xl text-white mb-3">{phase.name}</div>
                  <p className="text-sm text-white/45 leading-relaxed">{phase.desc}</p>
                </div>
                <div className="px-8 pb-8 pt-6 border-t border-white/[0.06]">
                  <ul className="space-y-2.5">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-white/55">
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SLIDE 5: Pricing */}
        <div className="mb-20">
          <div className="mb-10">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-white/45">Investment</span>
            <h2 className="font-[family-name:var(--font-poppins)] font-extrabold text-4xl text-white mt-4">
              Clear pricing. No surprises.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Setup Fee", price: "$10,000 – $30,000", sub: "One-time system installation" },
              { name: "Monthly Management", price: "$3,000 – $10,000", sub: "Ongoing management & optimization", featured: true },
              { name: "Performance Bonus", price: "Optional", sub: "Per Qualified Lead / Revenue %" },
            ].map((tier) => (
              <div key={tier.name} className={`p-10 rounded-2xl border ${tier.featured ? "border-purple-500/40 bg-purple-500/[0.05]" : "border-white/[0.08] bg-white/[0.03]"}`}>
                <div className={`text-xs font-semibold tracking-[0.07em] uppercase mb-4 ${tier.featured ? "text-orange-400" : "text-orange-400"}`}>{tier.name}</div>
                <div className="font-[family-name:var(--font-poppins)] font-extrabold text-4xl text-white mb-2">{tier.price}</div>
                <div className="text-sm text-white/40">{tier.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SLIDE 6: CTA */}
        <div className="p-12 rounded-3xl border border-white/[0.08] bg-white/[0.02] text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            <div className="text-xs font-semibold tracking-[0.1em] uppercase text-white/40 mb-4">Ready to deploy</div>
            <h2 className="font-[family-name:var(--font-poppins)] font-extrabold text-4xl lg:text-6xl text-white mb-6">
              Your agents<br /><span className={GRADIENT_TEXT}>are running.</span>
            </h2>
            <p className="text-lg text-white/45 max-w-md mx-auto mb-10">
              Let&apos;s build your unfair advantage.
            </p>
            <a
              href="mailto:zaid@topk.agency"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 hover:opacity-90 transition-opacity"
            >
              Deploy your agents
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
