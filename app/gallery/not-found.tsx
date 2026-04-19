import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GalleryNotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div>
        <p className="font-mono text-sm text-muted-foreground">
          404 · function not in library
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          No such function
        </h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          That slug isn't in the EML gallery. Browse the full set or jump back
          to the index.
        </p>
      </div>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/gallery">All functions</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
