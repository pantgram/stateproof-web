import { PublicRoute } from "@/components/layout/PublicRoute";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <PublicRoute>
      <div className="flex min-h-screen items-center justify-center bg-[#07080c] px-4">
        <SignupForm />
      </div>
    </PublicRoute>
  );
}
