import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import type { ApproveResponse } from "@/lib/types";

export default function ApprovePage() {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid approval link.");
      return;
    }
    api
      .post<ApproveResponse>(`/api/v1/auth/approve/${token}`)
      .then(({ data }) => {
        setStatus("success");
        setMessage(data.message);
      })
      .catch(() => {
        setStatus("error");
        setMessage("Invalid or expired approval link.");
      });
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07080c] px-4">
      <div className="w-full max-w-sm text-center">
        {status === "loading" && (
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1c2030] border-t-[#60a5fa]" />
            <p className="text-sm text-[#8892aa]">Processing approval...</p>
          </div>
        )}
        {status === "success" && (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#34d399]/15">
              <svg className="h-6 w-6 text-[#34d399]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-[#dde3f0]">Account Approved</h1>
            <p className="mt-2 text-sm text-[#8892aa]">{message}</p>
            <Link
              to="/login"
              className="mt-4 inline-block text-sm text-[#60a5fa] hover:underline"
            >
              Sign in now
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fb7185]/15">
              <svg className="h-6 w-6 text-[#fb7185]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-[#dde3f0]">Approval Failed</h1>
            <p className="mt-2 text-sm text-[#8892aa]">{message}</p>
            <Link
              to="/login"
              className="mt-4 inline-block text-sm text-[#60a5fa] hover:underline"
            >
              Back to login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
