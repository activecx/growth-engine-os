"use client";

import { Agent, departments } from "@/lib/agents";
import Link from "next/link";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const dept = departments.find((d) => d.id === agent.department);

  const statusConfig = {
    active: { dot: "bg-emerald-400", shadow: "shadow-emerald-400/20", label: "Active" },
    idle: { dot: "bg-zinc-400", shadow: "shadow-zinc-400/10", label: "Idle" },
    "in-training": { dot: "bg-amber-400", shadow: "shadow-amber-400/20", label: "In Training" },
    paused: { dot: "bg-red-400", shadow: "shadow-red-400/20", label: "Paused" },
    dismissed: { dot: "bg-zinc-600", shadow: "shadow-zinc-600/10", label: "Dismissed" },
  };

  const status = statusConfig[agent.status];
  const isDirector = agent.reportsTo === null && agent.department !== "leadership";

  return (
    <Link href={`/dashboard/agents/${agent.id}`} className="group relative rounded-2xl border border-white/[0.09] bg-white/[0.04] p-6 transition-all duration-200 hover:bg-[rgba(139,92,246,0.08)] hover:border-purple-500/30 hover:-translate-y-1 block">
      {/* Status indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${status.dot} shadow-[0_0_8px_rgba(0,0,0,0.3)]`} />
        <span className="text-[10px] font-semibold tracking-wider uppercase text-white/40">
          {status.label}
        </span>
      </div>

      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4"
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

      {/* Name & Title */}
      <h3 className="font-[family-name:var(--font-poppins)] font-bold text-lg text-white mb-1">
        {agent.name}
      </h3>
      <p className="text-sm text-white/50 leading-snug mb-3">{agent.title}</p>

      {/* Department Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-white/80"
          style={{ background: `${dept?.color}20`, border: `1px solid ${dept?.color}40` }}
        >
          {dept?.name}
        </span>
        {isDirector && (
          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-purple-500/15 text-purple-300 border border-purple-500/30">
            Director
          </span>
        )}
        {agent.experience === "new" && (
          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
            New
          </span>
        )}
      </div>

      {/* Current Task */}
      {agent.currentTask && (
        <div className="mb-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="text-[10px] font-semibold tracking-wider uppercase text-white/30 mb-1">
            Current Task
          </div>
          <div className="text-sm text-white/60 leading-relaxed">{agent.currentTask}</div>
        </div>
      )}

      {/* KPI Summary */}
      <div className="text-xs text-white/35 font-medium">{agent.kpiSummary}</div>
    </Link>
  );
}
