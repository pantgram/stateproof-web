import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { SessionListResponse } from "@/lib/types";

export function useSessions(
  workflowId: string | undefined,
  offset = 0,
  limit = 50,
) {
  return useQuery({
    queryKey: ["sessions", workflowId, offset, limit],
    queryFn: async () => {
      const { data } = await api.get<SessionListResponse>(
        `/api/v1/workflows/${workflowId}/sessions`,
        { params: { offset, limit } },
      );
      return data.sessions;
    },
    enabled: !!workflowId,
  });
}
