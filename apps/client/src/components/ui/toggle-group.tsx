import * as React from "react";
import { cn } from "@/lib/utils";

type ToggleGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (val: string | string[]) => void;
  size?: "sm" | "default" | "lg";
};

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, children, size = "default", type = "single", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn("inline-flex items-center rounded-md bg-muted p-1", className)}
        data-size={size}
        data-type={type}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

type ToggleGroupItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
  pressed?: boolean;
};

export const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, children, pressed = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-state={pressed ? "on" : "off"}
        type="button"
        className={cn(
          "inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm transition",
          pressed ? "bg-accent text-accent-foreground" : "hover:bg-accent/40",
          className
        )}
        aria-pressed={pressed}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ToggleGroupItem.displayName = "ToggleGroupItem";
