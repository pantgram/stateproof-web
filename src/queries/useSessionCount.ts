import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useSessionCount(workflowId: string | undefined) {
  return useQuery({
    queryKey: ["session-count", workflowId],
    queryFn: async () => {
      const { data } = await api.get<{ total: number }>(
        `/api/v1/workflows/${workflowId}/sessions`,
        { params: { limit: 1 } },
      );
      return data.total;
    },
    enabled: !!workflowId,
  });
}
