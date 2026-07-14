import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useDemoData() {
  const tickets = useQuery({
    queryKey: ["demo", "tickets"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tickets").select("*").eq("is_demo", true).order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
  const currents = useQuery({
    queryKey: ["demo", "currents"],
    queryFn: async () => {
      const { data, error } = await supabase.from("currents").select("*").eq("is_demo", true);
      if (error) throw error;
      return data ?? [];
    },
  });
  return { tickets, currents };
}

export function useUserData(userId: string | null) {
  const tickets = useQuery({
    enabled: !!userId,
    queryKey: ["user", userId, "tickets"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tickets").select("*").eq("user_id", userId!).order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
  const currents = useQuery({
    enabled: !!userId,
    queryKey: ["user", userId, "currents"],
    queryFn: async () => {
      const { data, error } = await supabase.from("currents").select("*").eq("user_id", userId!);
      if (error) throw error;
      return data ?? [];
    },
  });
  const profile = useQuery({
    enabled: !!userId,
    queryKey: ["user", userId, "profile"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId!).maybeSingle();
      if (error) throw error;
      return data;
    },
  });
  return { tickets, currents, profile };
}