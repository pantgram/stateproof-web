import { useParams, useSearchParams } from "react-router-dom";
import { useWorkflow } from "@/queries/useWorkflow";
import { useSessions } from "@/queries/useSessions";
import { useTreeNodes } from "@/queries/useTreeNodes";
import { SessionsTable } from "@/components/workflows/SessionsTable";
import { MerkleTreeView } from "@/components/workflows/MerkleTreeView";
import { VerifyPanel } from "@/components/workflows/VerifyPanel";
import { HashDisplay } from "@/components/common/HashDisplay";
import { Skeleton } from "@/components/common/Skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function WorkflowPage() {
  const { workflowId } = useParams<{ workflowId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: workflow, isLoading: wfLoading } = useWorkflow(workflowId);
  const { data: sessions, isLoading: sessLoading } = useSessions(workflowId);
  const { data: treeNodes, isLoading: treeLoading } = useTreeNodes(workflowId);

  const tab = searchParams.get("tab") ?? "sessions";

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  if (wfLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-64 rounded-lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#dde3f0]">
          {workflow?.name ?? "Workflow"}
        </h1>
        {workflow && (
          <div className="flex items-center gap-4 text-sm text-[#8892aa]">
            <span>{sessions?.length ?? 0} sessions</span>
            <HashDisplay hash={workflow.hex_root} label="Root" />
          </div>
        )}
      </div>

      <Tabs value={tab} onValueChange={handleTabChange} className="mt-6">
        <TabsList>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="tree">Tree</TabsTrigger>
          <TabsTrigger value="verify">Verify</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions">
          {sessLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 rounded-lg" />
              ))}
            </div>
          ) : sessions && sessions.length > 0 ? (
            <SessionsTable sessions={sessions} workflowId={workflowId!} />
          ) : (
            <div className="flex h-32 items-center justify-center text-sm text-[#8892aa]">
              No sessions yet.
            </div>
          )}
        </TabsContent>

        <TabsContent value="tree">
          {treeLoading ? (
            <Skeleton className="h-[600px] rounded-lg" />
          ) : (
            <MerkleTreeView
              treeNodes={treeNodes ?? []}
              sessions={sessions ?? []}
              workflowId={workflowId!}
            />
          )}
        </TabsContent>

        <TabsContent value="verify">
          <VerifyPanel workflowId={workflowId!} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
