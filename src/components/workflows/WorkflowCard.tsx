import { useNavigate } from "react-router-dom";
import { HashDisplay } from "@/components/common/HashDisplay";
import { useSessionCount } from "@/queries/useSessionCount";
import { formatDate } from "@/lib/utils";
import type { WorkflowResponse } from "@/lib/types";

export function WorkflowCard({ workflow }: { workflow: WorkflowResponse }) {
  const navigate = useNavigate();
  const { data: sessionCount } = useSessionCount(workflow.id);

  return (
    <button
      onClick={() => navigate(`/workflows/${workflow.id}`)}
      className="w-full rounded-lg border border-[#1c2030] bg-[#0e1018] p-4 text-left transition-colors hover:border-[#60a5fa]/30 hover:bg-[#0e1018]/80"
    >
      <div className="flex items-start justify-between">
        <h3 className="font-medium text-[#dde3f0]">{workflow.name}</h3>
        <span className="text-xs text-[#8892aa]">
          {formatDate(workflow.created_at)}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-4 text-sm text-[#8892aa]">
        <span>{sessionCount ?? 0} sessions</span>
        <HashDisplay hash={workflow.hex_root} />
      </div>
    </button>
  );
}
