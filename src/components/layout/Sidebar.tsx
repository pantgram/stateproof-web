import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Shield,
  UserCircle,
} from "lucide-react";

export function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
      isActive
        ? "bg-[#1c2030] text-[#dde3f0]"
        : "text-[#8892aa] hover:bg-[#0e1018] hover:text-[#dde3f0]"
    }`;

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-[#1c2030] bg-[#07080c]">
      <div className="flex h-14 items-center gap-2 border-b border-[#1c2030] px-4">
        <Shield className="h-5 w-5 text-[#60a5fa]" />
        <span className="text-base font-semibold text-[#dde3f0]">StateProof</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        <NavLink to="/dashboard" className={navLinkClass}>
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </NavLink>
        <NavLink to="/settings" className={navLinkClass}>
          <Settings className="h-4 w-4" />
          Settings
        </NavLink>
        <NavLink to="/profile" className={navLinkClass}>
          <UserCircle className="h-4 w-4" />
          Profile
        </NavLink>
      </nav>

      <div className="border-t border-[#1c2030] px-3 py-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#8892aa] hover:bg-[#0e1018] hover:text-[#fb7185] transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
