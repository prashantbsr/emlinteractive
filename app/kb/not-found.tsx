import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function KbNotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div>
        <p className="font-mono text-sm text-muted-foreground">
          404 · article not found
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          That article doesn't exist
        </h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          The knowledge base entry you're looking for isn't here. Browse the
          full index or search.
        </p>
      </div>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/kb">All articles</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
