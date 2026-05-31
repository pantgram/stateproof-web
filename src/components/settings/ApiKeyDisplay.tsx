import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function ApiKeyDisplay({
  apiKey,
  open,
  onOpenChange,
  context = "create",
}: {
  apiKey: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context?: "create" | "rotate";
}) {
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    if (confirmed) {
      setCopied(false);
      setConfirmed(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v && confirmed) handleClose();
      }}
    >
      <DialogContent
        className="max-w-[90vw] w-[360px] overflow-hidden p-4"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => {
          if (!confirmed) e.preventDefault();
        }}
      >
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-base">
            {context === "rotate" ? "API Key Rotated" : "API Key Created"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            {context === "rotate"
              ? "A new key has been generated. Copy it now — the old key is no longer valid."
              : "Copy this key now. It will not be shown again."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 overflow-hidden">
          <div className="flex items-center gap-2 rounded-md border border-[#1c2030] bg-[#07080c] px-2.5 py-2 overflow-hidden">
            <code className="min-w-0 flex-1 overflow-hidden break-all font-mono text-xs text-[#dde3f0]">
              {apiKey}
            </code>
            <button
              onClick={handleCopy}
              className="shrink-0 text-[#8892aa] hover:text-[#dde3f0] transition-colors"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-[#34d399]" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          <div className="flex items-start gap-2">
            <Checkbox
              id="confirm"
              checked={confirmed}
              onCheckedChange={(v) => setConfirmed(v === true)}
            />
            <label htmlFor="confirm" className="text-xs text-[#8892aa] leading-tight">
              I have copied this key and understand it cannot be retrieved later.
            </label>
          </div>
          <Button
            size="sm"
            className="w-full"
            onClick={handleClose}
            disabled={!confirmed}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
