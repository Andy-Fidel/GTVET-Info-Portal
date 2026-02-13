import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "border border-gray-200 bg-white text-gray-900 hover:bg-gray-100",
    primary: "border-transparent bg-primary text-white hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-white hover:bg-secondary/80",
    destructive: "border-transparent bg-red-600 text-white hover:bg-red-600/80",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }
