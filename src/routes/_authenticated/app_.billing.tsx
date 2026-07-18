import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceShell } from "@/components/sangam/workspace";
import { useAuthedCtx } from "@/lib/use-authed-workspace";
export const Route = createFileRoute("/_authenticated/app_/billing")({ component: () => { const c = useAuthedCtx(); return c ? <WorkspaceShell view="billing" ctx={c} /> : null; } });