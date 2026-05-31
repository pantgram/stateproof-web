import { PublicRoute } from "@/components/layout/PublicRoute";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <PublicRoute>
      <div className="flex min-h-screen items-center justify-center bg-[#07080c] px-4">
        <ResetPasswordForm />
      </div>
    </PublicRoute>
  );
}
