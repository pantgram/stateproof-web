import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSession } from "@/queries/useSession";
import { useProof } from "@/queries/useProof";
import { ProofDrawer } from "@/components/sessions/ProofDrawer";
import { HashDisplay } from "@/components/common/HashDisplay";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Skeleton } from "@/components/common/Skeleton";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export default function SessionPage() {
  const { workflowId, sessionId } = useParams<{
    workflowId: string;
    sessionId: string;
  }>();
  const navigate = useNavigate();
  const { data: session, isLoading } = useSession(workflowId, sessionId);
  const [showProof, setShowProof] = useState(false);
  const proofQuery = useProof(workflowId, sessionId, showProof);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-64 rounded-lg" />
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate(`/workflows/${workflowId}`)}
        className="mb-4 flex items-center gap-1.5 text-sm text-[#8892aa] hover:text-[#dde3f0] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to workflow
      </button>

      {session && (
        <>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-[#dde3f0]">Session</h1>
                <StatusBadge status={session.status} />
              </div>
              <p className="mt-1 font-mono text-xs text-[#8892aa]">
                {session.id}
              </p>
            </div>
            <Button onClick={() => setShowProof(true)} size="sm">
              Get Proof
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#8892aa]">
            <span>Started: {formatDate(session.started_at)}</span>
            <span>Ended: {formatDate(session.ended_at)}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <HashDisplay hash={session.session_hash} label="session_hash" />
          </div>
        </>
      )}

      {showProof && proofQuery.data && (
        <ProofDrawer proof={proofQuery.data} onClose={() => setShowProof(false)} />
      )}
    </div>
  );
}
