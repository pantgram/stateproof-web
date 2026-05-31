import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { SessionProofResponse } from "@/lib/types";

export function useProof(
  workflowId: string | undefined,
  sessionId: string | undefined,
  enabled = false,
) {
  return useQuery({
    queryKey: ["proof", workflowId, sessionId],
    queryFn: async () => {
      const { data } = await api.get<SessionProofResponse>(
        `/api/v1/workflows/${workflowId}/sessions/${sessionId}/proof`,
      );
      return data;
    },
    enabled: !!workflowId && !!sessionId && enabled,
  });
}
