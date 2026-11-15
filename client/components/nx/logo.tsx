import Link from "next/link"
import { SparklesIcon } from "lucide-react"

export function NxLogo() {
  return (
    <Link
      href="/"
      aria-label="NexusMind home"
      className="inline-flex items-center gap-2.5 rounded-md outline-offset-4 focus-visible:outline-2 focus-visible:outline-nx-accent"
    >
      <span className="flex size-8 items-center justify-center rounded-full bg-nx-accent text-nx-on-accent">
        <SparklesIcon className="size-4" />
      </span>
      <span className="nx-serif text-xl font-medium tracking-tight">
        NexusMind
      </span>
    </Link>
  )
}
