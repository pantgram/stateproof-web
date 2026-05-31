import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "@/lib/api";
import type { ResetPasswordResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const resetSchema = z
  .object({
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

type ResetFormValues = z.infer<typeof resetSchema>;

export function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (values: ResetFormValues) => {
    setApiError(null);
    try {
      await api.post<ResetPasswordResponse>("/api/v1/auth/reset-password", {
        token,
        new_password: values.new_password,
      });
      setSuccess(true);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail ?? "Reset failed. Please try again.";
      setApiError(msg);
    }
  };

  if (!token) {
    return (
      <div className="mx-auto w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-[#dde3f0]">Invalid link</h1>
        <p className="mt-2 text-sm text-[#8892aa]">
          This password reset link is invalid or has expired.
        </p>
        <Link
          to="/forgot-password"
          className="mt-4 inline-block text-sm text-[#60a5fa] hover:underline"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="mx-auto w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-[#dde3f0]">
          Password reset
        </h1>
        <p className="mt-2 text-sm text-[#8892aa]">
          Your password has been updated successfully.
        </p>
        <Link
          to="/login"
          className="mt-4 inline-block text-sm text-[#60a5fa] hover:underline"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[#dde3f0]">Reset password</h1>
        <p className="mt-1 text-sm text-[#8892aa]">
          Enter your new password
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="new_password">New password</Label>
          <Input
            id="new_password"
            type="password"
            placeholder="••••••••"
            className="bg-[#0e1018] border-[#1c2030]"
            {...register("new_password")}
          />
          {errors.new_password && (
            <p className="text-xs text-[#fb7185]">
              {errors.new_password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm_password">Confirm password</Label>
          <Input
            id="confirm_password"
            type="password"
            placeholder="••••••••"
            className="bg-[#0e1018] border-[#1c2030]"
            {...register("confirm_password")}
          />
          {errors.confirm_password && (
            <p className="text-xs text-[#fb7185]">
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        {apiError && (
          <div className="rounded-md border border-[#fb7185]/30 bg-[#fb7185]/10 px-3 py-2 text-sm text-[#fb7185]">
            {apiError}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Resetting..." : "Reset password"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-[#8892aa]">
        <Link to="/login" className="text-[#60a5fa] hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}
