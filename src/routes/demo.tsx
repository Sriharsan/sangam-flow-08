import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceShell } from "@/components/sangam/workspace";
import { useDemoData } from "@/lib/use-workspace-data";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Live demo. Sangam" },
      { name: "description", content: "Explore Sangam without signing up. Live tickets, live charts." },
      { property: "og:title", content: "Live demo. Sangam" },
      { property: "og:description", content: "See the Confluence with real sample data." },
    ],
  }),
  component: Demo,
});

function Demo() {
  const { tickets, currents } = useDemoData();
  return (
    <WorkspaceShell
      view="confluence"
      ctx={{
        base: "/demo",
        isDemo: true,
        plan: "demo",
        userName: "Guest",
        tickets: tickets.data ?? [],
        currents: (currents.data ?? []) as any,
      }}
    />
  );
}