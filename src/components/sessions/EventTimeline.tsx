import { EventCard } from "./EventCard";

export function EventTimeline({ events }: { events: Record<string, unknown>[] }) {
  if (!events || events.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-[#8892aa]">
        No events recorded.
      </div>
    );
  }

  const sorted = [...events].sort((a, b) => {
    const seqA = (a.sequence_no as number) ?? 0;
    const seqB = (b.sequence_no as number) ?? 0;
    return seqA - seqB;
  });

  return (
    <div className="space-y-0">
      {sorted.map((event, i) => (
        <EventCard key={i} event={event} sequenceNo={i + 1} />
      ))}
    </div>
  );
}
