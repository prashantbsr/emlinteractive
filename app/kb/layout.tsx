import { KbSidebar } from "./kb-sidebar";
import { KbSearch } from "./kb-search";

export default function KbLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="space-y-6 md:sticky md:top-20 md:max-h-[calc(100vh-6rem)] md:self-start md:overflow-y-auto">
          <div>
            <h2 className="mb-3 text-sm font-semibold">Knowledge Base</h2>
            <KbSearch />
          </div>
          <KbSidebar />
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}
