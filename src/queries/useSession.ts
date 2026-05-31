import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { SessionResponse } from "@/lib/types";

export function useSession(
  workflowId: string | undefined,
  sessionId: string | undefined,
) {
  return useQuery({
    queryKey: ["session", workflowId, sessionId],
    queryFn: async () => {
      const { data } = await api.get<SessionResponse>(
        `/api/v1/workflows/${workflowId}/sessions/${sessionId}`,
      );
      return data;
    },
    enabled: !!workflowId && !!sessionId,
  });
}
