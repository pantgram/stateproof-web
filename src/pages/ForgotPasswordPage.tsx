import { PublicRoute } from "@/components/layout/PublicRoute";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <PublicRoute>
      <div className="flex min-h-screen items-center justify-center bg-[#07080c] px-4">
        <ForgotPasswordForm />
      </div>
    </PublicRoute>
  );
}
