import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import type { LoginResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    setApiError(null);
    try {
      const { data } = await api.post<LoginResponse>("/api/v1/auth/login", values);
      login(data.access_token, data.refresh_token);
      navigate("/dashboard");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ??
        "Login failed. Please try again.";
      setApiError(msg);
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[#dde3f0]">Sign in</h1>
        <p className="mt-1 text-sm text-[#8892aa]">
          Enter your credentials to access StateProof
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>

        <p className="text-center text-sm text-[#8892aa]">
          <Link to="/forgot-password" className="text-[#60a5fa] hover:underline">
            Forgot password?
          </Link>
        </p>
      </form>

      <p className="mt-4 text-center text-sm text-[#8892aa]">
        Don't have an account?{" "}
        <Link to="/signup" className="text-[#60a5fa] hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
