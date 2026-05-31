import { cn } from "@/lib/cn";

const eventColors: Record<string, string> = {
  tool_call: "bg-[#60a5fa]/15 text-[#60a5fa] border-[#60a5fa]/30",
  decision: "bg-[#a78bfa]/15 text-[#a78bfa] border-[#a78bfa]/30",
  approval: "bg-[#fbbf24]/15 text-[#fbbf24] border-[#fbbf24]/30",
  api_call: "bg-[#34d399]/15 text-[#34d399] border-[#34d399]/30",
  error: "bg-[#fb7185]/15 text-[#fb7185] border-[#fb7185]/30",
  trigger: "bg-[#22d3ee]/15 text-[#22d3ee] border-[#22d3ee]/30",
};

export function EventTypeBadge({ type }: { type?: string }) {
  if (!type) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        eventColors[type] ?? "bg-[#1c2030] text-[#8892aa] border-[#1c2030]",
      )}
    >
      {type.replace(/_/g, " ")}
    </span>
  );
}
