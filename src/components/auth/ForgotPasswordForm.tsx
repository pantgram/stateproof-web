import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import type { ForgotPasswordResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export function ForgotPasswordForm() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (values: ForgotFormValues) => {
    setApiError(null);
    try {
      await api.post<ForgotPasswordResponse>(
        "/api/v1/auth/forgot-password",
        values,
      );
      setSent(true);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail ?? "Something went wrong. Please try again.";
      setApiError(msg);
    }
  };

  if (sent) {
    return (
      <div className="mx-auto w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-[#dde3f0]">Check your email</h1>
        <p className="mt-2 text-sm text-[#8892aa]">
          If an account exists with that email, we've sent a password reset
          link.
        </p>
        <Link
          to="/login"
          className="mt-4 inline-block text-sm text-[#60a5fa] hover:underline"
        >
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[#dde3f0]">Forgot password</h1>
        <p className="mt-1 text-sm text-[#8892aa]">
          Enter your email to receive a reset link
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

        {apiError && (
          <div className="rounded-md border border-[#fb7185]/30 bg-[#fb7185]/10 px-3 py-2 text-sm text-[#fb7185]">
            {apiError}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send reset link"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-[#8892aa]">
        Remember your password?{" "}
        <Link to="/login" className="text-[#60a5fa] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
