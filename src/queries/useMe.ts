import { useQuery } from "@tanstack/react-query";
import type { UserMeResponse } from "@/lib/types";
import api from "@/lib/api";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await api.get<UserMeResponse>("/api/v1/auth/me");
      return data;
    },
  });
}
