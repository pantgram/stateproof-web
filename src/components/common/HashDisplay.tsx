import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { truncateHash } from "@/lib/utils";

export function HashDisplay({ hash, label }: { hash: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span className="inline-flex items-center gap-1.5">
      {label && <span className="text-xs text-[#8892aa]">{label}</span>}
      <code className="rounded bg-[#1c2030] px-1.5 py-0.5 text-xs font-mono text-[#dde3f0]">
        {truncateHash(hash)}
      </code>
      <button
        onClick={handleCopy}
        className="text-[#8892aa] hover:text-[#dde3f0] transition-colors"
        title="Copy"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-[#34d399]" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </span>
  );
}
