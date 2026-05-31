import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppShell() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[#07080c] p-6">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
}
