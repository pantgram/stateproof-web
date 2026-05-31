import { cn } from "@/lib/cn";

const statusColors: Record<string, string> = {
  completed: "bg-[#34d399]/15 text-[#34d399] border-[#34d399]/30",
  pending: "bg-[#fbbf24]/15 text-[#fbbf24] border-[#fbbf24]/30",
  failed: "bg-[#fb7185]/15 text-[#fb7185] border-[#fb7185]/30",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
        statusColors[status] ?? "bg-[#1c2030] text-[#8892aa] border-[#1c2030]",
      )}
    >
      {status}
    </span>
  );
}
