import { PublicRoute } from "@/components/layout/PublicRoute";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <PublicRoute>
      <div className="flex min-h-screen items-center justify-center bg-[#07080c] px-4">
        <LoginForm />
      </div>
    </PublicRoute>
  );
}
