import { cn } from "@/lib/cn";

const executorColors: Record<string, string> = {
  agent: "bg-[#a78bfa]/15 text-[#a78bfa] border-[#a78bfa]/30",
  rpa: "bg-[#60a5fa]/15 text-[#60a5fa] border-[#60a5fa]/30",
  human: "bg-[#fbbf24]/15 text-[#fbbf24] border-[#fbbf24]/30",
  integration: "bg-[#34d399]/15 text-[#34d399] border-[#34d399]/30",
  job: "bg-[#22d3ee]/15 text-[#22d3ee] border-[#22d3ee]/30",
  system: "bg-[#fb7185]/15 text-[#fb7185] border-[#fb7185]/30",
};

const executorLabels: Record<string, string> = {
  agent: "AI Agent",
  rpa: "RPA Bot",
  human: "Human",
  integration: "Integration",
  job: "Scheduled Job",
  system: "System",
};

export function ExecutorBadge({ type }: { type: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        executorColors[type] ?? "bg-[#1c2030] text-[#8892aa] border-[#1c2030]",
      )}
    >
      {executorLabels[type] ?? type}
    </span>
  );
}
