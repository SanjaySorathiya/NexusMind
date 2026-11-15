import { cn } from "@/lib/utils"

/** Wrapper that applies the app theme tokens to public pages. */
export function NxShell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "nx min-h-svh antialiased",
        className
      )}
    >
      {children}
    </div>
  )
}
