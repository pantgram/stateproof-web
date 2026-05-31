import { useState } from "react";
import api from "@/lib/api";
import type { VerifyWorkflowRequest, VerifyWorkflowResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function VerifyPanel({ workflowId }: { workflowId: string }) {
  const [jsonInput, setJsonInput] = useState("");
  const [result, setResult] = useState<VerifyWorkflowResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const parsed = JSON.parse(jsonInput) as VerifyWorkflowRequest;
      const { data } = await api.post<VerifyWorkflowResponse>(
        `/api/v1/workflows/${workflowId}/verify`,
        parsed,
      );
      setResult(data);
    } catch (err: unknown) {
      if (err instanceof SyntaxError) {
        setError("Invalid JSON");
      } else {
        const msg =
          (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ??
          "Verification failed";
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Paste JSON: { "sessions": [{ "session_id": "...", "events": [{ "sequence_no": 0, "payload": {...} }] }] }'
        rows={10}
        className="w-full rounded-lg border border-[#1c2030] bg-[#0e1018] p-3 font-mono text-sm text-[#dde3f0] placeholder:text-[#8892aa] focus:outline-none focus:ring-1 focus:ring-[#60a5fa]"
      />
      <div className="flex gap-2">
        <Button onClick={handleVerify} disabled={loading || !jsonInput.trim()}>
          {loading ? "Verifying..." : "Verify"}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setJsonInput("");
            setResult(null);
            setError(null);
          }}
        >
          Clear
        </Button>
      </div>

      {error && (
        <div className="rounded-md border border-[#fb7185]/30 bg-[#fb7185]/10 px-4 py-3 text-sm text-[#fb7185]">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-3">
          <div
            className={`rounded-md border px-4 py-3 text-sm font-medium ${
              result.all_valid
                ? "border-[#34d399]/30 bg-[#34d399]/10 text-[#34d399]"
                : "border-[#fb7185]/30 bg-[#fb7185]/10 text-[#fb7185]"
            }`}
          >
            {result.all_valid ? "All sessions valid" : "Some sessions are invalid"}
          </div>
          <div className="space-y-2">
            {result.results.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md border border-[#1c2030] bg-[#0e1018] px-4 py-2"
              >
                <span className="font-mono text-xs text-[#dde3f0]">
                  {r.session_id.slice(0, 8)}...
                </span>
                <div className="flex items-center gap-2">
                  {r.reason && (
                    <span className="text-xs text-[#8892aa]">{r.reason}</span>
                  )}
                  <span
                    className={`text-xs font-medium ${
                      r.valid ? "text-[#34d399]" : "text-[#fb7185]"
                    }`}
                  >
                    {r.valid ? "Valid" : "Invalid"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
