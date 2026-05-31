import { useNavigate } from "react-router-dom";
import { formatDate, truncateHash } from "@/lib/utils";
import type { SessionResponse } from "@/lib/types";
import { StatusBadge } from "@/components/common/StatusBadge";

export function SessionsTable({
  sessions,
  workflowId,
}: {
  sessions: SessionResponse[];
  workflowId: string;
}) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto rounded-lg border border-[#1c2030]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#1c2030] bg-[#0e1018]">
            <th className="px-4 py-3 text-left font-medium text-[#8892aa]">ID</th>
            <th className="px-4 py-3 text-left font-medium text-[#8892aa]">Status</th>
            <th className="px-4 py-3 text-left font-medium text-[#8892aa]">Started</th>
            <th className="px-4 py-3 text-left font-medium text-[#8892aa]">Ended</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr
              key={s.id}
              onClick={() => navigate(`/workflows/${workflowId}/sessions/${s.id}`)}
              className="cursor-pointer border-b border-[#1c2030] transition-colors hover:bg-[#0e1018]"
            >
              <td className="px-4 py-3 font-mono text-xs text-[#dde3f0]">
                {truncateHash(s.id)}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={s.status} />
              </td>
              <td className="px-4 py-3 text-[#8892aa]">{formatDate(s.started_at)}</td>
              <td className="px-4 py-3 text-[#8892aa]">{formatDate(s.ended_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
