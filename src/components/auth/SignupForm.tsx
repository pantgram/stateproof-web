import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import type { SignupResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signupSchema = z.object({
  organization_name: z.string().min(1, "Organization name is required"),
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);
  const [waitingApproval, setWaitingApproval] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (values: SignupFormValues) => {
    setApiError(null);
    try {
      const { data } = await api.post<SignupResponse>(
        "/api/v1/auth/signup",
        values,
      );
      if (data.access_token && data.refresh_token) {
        login(data.access_token, data.refresh_token);
        navigate("/dashboard");
      } else {
        setWaitingApproval(true);
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ??
        "Signup failed. Please try again.";
      setApiError(msg);
    }
  };

  if (waitingApproval) {
    return (
      <div className="mx-auto w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-[#dde3f0]">Account Created</h1>
        <p className="mt-2 text-sm text-[#8892aa]">
          Waiting for admin approval.
        </p>
        <Link
          to="/login"
          className="mt-4 inline-block text-sm text-[#60a5fa] hover:underline"
        >
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[#dde3f0]">Create account</h1>
        <p className="mt-1 text-sm text-[#8892aa]">
          Set up your organization on StateProof
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="organization_name">Organization</Label>
          <Input
            id="organization_name"
            placeholder="Acme Corp"
            className="bg-[#0e1018] border-[#1c2030]"
            {...register("organization_name")}
          />
          {errors.organization_name && (
            <p className="text-xs text-[#fb7185]">
              {errors.organization_name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="full_name">Full name</Label>
          <Input
            id="full_name"
            placeholder="Jane Doe"
            className="bg-[#0e1018] border-[#1c2030]"
            {...register("full_name")}
          />
          {errors.full_name && (
            <p className="text-xs text-[#fb7185]}">{errors.full_name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            className="bg-[#0e1018] border-[#1c2030]"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-[#fb7185]">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="bg-[#0e1018] border-[#1c2030]"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-[#fb7185]">{errors.password.message}</p>
          )}
        </div>

        {apiError && (
          <div className="rounded-md border border-[#fb7185]/30 bg-[#fb7185]/10 px-3 py-2 text-sm text-[#fb7185]">
            {apiError}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-[#8892aa]">
        Already have an account?{" "}
        <Link to="/login" className="text-[#60a5fa] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
