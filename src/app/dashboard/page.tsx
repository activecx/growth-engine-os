"use client";

import { agents, departments, getStatusCounts } from "@/lib/agents";
import AgentCard from "@/components/AgentCard";
import Link from "next/link";
import StatusBar from "@/components/StatusBar";

export default function Home() {
  const counts = getStatusCounts();

  return (
    <div className="min-h-screen bg-[#0A0008] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#0A0008]/90 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-[family-name:var(--font-poppins)] font-extrabold text-xl tracking-tight hover:opacity-80 transition-opacity">
              TopK <span className="bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#8B5CF6] bg-clip-text text-transparent">Agent OS</span>
            </Link>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-purple-500/15 text-purple-300 border border-purple-500/30">
              Command Center
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-white/40 font-medium">System Status</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                Operational
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            AI Workforce Dashboard
          </div>
          <h1 className="font-[family-name:var(--font-poppins)] font-extrabold text-4xl md:text-5xl tracking-tight mb-3">
            Your marketing department,<br />
            <span className="bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#8B5CF6] bg-clip-text text-transparent">
              running on AI.
            </span>
          </h1>
          <p className="text-lg text-white/50 max-w-xl leading-relaxed">
            {counts.active} active agents. {counts.inTraining} in training. 
            Real-time orchestration for TopK AI Agency.
          </p>
        </div>

        {/* Status Bar */}
        <div className="mb-10">
          <StatusBar />
        </div>

        {/* Agent Grid by Department */}
        {departments.map((dept) => {
          const deptAgents = agents.filter((a) => a.department === dept.id);
          if (deptAgents.length === 0) return null;

          return (
            <section key={dept.id} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: dept.color }}
                />
                <h2 className="font-[family-name:var(--font-poppins)] font-bold text-2xl">
                  {dept.name}
                </h2>
                <span className="text-sm text-white/40 font-medium">
                  {deptAgents.length} agent{deptAgents.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {deptAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/[0.07] flex items-center justify-between">
          <div className="font-[family-name:var(--font-poppins)] font-extrabold text-sm">
            TopK <span className="bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#8B5CF6] bg-clip-text text-transparent">Agent OS</span>
          </div>
          <div className="text-xs text-white/30">
            Built in the Gulf. Running for the world. — Phase 0 Active
          </div>
        </footer>
      </main>
    </div>
  );
}
