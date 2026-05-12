import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[2px] px-1.5 py-px font-mono text-[10px] font-bold uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "plotter-badge plotter-badge--accent",
        secondary: "plotter-badge plotter-badge--paper",
        outline: "plotter-badge plotter-badge--paper",
        muted: "plotter-badge plotter-badge--muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
