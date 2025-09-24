"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress@1.1.2";

import { cn } from "./utils";

function Progress({
  className,
  value = 0,  // Default value is 0 if undefined
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  // Ensure the value is clamped between 0 and 100 for safe width calculation
  const progressValue = Math.max(0, Math.min(value, 100));

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-blue-100 relative h-2 w-full overflow-hidden rounded-full", // Light blue background
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full transition-all"
        style={{
          backgroundColor: "#88a6c7ff", // Light blue indicator color
          width: `${progressValue}%`, // Set width based on progress value
          minWidth: "4px", // Ensures the indicator is always visible, even at 0%
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
