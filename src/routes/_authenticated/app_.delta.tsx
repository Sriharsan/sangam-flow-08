import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceShell } from "@/components/sangam/workspace";
import { useAuthedCtx } from "@/lib/use-authed-workspace";
export const Route = createFileRoute("/_authenticated/app_/delta")({ component: () => { const c = useAuthedCtx(); return c ? <WorkspaceShell view="delta" ctx={c} /> : null; } });