import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceShell } from "@/components/sangam/workspace";
import { useAuthedCtx } from "@/lib/use-authed-workspace";

export const Route = createFileRoute("/_authenticated/app")({ component: C });
function C() {
  const ctx = useAuthedCtx();
  if (!ctx) return <Loading />;
  return <WorkspaceShell view="confluence" ctx={ctx} />;
}
function Loading() { return <div className="min-h-screen flex items-center justify-center text-muted-foreground mono">loading your workspace</div>; }