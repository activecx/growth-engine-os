"use client";

import { getStatusCounts } from "@/lib/agents";

export default function StatusBar() {
  const counts = getStatusCounts();

  const items = [
    { label: "Total Agents", value: counts.total, color: "text-white" },
    { label: "Active", value: counts.active, color: "text-emerald-400" },
    { label: "Idle", value: counts.idle, color: "text-zinc-400" },
    { label: "In Training", value: counts.inTraining, color: "text-amber-400" },
    { label: "Paused", value: counts.paused, color: "text-red-400" },
  ];

  return (
    <div className="flex items-center gap-0 rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`flex items-center gap-3 px-6 py-4 ${
            i !== items.length - 1 ? "border-r border-white/[0.08]" : ""
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${item.color.replace("text", "bg")}`} />
          <div>
            <div className={`font-[family-name:var(--font-poppins)] font-bold text-lg ${item.color}`}>
              {item.value}
            </div>
            <div className="text-xs text-white/40 font-medium tracking-wide">
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
