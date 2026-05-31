import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useMe } from "@/queries/useMe";
import { useClients, useDeleteClient, useRotateClientKey } from "@/queries/useClients";
import { useAuth } from "@/context/AuthContext";
import { CreateClientModal } from "@/components/settings/CreateClientModal";
import { ApiKeyDisplay } from "@/components/settings/ApiKeyDisplay";
import { Skeleton } from "@/components/common/Skeleton";
import { Button } from "@/components/ui/button";
import type { ClientResponse } from "@/lib/types";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  const { data: me, isLoading } = useMe();
  const { data: clients, isLoading: clientsLoading } = useClients();
  const deleteClient = useDeleteClient();
  const rotateClientKey = useRotateClientKey();
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [newClient, setNewClient] = useState<ClientResponse | null>(null);
  const [keyContext, setKeyContext] = useState<"create" | "rotate">("create");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-xl font-bold text-[#dde3f0]">Settings</h1>

      {isLoading ? (
        <div className="mt-6 space-y-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-56" />
        </div>
      ) : (
        me && (
          <div className="mt-6 rounded-lg border border-[#1c2030] bg-[#0e1018] p-5">
            <h2 className="text-sm font-medium text-[#8892aa] uppercase tracking-wide">
              Organization
            </h2>
            <p className="mt-2 text-base font-medium text-[#dde3f0]">
              {me.organization.name}
            </p>
            <div className="mt-4 grid gap-3 text-sm">
              <div>
                <span className="text-[#8892aa]">Name: </span>
                <span className="text-[#dde3f0]">{me.full_name ?? "—"}</span>
              </div>
              <div>
                <span className="text-[#8892aa]">Email: </span>
                <span className="text-[#dde3f0]">{me.email}</span>
              </div>
            </div>
          </div>
        )
      )}

      <div className="mt-8 rounded-lg border border-[#1c2030] bg-[#0e1018] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-[#8892aa] uppercase tracking-wide">
            API Clients
          </h2>
          <Button size="sm" onClick={() => setClientModalOpen(true)}>
            Create Client
          </Button>
        </div>
        <p className="mt-3 text-sm text-[#8892aa]">
          Manage API clients for programmatic access to StateProof.
        </p>

        {clientsLoading ? (
          <div className="mt-4 space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : clients && clients.length > 0 ? (
          <ul className="mt-4 divide-y divide-[#1c2030]">
            {clients.map((client) => (
              <li
                key={client.id}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#dde3f0]">
                    {client.name}
                  </p>
                  <p className="text-xs text-[#8892aa]">
                    Created {new Date(client.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium ${client.is_active ? "text-emerald-400" : "text-[#8892aa]"}`}
                  >
                    {client.is_active ? "Active" : "Inactive"}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs"
                    disabled={rotateClientKey.isPending}
                    onClick={() => {
                      rotateClientKey.mutate(client.id, {
                        onSuccess: (rotated) => {
                          setKeyContext("rotate");
                          setNewClient(rotated);
                        },
                      });
                    }}
                  >
                    Rotate
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs text-[#fb7185] hover:text-[#fb7185]"
                    disabled={deleteClient.isPending}
                    onClick={() => deleteClient.mutate(client.id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-[#8892aa]">No API clients yet.</p>
        )}
      </div>

      <div className="mt-8">
        <Button variant="destructive" onClick={handleLogout}>
          Sign out
        </Button>
      </div>

      <CreateClientModal
        open={clientModalOpen}
        onOpenChange={setClientModalOpen}
        onCreated={(client) => {
          setKeyContext("create");
          setNewClient(client);
          queryClient.invalidateQueries({ queryKey: ["clients"] });
        }}
      />

      <ApiKeyDisplay
        apiKey={newClient?.api_key ?? ""}
        open={!!newClient}
        onOpenChange={(v) => {
          if (!v) setNewClient(null);
        }}
        context={keyContext}
      />
    </div>
  );
}
