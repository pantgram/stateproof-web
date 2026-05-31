import { useMe } from "@/queries/useMe";
import { Skeleton } from "@/components/common/Skeleton";
import { User, Mail, Shield, Building2, CheckCircle2 } from "lucide-react";

function FieldRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 py-3">
      <Icon className="h-4 w-4 text-[#60a5fa]" />
      <div className="min-w-0">
        <p className="text-xs text-[#8892aa]">{label}</p>
        <p className="text-sm text-[#dde3f0]">{value}</p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { data: me, isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl">
        <h1 className="text-xl font-bold text-[#dde3f0]">Profile</h1>
        <div className="mt-6 space-y-3">
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!me) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-xl font-bold text-[#dde3f0]">Profile</h1>

      <div className="mt-6 rounded-lg border border-[#1c2030] bg-[#0e1018] p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1c2030]">
            <User className="h-6 w-6 text-[#60a5fa]" />
          </div>
          <div>
            <p className="text-base font-semibold text-[#dde3f0]">
              {me.full_name ?? "No name set"}
            </p>
            <p className="text-sm text-[#8892aa]">{me.email}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-[#1c2030] bg-[#0e1018] p-5">
        <h2 className="text-sm font-medium text-[#8892aa] uppercase tracking-wide">
          Account Details
        </h2>
        <div className="mt-2 divide-y divide-[#1c2030]">
          <FieldRow icon={Mail} label="Email" value={me.email} />
          <FieldRow icon={User} label="Full Name" value={me.full_name ?? "—"} />
          <FieldRow
            icon={Shield}
            label="Role"
            value={me.role.charAt(0).toUpperCase() + me.role.slice(1)}
          />
          <FieldRow
            icon={CheckCircle2}
            label="Status"
            value={me.status.charAt(0).toUpperCase() + me.status.slice(1)}
          />
          <FieldRow icon={Building2} label="Organization" value={me.organization.name} />
        </div>
      </div>
    </div>
  );
}
