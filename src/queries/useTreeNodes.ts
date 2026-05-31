import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { WorkflowTreeNodeListResponse } from "@/lib/types";

export function useTreeNodes(workflowId: string | undefined) {
  return useQuery({
    queryKey: ["tree-nodes", workflowId],
    queryFn: async () => {
      const { data } = await api.get<WorkflowTreeNodeListResponse>(
        `/api/v1/workflows/${workflowId}/tree-nodes`,
        { params: { offset: 0, limit: 100 } },
      );
      return data.workflow_tree_nodes;
    },
    enabled: !!workflowId,
  });
}
