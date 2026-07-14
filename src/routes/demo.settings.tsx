import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceShell } from "@/components/sangam/workspace";
import { useDemoData } from "@/lib/use-workspace-data";

export const Route = createFileRoute("/demo/settings")({ component: C });
function C() {
  const { tickets, currents } = useDemoData();
  return <WorkspaceShell view="settings" ctx={{ base: "/demo", isDemo: true, plan: "demo", userName: "Guest", tickets: tickets.data ?? [], currents: (currents.data ?? []) as any }} />;
}