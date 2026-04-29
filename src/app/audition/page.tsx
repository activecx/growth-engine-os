"use client";

import { useState } from "react";
import Link from "next/link";
import { agents, departments } from "@/lib/agents";
import { AGENT_PROMPTS } from "@/lib/prompts/agents";

const GRADIENT_TEXT = "bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#8B5CF6] bg-clip-text text-transparent";

const TEST_MESSAGES = [
  "What's your current status?",
  "Give me a quick report on your area",
  "What should we focus on this week?",
  "What's your biggest win lately?",
  "What are you struggling with right now?",
];

interface AuditionResult {
  agentId: string;
  agentName: string;
  message: string;
  response: string;
  source: string;
  loading: boolean;
}

export default function AuditionPage() {
  const [results, setResults] = useState<AuditionResult[]>([]);
  const [globalLoading, setGlobalLoading] = useState(false);

  const runAudition = async (agentId: string, message: string) => {
    const agent = agents.find((a) => a.id === agentId);
    if (!agent) return;

    setResults((prev) => [
      ...prev.filter((r) => !(r.agentId === agentId && r.message === message)),
      { agentId, agentName: agent.name, message, response: "", source: "", loading: true },
    ]);

    try {
      const res = await fetch("/api/agents/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId, message, history: [] }),
      });
      const data = await res.json();
      setResults((prev) =>
        prev.map((r) =>
          r.agentId === agentId && r.message === message && r.loading
            ? { ...r, response: data.response || data.error || "No response", source: data.source || "unknown", loading: false }
            : r
        )
      );
    } catch {
      setResults((prev) =>
        prev.map((r) =>
          r.agentId === agentId && r.message === message && r.loading
            ? { ...r, response: "❌ Network error", source: "error", loading: false }
            : r
        )
      );
    }
  };

  const runAllAuditions = async () => {
    setGlobalLoading(true);
    setResults([]);
    const message = TEST_MESSAGES[0];
    for (const agent of agents) {
      await runAudition(agent.id, message);
      await new Promise((r) => setTimeout(r, 500));
    }
    setGlobalLoading(false);
  };

  const getResult = (agentId: string, message: string) =>
    results.find((r) => r.agentId === agentId && r.message === message);

  return (
    <div className="min-h-screen bg-[#0A0008] text-white font-[family-name:var(--font-inter)]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#0A0008]/90 backdrop-blur-xl py-4">
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          <Link href="/" className="font-[family-name:var(--font-poppins)] font-extrabold text-lg tracking-tight">
            TopK <span className={GRADIENT_TEXT}>Agent OS</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm text-white/60 hover:text-white transition-colors">Command Center</Link>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-orange-500/15 text-orange-300 border border-orange-500/30">
              Agent Auditions
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/5 mb-6">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500" />
            <span className="text-xs font-semibold tracking-wider uppercase text-white/60">Live Testing</span>
          </div>
          <h1 className="font-[family-name:var(--font-poppins)] font-extrabold text-4xl lg:text-5xl tracking-tight mb-4">
            Agent <span className={GRADIENT_TEXT}>Auditions</span>
          </h1>
          <p className="text-lg text-white/50 max-w-xl leading-relaxed mb-6">
            Test every agent with real queries. See how they respond, evaluate their tone, and decide if they're ready for deployment.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={runAllAuditions}
              disabled={globalLoading}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-orange-400 to-pink-500 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {globalLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Running all auditions...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Run All Auditions
                </>
              )}
            </button>
            <button
              onClick={() => setResults([])}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-white/75 border border-white/15 hover:border-white/40 transition-all"
            >
              Clear Results
            </button>
          </div>
        </div>

        {/* Stats */}
        {results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Tests Run", value: results.length },
              { label: "Completed", value: results.filter((r) => !r.loading).length },
              { label: "Using Gemini", value: results.filter((r) => r.source === "gemini").length },
              { label: "Using Mock", value: results.filter((r) => r.source === "mock").length },
            ].map((stat) => (
              <div key={stat.label} className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <div className="font-[family-name:var(--font-poppins)] font-extrabold text-3xl mb-1">{stat.value}</div>
                <div className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Agent Grid */}
        <div className="space-y-8">
          {agents.map((agent) => {
            const dept = departments.find((d) => d.id === agent.department);
            const prompt = AGENT_PROMPTS[agent.id];
            const result = getResult(agent.id, TEST_MESSAGES[0]);

            return (
              <div
                key={agent.id}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
              >
                {/* Agent Header */}
                <div className="p-6 flex items-start gap-5 border-b border-white/[0.06]">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
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
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="font-[family-name:var(--font-poppins)] font-bold text-xl">{agent.name}</h2>
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase"
                        style={{ background: `${dept?.color}15`, color: dept?.color, border: `1px solid ${dept?.color}40` }}
                      >
                        {dept?.name}
                      </span>
                    </div>
                    <p className="text-sm text-white/50">{agent.title}</p>
                    {prompt && (
                      <p className="text-xs text-white/30 mt-2 line-clamp-2">
                        {prompt.systemPrompt.split("\n")[0].replace("You are ", "")}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {result && !result.loading && (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          result.source === "gemini"
                            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {result.source === "gemini" ? "🟢 Gemini" : "🟡 Mock"}
                      </span>
                    )}
                    <Link
                      href={`/dashboard/agents/${agent.id}`}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-white/70 border border-white/10 hover:bg-white/[0.05] transition-colors"
                    >
                      Profile →
                    </Link>
                  </div>
                </div>

                {/* Test Controls */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {TEST_MESSAGES.map((msg) => {
                      const r = getResult(agent.id, msg);
                      return (
                        <button
                          key={msg}
                          onClick={() => runAudition(agent.id, msg)}
                          disabled={r?.loading}
                          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all disabled:opacity-50 ${
                            r && !r.loading
                              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                              : "bg-white/[0.04] border border-white/[0.08] text-white/50 hover:bg-white/[0.08] hover:text-white/70"
                          }`}
                        >
                          {r?.loading ? (
                            <span className="inline-flex items-center gap-1.5">
                              <span className="w-3 h-3 border border-white/20 border-t-white/60 rounded-full animate-spin" />
                              Testing...
                            </span>
                          ) : r ? (
                            "✓ Tested"
                          ) : (
                            msg
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Result */}
                  {result && !result.loading && (
                    <div className="mt-4 p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Response</span>
                        <span className="text-xs text-white/20">•</span>
                        <span className="text-xs text-white/30">Prompt: "{result.message}"</span>
                      </div>
                      <div className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                        {result.response}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
