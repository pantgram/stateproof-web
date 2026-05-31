import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { WorkflowResponse } from "@/lib/types";

export function useWorkflows(offset = 0, limit = 50) {
  return useQuery({
    queryKey: ["workflows", offset, limit],
    queryFn: async () => {
      const { data } = await api.get<{ workflows: WorkflowResponse[]; total: number }>(
        "/api/v1/workflows",
        { params: { offset, limit } },
      );
      return data.workflows;
    },
  });
}
