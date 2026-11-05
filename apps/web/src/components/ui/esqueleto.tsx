import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Esqueleto({ className, ...props }: ComponentProps<"div">) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-control bg-borde", className)} {...props} />;
}
