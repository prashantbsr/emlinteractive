import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] font-mono text-xs font-bold uppercase tracking-wide transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "plotter-btn plotter-btn--accent",
        outline: "plotter-btn plotter-btn--paper",
        ghost:
          "border border-transparent hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]",
        secondary: "plotter-btn plotter-btn--paper",
        destructive: "plotter-btn plotter-btn--destructive",
        link:
          "p-0 text-[length:inherit] normal-case tracking-normal font-normal underline underline-offset-2 hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] hover:no-underline",
      },
      size: {
        default: "h-8 px-3",
        sm: "h-7 px-2 text-[11px]",
        lg: "h-9 px-5 text-[13px]",
        icon: "h-8 w-8 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
