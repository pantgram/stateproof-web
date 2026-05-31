import { ExecutorBadge } from "@/components/common/ExecutorBadge";
import { EventTypeBadge } from "@/components/common/EventTypeBadge";
import { JsonViewer } from "@/components/common/JsonViewer";
import { formatDate } from "@/lib/utils";
import type { EventPayload } from "@/lib/types";

export function EventCard({
  event,
  sequenceNo,
}: {
  event: Record<string, unknown>;
  sequenceNo: number;
}) {
  const e = event as unknown as EventPayload;

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#60a5fa] bg-[#0e1018] text-xs font-bold text-[#60a5fa]">
          {sequenceNo}
        </div>
        <div className="flex-1 w-px bg-[#1c2030]" />
      </div>
      <div className="flex-1 pb-6">
        <div className="rounded-lg border border-[#1c2030] bg-[#0e1018] p-4">
          <div className="flex flex-wrap items-center gap-2">
            <ExecutorBadge type={e.executor_type} />
            <EventTypeBadge type={e.event_type} />
            <span className="text-xs text-[#8892aa]">
              {formatDate(e.timestamp)}
            </span>
          </div>
          <p className="mt-2 text-sm text-[#dde3f0]">{e.action}</p>
          {e.data && Object.keys(e.data).length > 0 && (
            <div className="mt-3">
              <JsonViewer data={e.data} label="Event Data" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
