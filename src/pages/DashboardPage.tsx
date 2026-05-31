import { useState } from "react";
import { Plus } from "lucide-react";
import { useWorkflows } from "@/queries/useWorkflows";
import { WorkflowCard } from "@/components/workflows/WorkflowCard";
import { CreateWorkflowModal } from "@/components/workflows/CreateWorkflowModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/common/Skeleton";

export default function DashboardPage() {
  const { data: workflows, isLoading } = useWorkflows();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#dde3f0]">Workflows</h1>
        <Button onClick={() => setModalOpen(true)} size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          New Workflow
        </Button>
      </div>

      {isLoading && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg" />
          ))}
        </div>
      )}

      {!isLoading && workflows && workflows.length === 0 && (
        <div className="mt-16 flex flex-col items-center text-center">
          <p className="text-[#8892aa]">No workflows yet.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setModalOpen(true)}
          >
            Create your first workflow
          </Button>
        </div>
      )}

      {!isLoading && workflows && workflows.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workflows.map((w) => (
            <WorkflowCard key={w.id} workflow={w} />
          ))}
        </div>
      )}

      <CreateWorkflowModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
