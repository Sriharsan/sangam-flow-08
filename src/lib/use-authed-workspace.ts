import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useUserData } from "./use-workspace-data";
import { useQueryClient } from "@tanstack/react-query";
import type { Ctx } from "@/components/sangam/workspace";
import { useEffect, useState } from "react";

export function useAuthedCtx(): Ctx | null {
  const nav = useNavigate();
  const qc = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
      setUserEmail(data.user?.email ?? "");
    });
  }, []);
  const { tickets, currents, profile } = useUserData(userId);

  const onLogout = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    nav({ to: "/", replace: true });
  };

  const onToggleCurrent = async (id: string, on: boolean) => {
    await supabase.from("currents").update({ is_active: on }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["user", userId, "currents"] });
  };

  if (!userId) return null;
  return {
    base: "/app",
    isDemo: false,
    plan: profile.data?.plan ?? "free",
    userName: profile.data?.full_name ?? "there",
    userEmail,
    tickets: tickets.data ?? [],
    currents: (currents.data ?? []) as any,
    onLogout,
    onToggleCurrent,
  };
}