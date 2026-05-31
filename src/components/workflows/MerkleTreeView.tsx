import { useMemo, useState, useCallback } from "react";
import ReactFlow, {
  type Node,
  type Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  type NodeMouseHandler,
  type NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import type { SessionResponse, WorkflowTreeNodeResponse } from "@/lib/types";
import { truncateHash } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const NODE_WIDTH = 180;
const NODE_HEIGHT = 50;
const X_SPACING = 220;
const Y_SPACING = 100;

const PROMOTED_OFFSET = 110;

function buildTree(treeNodes: WorkflowTreeNodeResponse[]) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  if (treeNodes.length === 0) return { nodes, edges };

  const isRoot = (tn: WorkflowTreeNodeResponse) => tn.parent_hash === null;

  const hashToNodes = new Map<string, WorkflowTreeNodeResponse[]>();
  treeNodes.forEach((tn) => {
    if (!hashToNodes.has(tn.hash)) hashToNodes.set(tn.hash, []);
    hashToNodes.get(tn.hash)!.push(tn);
  });

  const maxLevel = Math.max(...treeNodes.map((tn) => tn.level));

  const levelMap = new Map<number, WorkflowTreeNodeResponse[]>();
  treeNodes.forEach((tn) => {
    if (!levelMap.has(tn.level)) levelMap.set(tn.level, []);
    levelMap.get(tn.level)!.push(tn);
  });
  levelMap.forEach((group) => {
    group.sort((a, b) => a.position - b.position);
  });

  const childrenOf = new Map<string, WorkflowTreeNodeResponse[]>();
  treeNodes.forEach((tn) => {
    if (tn.parent_hash === null) return;
    const parentCandidates = hashToNodes.get(tn.parent_hash) || [];
    const parent = parentCandidates.find((p) => p.level === tn.level + 1);
    if (parent) {
      if (!childrenOf.has(parent.id)) childrenOf.set(parent.id, []);
      childrenOf.get(parent.id)!.push(tn);
    }
  });
  childrenOf.forEach((children) => {
    children.sort((a, b) => a.position - b.position);
  });

  const positions = new Map<string, { x: number; y: number }>();

  const leaves = levelMap.get(0) || [];
  leaves.forEach((tn) => {
    positions.set(tn.id, { x: tn.position * X_SPACING, y: 0 });
  });

  for (let level = 1; level <= maxLevel; level++) {
    const y = level * Y_SPACING;
    const levelNodes = levelMap.get(level) || [];
    for (const tn of levelNodes) {
      const children = childrenOf.get(tn.id) || [];
      const childXs = children
        .map((c) => positions.get(c.id))
        .filter(Boolean)
        .map((p) => p!.x);

      if (childXs.length > 0) {
        let x = childXs.reduce((s, v) => s + v, 0) / childXs.length;
        if (children.length === 1 && children[0].hash === tn.hash) {
          x = childXs[0] - PROMOTED_OFFSET;
        }
        positions.set(tn.id, { x, y });
      } else {
        const idx = levelNodes.indexOf(tn);
        positions.set(tn.id, { x: idx * X_SPACING, y });
      }
    }
  }

  treeNodes.forEach((tn) => {
    let nodeType: string;
    if (tn.is_leaf) {
      nodeType = "leaf";
    } else if (isRoot(tn)) {
      nodeType = "root";
    } else {
      nodeType = "internal";
    }

    const pos = positions.get(tn.id) || { x: 0, y: 0 };

    nodes.push({
      id: `node-${tn.id}`,
      type: nodeType,
      data: {
        label: truncateHash(tn.hash),
        sessionId: tn.session_id,
        hash: tn.hash,
        level: tn.level,
        position: tn.position,
        isLeaf: tn.is_leaf,
      },
      position: { x: pos.x, y: pos.y },
    });
  });

  treeNodes.forEach((tn) => {
    if (tn.parent_hash === null) return;

    const parentCandidates = hashToNodes.get(tn.parent_hash) || [];
    const parent = parentCandidates.find((p) => p.level === tn.level + 1);

    if (parent) {
      edges.push({
        id: `e-${tn.id}-${parent.id}`,
        source: `node-${tn.id}`,
        target: `node-${parent.id}`,
        style: { stroke: "#1c2030" },
      });
    }
  });

  return { nodes, edges };
}

function LeafNode({ data }: NodeProps) {
  return (
    <div className="flex h-[50px] w-[180px] items-center justify-center rounded-lg border-2 border-[#60a5fa]/50 bg-[#0e1018] text-xs font-mono text-[#dde3f0]">
      {data.label as string}
    </div>
  );
}

function InternalNode({ data }: NodeProps) {
  return (
    <div className="flex h-[50px] w-[180px] items-center justify-center rounded-lg border-2 border-[#a78bfa]/50 bg-[#0e1018] text-xs font-mono text-[#dde3f0]">
      {data.label as string}
    </div>
  );
}

function RootNode({ data }: NodeProps) {
  return (
    <div className="flex h-[50px] w-[180px] items-center justify-center rounded-lg border-4 border-[#a78bfa]/70 bg-[#0e1018] text-xs font-mono text-[#dde3f0]">
      {data.label as string}
    </div>
  );
}

const nodeTypes = {
  leaf: LeafNode,
  internal: InternalNode,
  root: RootNode,
};

export function MerkleTreeView({
  treeNodes,
  sessions,
  workflowId,
}: {
  treeNodes: WorkflowTreeNodeResponse[];
  sessions: SessionResponse[];
  workflowId: string;
}) {
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState<SessionResponse | null>(null);

  const { nodes: layoutNodes, edges: layoutEdges } = useMemo(
    () => buildTree(treeNodes),
    [treeNodes],
  );

  const [nodes, , onNodesChange] = useNodesState(layoutNodes);
  const [edges, , onEdgesChange] = useEdgesState(layoutEdges);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      const sessionId = node.data?.sessionId as string | null;
      if (!sessionId) return;
      const session = sessions.find((s) => s.id === sessionId);
      if (session) setSelectedSession(session);
    },
    [sessions],
  );

  if (treeNodes.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-[#8892aa]">
        No tree nodes to display.
      </div>
    );
  }

  return (
    <div className="flex h-[600px] gap-4">
      <div className="flex-1 rounded-lg border border-[#1c2030] bg-[#07080c]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.3}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#1c2030" gap={20} />
          <Controls
            showInteractive={false}
            className="!border-[#1c2030] !bg-[#0e1018] !text-[#8892aa]"
          />
        </ReactFlow>
      </div>

      {selectedSession && (
        <div className="w-72 rounded-lg border border-[#1c2030] bg-[#0e1018] p-4">
          <h3 className="text-sm font-medium text-[#dde3f0]">Session</h3>
          <p className="mt-1 font-mono text-xs text-[#8892aa]">
            {truncateHash(selectedSession.id)}
          </p>
          <div className="mt-3 space-y-2 text-xs text-[#8892aa]">
            <p>Hash: {truncateHash(selectedSession.session_hash)}</p>
            <p>Status: {selectedSession.status}</p>
            <p>Started: {selectedSession.started_at}</p>
          </div>
          <button
            onClick={() =>
              navigate(`/workflows/${workflowId}/sessions/${selectedSession.id}`)
            }
            className="mt-4 w-full rounded-md bg-[#60a5fa] px-3 py-1.5 text-xs font-medium text-[#07080c] hover:bg-[#60a5fa]/90"
          >
            View Session
          </button>
        </div>
      )}
    </div>
  );
}
