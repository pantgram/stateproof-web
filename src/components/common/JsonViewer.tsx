import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

export function JsonViewer({ data, label }: { data: unknown; label?: string }) {
  const [open, setOpen] = useState(false);
  const json = JSON.stringify(data, null, 2);

  return (
    <div className="rounded-md border border-[#1c2030] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-[#8892aa] hover:text-[#dde3f0] hover:bg-[#0e1018] transition-colors"
      >
        {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        {label ?? "Data"}
      </button>
      {open && (
        <pre className="max-h-64 overflow-auto bg-[#07080c] p-3 text-xs font-mono text-[#dde3f0] scrollbar-thin">
          {json}
        </pre>
      )}
    </div>
  );
}
