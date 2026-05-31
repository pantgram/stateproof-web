import { useState } from "react";
import api from "@/lib/api";
import type { SessionProofResponse } from "@/lib/types";
import { HashDisplay } from "@/components/common/HashDisplay";
import { Button } from "@/components/ui/button";
import { X, Check, ArrowRight } from "lucide-react";

export function ProofDrawer({
  proof,
  onClose,
}: {
  proof: SessionProofResponse;
  onClose: () => void;
}) {
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async () => {
    setVerifying(true);
    try {
      const { data } = await api.post<{ valid: boolean }>("/api/v1/verify", {
        leaf_hash: proof.leaf_hash,
        proof_path: proof.proof_path,
        hex_root: proof.hex_root,
      });
      setVerifyResult(data.valid);
    } catch {
      setVerifyResult(false);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-96 border-l border-[#1c2030] bg-[#0e1018] p-6 shadow-xl overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#dde3f0]">Proof</h2>
        <button
          onClick={onClose}
          className="text-[#8892aa] hover:text-[#dde3f0]"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-xs text-[#8892aa] mb-1">Leaf Hash</p>
          <HashDisplay hash={proof.leaf_hash} />
        </div>
        <div>
          <p className="text-xs text-[#8892aa] mb-1">Root</p>
          <HashDisplay hash={proof.hex_root} />
        </div>

        <div>
          <p className="text-xs text-[#8892aa] mb-3">Proof Path</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="rounded bg-[#60a5fa]/15 px-1.5 py-0.5 text-[#60a5fa]">
                leaf
              </span>
              <code className="font-mono text-[#dde3f0]">
                {proof.leaf_hash.slice(0, 8)}...
              </code>
            </div>
            {proof.proof_path.map((step, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <ArrowRight className="h-3 w-3 text-[#8892aa]" />
                <span
                  className={`rounded px-1.5 py-0.5 ${
                    step.direction === "left"
                      ? "bg-[#34d399]/15 text-[#34d399]"
                      : "bg-[#a78bfa]/15 text-[#a78bfa]"
                  }`}
                >
                  {step.direction}
                </span>
                <code className="font-mono text-[#dde3f0]">
                  {step.hash.slice(0, 8)}...{step.hash.slice(-6)}
                </code>
              </div>
            ))}
            <div className="flex items-center gap-2 text-xs">
              <ArrowRight className="h-3 w-3 text-[#8892aa]" />
              <span className="rounded bg-[#a78bfa]/15 px-1.5 py-0.5 text-[#a78bfa]">
                root
              </span>
              <code className="font-mono text-[#dde3f0]">
                {proof.hex_root.slice(0, 8)}...{proof.hex_root.slice(-6)}
              </code>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#1c2030]">
          <Button onClick={handleVerify} disabled={verifying} className="w-full">
            {verifying ? "Verifying..." : "Verify Proof"}
          </Button>
          {verifyResult !== null && (
            <div
              className={`mt-3 flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium ${
                verifyResult
                  ? "border-[#34d399]/30 bg-[#34d399]/10 text-[#34d399]"
                  : "border-[#fb7185]/30 bg-[#fb7185]/10 text-[#fb7185]"
              }`}
            >
              {verifyResult ? (
                <Check className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
              {verifyResult ? "Proof is valid" : "Proof is invalid"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
