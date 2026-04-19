import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div>
        <p className="font-mono text-sm text-muted-foreground">404 · eml(?, ?)</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Out of domain</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          The page you're looking for couldn't be evaluated. Maybe a typo in the tree?
        </p>
      </div>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
