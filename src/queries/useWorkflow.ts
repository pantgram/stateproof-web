import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { WorkflowResponse } from "@/lib/types";

export function useWorkflow(workflowId: string | undefined) {
  return useQuery({
    queryKey: ["workflow", workflowId],
    queryFn: async () => {
      const { data } = await api.get<WorkflowResponse>(
        `/api/v1/workflows/${workflowId}`,
      );
      return data;
    },
    enabled: !!workflowId,
  });
}
