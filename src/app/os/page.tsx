"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const GRADIENT = "bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#8B5CF6]";
const GRADIENT_TEXT = "bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#8B5CF6] bg-clip-text text-transparent";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0008] text-white font-[family-name:var(--font-inter)]">
      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0008]/90 backdrop-blur-xl border-b border-white/[0.06] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="font-[family-name:var(--font-poppins)] font-extrabold text-xl tracking-tight">
            TopK <span className={GRADIENT_TEXT}>Agent OS</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#problem" className="text-sm text-white/60 hover:text-white transition-colors">The Problem</a>
            <a href="#model" className="text-sm text-white/60 hover:text-white transition-colors">How It Works</a>
            <a href="#team" className="text-sm text-white/60 hover:text-white transition-colors">AI Team</a>
            <a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</a>
            <Link
              href="/dashboard"
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold text-white ${GRADIENT} hover:opacity-90 transition-opacity`}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[900px] h-[700px] bg-purple-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-orange-500/8 rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/5 mb-8">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500" />
                <span className="text-xs font-semibold tracking-wider uppercase text-white/60">
                  Growth Operating System
                </span>
              </div>
              <h1 className="font-[family-name:var(--font-poppins)] font-extrabold text-5xl lg:text-7xl tracking-tight leading-[1.05] mb-6">
                More clients.
                <br />
                <span className={GRADIENT_TEXT}>Less chaos.</span>
              </h1>
              <p className="text-lg text-white/50 max-w-md leading-relaxed mb-8">
                Connect your campaigns, leads, follow-up, and reporting into one
                daily operating rhythm — powered by AI agents.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Get more consistent client inquiries",
                  "Follow up faster and miss fewer opportunities",
                  "See what is working and what is wasting money",
                  "Make decisions with clear daily visibility",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#finalcta"
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white ${GRADIENT} hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20`}
                >
                  Grow your business now
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white/75 border border-white/15 hover:border-white/40 hover:text-white transition-all"
                >
                  View Dashboard
                </Link>
              </div>
            </div>

            {/* Stats panel */}
            <div className="space-y-5">
              {[
                { num: "7", label: "AI-powered infrastructure layers — fully connected, always running" },
                { num: "90", label: "Days to full operational deployment — Foundation to Optimization" },
                { num: "100%", label: "Automated. No headcount. No management overhead." },
              ].map((stat) => (
                <div
                  key={stat.num}
                  className="p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
                >
                  <div className={`font-[family-name:var(--font-poppins)] font-extrabold text-5xl mb-2 ${GRADIENT_TEXT}`}>
                    {stat.num}
                  </div>
                  <div className="text-sm text-white/45 leading-relaxed">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section id="problem" className="py-32 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-16">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-orange-400">The Problem</span>
            <div className="w-12 h-[3px] bg-gradient-to-r from-orange-400 to-pink-500 rounded-full my-5" />
            <h2 className="font-[family-name:var(--font-poppins)] font-extrabold text-4xl lg:text-5xl text-white max-w-[600px] leading-tight">
              Growth is blocked by scattered execution.
            </h2>
            <p className="text-lg text-white/45 mt-6 max-w-xl leading-relaxed">
              Service businesses spend money, run campaigns, receive inquiries, and produce reports —
              but these actions are not connected. That creates delays, wasted spend, missed opportunities, and weak visibility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Campaigns move too slowly", desc: "Planning, copy, approvals, and reporting happen in separate tools with no shared rhythm." },
              { title: "Inquiries are not followed up fast enough", desc: "Leads come in but response is delayed, inconsistent, and not properly tracked to booking." },
              { title: "Teams chase tasks manually", desc: "Updates, status checks, and coordination consume time that should go toward execution." },
              { title: "Budget decisions happen too late", desc: "Spend continues on weak campaigns because there is no daily monitoring with clear rules." },
              { title: "Reports show activity, not decisions", desc: "Data arrives late and does not surface the next action clearly enough for the owner to act." },
              { title: "Good opportunities are missed", desc: "No one sees the full picture in time. Opportunities slip because the system does not flag them." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-pink-500/30 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-poppins)] font-semibold text-white mb-1">{item.title}</div>
                  <div className="text-sm text-white/45 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPERATING MODEL ── */}
      <section id="model" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-pink-500/5 to-purple-500/10 pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="mb-16">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-white/45">Operating Model</span>
            <div className="w-12 h-[3px] bg-gradient-to-r from-orange-400 to-pink-500 rounded-full my-5" />
            <h2 className="font-[family-name:var(--font-poppins)] font-extrabold text-4xl lg:text-5xl text-white max-w-[600px] leading-tight">
              AI does the heavy lifting.
              <br />
              You run the business.
            </h2>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { num: "78%", label: "of daily marketing tasks automated by AI" },
              { num: "3.4×", label: "faster campaign execution" },
              { num: "91%", label: "less time spent on manual reporting" },
              { num: "24/7", label: "AI monitoring with zero manual oversight" },
            ].map((stat) => (
              <div key={stat.num} className="text-center p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <div className={`font-[family-name:var(--font-poppins)] font-extrabold text-4xl mb-2 ${GRADIENT_TEXT}`}>{stat.num}</div>
                <div className="text-sm text-white/50 leading-relaxed">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Two panels */}
          <div className="grid lg:grid-cols-2 gap-5">
            {/* AI Panel */}
            <div className="p-10 rounded-3xl border border-purple-500/20 bg-purple-500/[0.05] relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="text-xs font-semibold tracking-[0.1em] uppercase text-purple-300 mb-3">AI handles — 24 / 7</div>
              <h3 className="font-[family-name:var(--font-poppins)] font-extrabold text-3xl text-white mb-3">The work that never stops.</h3>
              <p className="text-sm text-white/40 mb-8 leading-relaxed">AI agents run continuously — watching, preparing, flagging, and acting — so your team does not have to.</p>
              <div className="flex flex-wrap gap-2.5">
                {["Market monitoring", "Competitor tracking", "Campaign reporting", "Lead follow-up", "CRM updates", "Budget alerts", "Content scheduling", "Performance flags", "Report preparation", "Spend monitoring"].map((chip) => (
                  <span key={chip} className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/25 text-sm text-white/65">
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Human Panel */}
            <div className="p-10 rounded-3xl border border-orange-500/20 bg-orange-500/[0.03] relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="text-xs font-semibold tracking-[0.1em] uppercase text-orange-300 mb-3">You focus on — always</div>
              <h3 className="font-[family-name:var(--font-poppins)] font-extrabold text-3xl text-white mb-3">What only you can decide.</h3>
              <p className="text-sm text-white/40 mb-8 leading-relaxed">You remain in full control of strategy, budget, brand, and client relationships. The system supports — never replaces — your judgement.</p>
              <div className="space-y-3">
                {[
                  { title: "Strategic direction", sub: "Set priorities, shape offers, and define the growth path" },
                  { title: "Budget approvals", sub: "Review recommendations and authorise spend decisions" },
                  { title: "Brand and positioning", sub: "Control what the business stands for and how it speaks" },
                  { title: "Client relationships", sub: "Build trust, close high-value deals, manage key accounts" },
                  { title: "Scaling decisions", sub: "Choose when and how to grow — with clear data behind every move" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.04] border border-white/[0.07]">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex-shrink-0 mt-1.5" />
                    <div>
                      <div className="font-[family-name:var(--font-poppins)] font-semibold text-white text-sm">{item.title}</div>
                      <div className="text-sm text-white/40">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI GROWTH TEAM ── */}
      <section id="team" className="py-32 bg-[#FFF5F5]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-16">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-orange-500">Your Team</span>
            <div className="w-12 h-[3px] bg-gradient-to-r from-orange-400 to-pink-500 rounded-full my-5" />
            <h2 className="font-[family-name:var(--font-poppins)] font-extrabold text-4xl lg:text-5xl text-[#0A0008] max-w-[600px] leading-tight">
              11 AI agents. One system. Always on.
            </h2>
          </div>

          <Link
            href="/dashboard"
            className="group block mb-10 p-8 rounded-2xl bg-[#0A0008] border border-orange-500/30 hover:border-orange-500/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center text-white font-extrabold text-xl">
                  KA
                </div>
                <div>
                  <div className="font-[family-name:var(--font-poppins)] font-bold text-xl text-white">Karim — Chief of Staff</div>
                  <div className="text-sm text-white/50">Orchestrates all agents, routes tasks, and ensures nothing falls through the cracks.</div>
                </div>
              </div>
              <span className={`px-5 py-2.5 rounded-xl text-sm font-semibold text-white ${GRADIENT}`}>
                Meet the team →
              </span>
            </div>
          </Link>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: "Layla", role: "Market Intelligence", dept: "Growth", desc: "Maps competitors, keywords, and market shifts daily." },
              { name: "Rami", role: "Growth Director", dept: "Growth", desc: "Sets strategy, allocates budget, and optimises funnels." },
              { name: "Yasmin", role: "Creative Director", dept: "Creative", desc: "Owns brand voice, design system, and creative quality." },
              { name: "Salim", role: "Copywriter", dept: "Creative", desc: "Produces ads, emails, scripts, and landing page copy." },
              { name: "Nour", role: "Lead Generation", dept: "Growth", desc: "Finds prospects, enriches data, and books meetings." },
              { name: "Samer", role: "Analytics", dept: "Operations", desc: "Tracks KPIs, surfaces insights, and flags deviations." },
            ].map((agent) => (
              <div
                key={agent.name}
                className="p-7 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-base">
                    {agent.name[0]}{agent.name[1]}
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-poppins)] font-bold text-[#0A0008]">{agent.name}</div>
                    <div className="text-xs font-semibold tracking-wider uppercase text-orange-500">{agent.role}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{agent.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
            >
              View all 11 agents in the dashboard
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-16">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-orange-400">Process</span>
            <div className="w-12 h-[3px] bg-gradient-to-r from-orange-400 to-pink-500 rounded-full my-5" />
            <h2 className="font-[family-name:var(--font-poppins)] font-extrabold text-4xl lg:text-5xl text-white leading-tight">
              How the engine runs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { step: "01", title: "Understand the market", desc: "AI maps demand signals, search behaviour, and emerging opportunities before any budget is spent." },
              { step: "02", title: "Monitor competitors", desc: "Tracks competitor ads, content, SEO, and positioning shifts across every channel." },
              { step: "03", title: "Plan campaigns", desc: "Builds monthly content calendars, campaign briefs, and budget allocation from real data." },
              { step: "04", title: "Create at scale", desc: "Produces ad creatives, social posts, emails, and video scripts continuously." },
              { step: "05", title: "Generate leads", desc: "Finds, qualifies, and nurtures prospects until they book a meeting." },
              { step: "06", title: "Report & optimize", desc: "Tracks every KPI, flags deviations, and recommends next actions daily." },
            ].map((item) => (
              <div
                key={item.step}
                className="p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-orange-500/30 transition-colors group"
              >
                <div className={`font-[family-name:var(--font-poppins)] font-extrabold text-4xl mb-4 ${GRADIENT_TEXT}`}>{item.step}</div>
                <h3 className="font-[family-name:var(--font-poppins)] font-bold text-lg text-white mb-3">{item.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-32 bg-[#FFF5F5]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-16">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-orange-500">Investment</span>
            <div className="w-12 h-[3px] bg-gradient-to-r from-orange-400 to-pink-500 rounded-full my-5" />
            <h2 className="font-[family-name:var(--font-poppins)] font-extrabold text-4xl lg:text-5xl text-[#0A0008] leading-tight">
              Clear pricing.
              <br />
              No surprises.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                name: "Foundation",
                price: "$10K – $15K",
                sub: "One-time system installation",
                desc: "Complete setup of all 7 layers. Market research, brand system, content pipeline, and dashboard.",
                features: ["Market Intelligence System", "Brand & Content System", "Automated Content Production", "Paid Ads Automation Setup", "Lead Generation Engine", "CRM & Follow-up Workflows", "Reporting Dashboard", "Team Training & Handover"],
              },
              {
                name: "Growth",
                price: "$3K – $6K",
                sub: "Per month ongoing management",
                desc: "Full operational management. AI agents run daily, optimize campaigns, and generate reports.",
                features: ["Everything in Foundation", "Daily AI Agent Operations", "Weekly Performance Reports", "Campaign Optimization", "Content Production at Scale", "Lead Nurturing & Follow-up", "Budget Protection System", "Monthly Strategy Reviews"],
                featured: true,
              },
              {
                name: "Scale",
                price: "Custom",
                sub: "Enterprise-level deployment",
                desc: "Multi-location, high-volume, or white-label. Custom integrations and dedicated support.",
                features: ["Everything in Growth", "Multi-location Support", "Custom API Integrations", "White-label Options", "Dedicated Account Lead", "Quarterly Business Reviews", "SLA & Priority Support", "Custom Agent Development"],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-10 flex flex-col ${
                  plan.featured
                    ? "bg-[#0A0008] border-2 border-purple-500/40 shadow-xl shadow-purple-500/10"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                {plan.featured && (
                  <div className={`inline-flex self-start px-4 py-1.5 rounded-full text-xs font-semibold text-white ${GRADIENT} mb-6`}>
                    Most Popular
                  </div>
                )}
                <div className={`text-xs font-semibold tracking-[0.07em] uppercase mb-4 ${plan.featured ? "text-orange-400" : "text-orange-500"}`}>
                  {plan.name}
                </div>
                <div className={`font-[family-name:var(--font-poppins)] font-extrabold text-4xl mb-2 ${plan.featured ? "text-white" : "text-[#0A0008]"}`}>
                  {plan.price}
                </div>
                <div className={`text-sm mb-6 ${plan.featured ? "text-white/40" : "text-gray-500"}`}>{plan.sub}</div>
                <p className={`text-sm leading-relaxed mb-8 ${plan.featured ? "text-white/50" : "text-gray-500"}`}>{plan.desc}</p>
                <ul className="space-y-3 mb-10 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-3 text-sm ${plan.featured ? "text-white/60" : "text-gray-600"}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex-shrink-0 mt-1.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#finalcta"
                  className={`block text-center py-4 rounded-xl font-bold text-sm transition-opacity hover:opacity-90 ${
                    plan.featured
                      ? `${GRADIENT} text-white`
                      : "bg-[#0A0008] text-white"
                  }`}
                >
                  Get started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="finalcta" className="py-40 relative overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-purple-500/15 rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[800px] mx-auto px-6">
          <div className="text-xs font-semibold tracking-[0.1em] uppercase text-white/40 mb-6">Ready to deploy</div>
          <h2 className="font-[family-name:var(--font-poppins)] font-extrabold text-5xl lg:text-7xl text-white mb-6 leading-tight">
            Your agents
            <br />
            <span className={GRADIENT_TEXT}>are running.</span>
          </h2>
          <p className="text-lg text-white/45 max-w-lg mx-auto mb-12 leading-relaxed">
            Your competitors are already automating. The question is whether your business is keeping up. Let&apos;s find out.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:zaid@topk.agency"
              className={`inline-flex items-center gap-2 px-10 py-5 rounded-xl text-lg font-bold text-white ${GRADIENT} hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25`}
            >
              Deploy your agents
            </a>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-xl text-lg font-semibold text-white/75 border border-white/15 hover:border-white/40 hover:text-white transition-all"
            >
              View the dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.07] py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-[family-name:var(--font-poppins)] font-extrabold text-sm">
            TopK <span className={GRADIENT_TEXT}>Agent OS</span>
          </div>
          <div className="flex gap-7">
            <a href="#problem" className="text-sm text-white/35 hover:text-white/70 transition-colors">Problem</a>
            <a href="#model" className="text-sm text-white/35 hover:text-white/70 transition-colors">Solution</a>
            <a href="#team" className="text-sm text-white/35 hover:text-white/70 transition-colors">Team</a>
            <a href="#pricing" className="text-sm text-white/35 hover:text-white/70 transition-colors">Pricing</a>
            <Link href="/dashboard" className="text-sm text-white/35 hover:text-white/70 transition-colors">Dashboard</Link>
          </div>
          <div className="text-xs text-white/25">Built in the Gulf. Running for the world.</div>
        </div>
      </footer>
    </div>
  );
}
