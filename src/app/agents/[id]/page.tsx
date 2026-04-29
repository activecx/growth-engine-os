"use client";

import { useParams } from "next/navigation";
import { agents, departments, type Agent } from "@/lib/agents";
import Link from "next/link";

function getStatusColor(status: Agent["status"]) {
  switch (status) {
    case "active": return "bg-emerald-400";
    case "idle": return "bg-zinc-400";
    case "in-training": return "bg-amber-400";
    case "paused": return "bg-red-400";
    case "dismissed": return "bg-zinc-600";
  }
}

function getStatusLabel(status: Agent["status"]) {
  switch (status) {
    case "active": return "Active";
    case "idle": return "Idle";
    case "in-training": return "In Training";
    case "paused": return "Paused";
    case "dismissed": return "Dismissed";
  }
}

function getExperienceBadge(exp: Agent["experience"]) {
  switch (exp) {
    case "veteran": return { bg: "bg-purple-500/15", text: "text-purple-300", border: "border-purple-500/30", label: "Veteran" };
    case "experienced": return { bg: "bg-blue-500/15", text: "text-blue-300", border: "border-blue-500/30", label: "Experienced" };
    case "new": return { bg: "bg-amber-500/15", text: "text-amber-300", border: "border-amber-500/30", label: "New" };
  }
}

export default function AgentDetailPage() {
  const params = useParams();
  const agent = agents.find((a) => a.id === params.id);

  if (!agent) {
    return (
      <div className="min-h-screen bg-[#0A0008] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-poppins)] font-bold text-2xl mb-4">Agent not found</h1>
          <Link href="/" className="text-orange-400 hover:text-orange-300">← Back to Command Center</Link>
        </div>
      </div>
    );
  }

  const dept = departments.find((d) => d.id === agent.department);
  const expBadge = getExperienceBadge(agent.experience);
  const statusColor = getStatusColor(agent.status);
  const statusLabel = getStatusLabel(agent.status);

  return (
    <div className="min-h-screen bg-[#0A0008] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#0A0008]/90 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white/40 hover:text-white transition-colors text-sm">← Command Center</Link>
            <span className="text-white/20">|</span>
            <div className="font-[family-name:var(--font-poppins)] font-extrabold text-lg">
              TopK <span className="bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#8B5CF6] bg-clip-text text-transparent">Agent OS</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-8 py-10">
        {/* Profile Header */}
        <div className="flex items-start gap-6 mb-10">
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center text-white font-bold text-3xl flex-shrink-0"
            style={{
              background:
                agent.department === "leadership"
                  ? "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)"
                  : agent.department === "growth"
                  ? "linear-gradient(135deg, #F97316 0%, #EC4899 100%)"
                  : agent.department === "creative"
                  ? "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)"
                  : "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
            }}
          >
            {agent.initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-[family-name:var(--font-poppins)] font-bold text-3xl">{agent.name}</h1>
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${expBadge.bg} ${expBadge.text} border ${expBadge.border}`}>
                {agent.experience === "new" && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
                {expBadge.label}
              </span>
            </div>
            <p className="text-lg text-white/60 mb-3">{agent.title}</p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `${dept?.color}15`, color: dept?.color, border: `1px solid ${dept?.color}40` }}>
                {dept?.name}
              </span>
              <span className="flex items-center gap-2 text-sm text-white/50">
                <span className={`w-2 h-2 rounded-full ${statusColor} shadow-[0_0_8px_rgba(0,0,0,0.3)]`} />
                {statusLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <div className="rounded-2xl border border-white/[0.09] bg-white/[0.04] p-6">
              <h2 className="font-[family-name:var(--font-poppins)] font-bold text-lg mb-4">Job Description</h2>
              <p className="text-white/60 leading-relaxed mb-6">{agent.jobDescription}</p>
              
              <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-sm text-white/40 uppercase tracking-wider mb-3">Core Responsibilities</h3>
              <ul className="space-y-2">
                {agent.coreResponsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                    <span className="w-5 h-5 rounded-full bg-orange-500/15 text-orange-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills & Tools */}
            <div className="rounded-2xl border border-white/[0.09] bg-white/[0.04] p-6">
              <h2 className="font-[family-name:var(--font-poppins)] font-bold text-lg mb-4">Capabilities</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-sm text-white/40 uppercase tracking-wider mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-sm text-white/60">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-sm text-white/40 uppercase tracking-wider mb-3">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.tools.map((tool) => (
                      <span key={tool} className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Current Task */}
            {agent.currentTask && (
              <div className="rounded-2xl border border-white/[0.09] bg-white/[0.04] p-6">
                <h2 className="font-[family-name:var(--font-poppins)] font-bold text-lg mb-4">Current Focus</h2>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">In Progress</span>
                  </div>
                  <p className="text-white/70">{agent.currentTask}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-6">
            {/* KPI Card */}
            <div className="rounded-2xl border border-white/[0.09] bg-white/[0.04] p-6">
              <h2 className="font-[family-name:var(--font-poppins)] font-bold text-lg mb-4">KPIs</h2>
              <p className="text-sm text-white/40 mb-4">{agent.kpiSummary}</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-white/40 mb-1">
                    <span>Uptime</span>
                    <span>100%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#F97316] to-[#EC4899] rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-white/40 mb-1">
                    <span>Tasks Completed</span>
                    <span>0</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] rounded-full" style={{ width: "0%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="rounded-2xl border border-white/[0.09] bg-white/[0.04] p-6">
              <h2 className="font-[family-name:var(--font-poppins)] font-bold text-lg mb-4">Actions</h2>
              <div className="space-y-2">
                <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white font-semibold text-sm hover:opacity-90 transition-opacity">
                  Send Message
                </button>
                <button className="w-full py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white/70 font-semibold text-sm hover:bg-white/[0.08] transition-colors">
                  Assign Task
                </button>
                <button className="w-full py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white/70 font-semibold text-sm hover:bg-white/[0.08] transition-colors">
                  View Logs
                </button>
                {agent.status !== "paused" ? (
                  <button className="w-full py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-semibold text-sm hover:bg-red-500/15 transition-colors">
                    Pause Agent
                  </button>
                ) : (
                  <button className="w-full py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-sm hover:bg-emerald-500/15 transition-colors">
                    Resume Agent
                  </button>
                )}
              </div>
            </div>

            {/* Daily Agenda Placeholder */}
            <div className="rounded-2xl border border-white/[0.09] bg-white/[0.04] p-6">
              <h2 className="font-[family-name:var(--font-poppins)] font-bold text-lg mb-4">Daily Agenda</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03]">
                  <span className="text-xs text-white/30 font-mono">09:00</span>
                  <span className="text-sm text-white/50">System health check</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03]">
                  <span className="text-xs text-white/30 font-mono">10:00</span>
                  <span className="text-sm text-white/50">Review agent queue</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03]">
                  <span className="text-xs text-white/30 font-mono">14:00</span>
                  <span className="text-sm text-white/50">Cross-agent sync</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03]">
                  <span className="text-xs text-white/30 font-mono">16:00</span>
                  <span className="text-sm text-white/50">Daily summary prep</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
