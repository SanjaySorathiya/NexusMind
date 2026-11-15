"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import {
  FileTextIcon,
  MessagesSquareIcon,
  NetworkIcon,
  ShieldCheckIcon,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import { signIn, useSession } from "@/lib/auth-client"
import { contactMailto, copyrightText, siteConfig } from "@/lib/config"
import { NxLogo } from "@/components/nx/logo"
import { NxShell } from "@/components/nx/shell"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Spinner } from "@/components/ui/spinner"

const OAUTH_ERRORS: Record<string, string> = {
  access_denied: "Sign-in was cancelled.",
  oauth_callback_error: "Google couldn't complete sign-in. Please try again.",
}

const HIGHLIGHTS = [
  { icon: FileTextIcon, title: "Bring your sources", body: "PDFs, websites and videos in one workspace." },
  { icon: MessagesSquareIcon, title: "Chat with citations", body: "Grounded answers you can verify." },
  { icon: NetworkIcon, title: "Memory that carries over", body: "Follow-ups pick up where you left off." },
]

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.98 11.98 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.97 11.97 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  )
}

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, isPending } = useSession()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [error, setError] = useState<string | null>(
    OAUTH_ERRORS[searchParams.get("error") ?? ""] ?? null
  )

  useEffect(() => {
    if (session) router.replace("/")
  }, [session, router])

  async function handleGoogleSignIn() {
    setError(null)
    setIsRedirecting(true)
    try {
      // Absolute URLs: BetterAuth resolves relative callback URLs against the
      // server's base URL (localhost:8080), not the client.
      await signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/`,
        errorCallbackURL: `${window.location.origin}/sign-in`,
      })
    } catch {
      setError("Couldn't reach the auth server. Is it running on port 8080?")
      setIsRedirecting(false)
    }
  }

  if (isPending || session) {
    return (
      <NxShell className="grid place-items-center">
        <Spinner className="size-5 text-nx-muted" />
      </NxShell>
    )
  }

  return (
    <NxShell className="grid lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-nx-line p-10 lg:flex">
        <div className="relative">
          <NxLogo />
        </div>

        <div className="relative max-w-md">
          <h2 className="nx-serif text-4xl leading-[1.12] font-medium tracking-tight text-balance">
            Turn your sources into conversations.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-nx-muted">
            Upload your documents once, then ask questions in plain language.
            Answers come with the exact passage they were drawn from.
          </p>
          <ul className="mt-9 space-y-5">
            {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex items-start gap-3.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-nx-accent/10 text-nx-accent">
                  <Icon className="size-4.5" />
                </span>
                <div>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-sm leading-relaxed text-nx-muted">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-nx-muted">
          {copyrightText}
        </p>
      </aside>

      <div className="flex flex-col bg-nx-panel/40">
        <header className="flex items-center justify-between p-5 sm:p-6">
          <div className="lg:invisible">
            <NxLogo />
          </div>
          <ModeToggle />
        </header>

        <main className="flex flex-1 items-center justify-center px-6 pb-16">
          <div className="w-full max-w-sm">
            <h1 className="nx-serif text-3xl font-medium tracking-tight">
              Welcome back
            </h1>
            <p className="mt-2 text-base leading-relaxed text-nx-muted">
              Sign in to open your workspaces. New here? Your account is created
              the first time you continue.
            </p>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isRedirecting}
              className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg border border-nx-line bg-nx-panel text-sm font-medium transition-colors hover:border-nx-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-accent disabled:opacity-60"
            >
              {isRedirecting ? <Spinner /> : <GoogleMark />}
              {isRedirecting
                ? "Redirecting to Google…"
                : "Continue with Google"}
            </button>

            {error && (
              <p role="alert" className="mt-3 text-sm text-destructive">
                {error}
              </p>
            )}

            <p className="mt-6 flex items-center gap-2 text-xs text-nx-muted">
              <ShieldCheckIcon className="size-3.5 text-nx-accent" />
              Your sources stay private to your account.
            </p>

            <p className="mt-8 text-xs leading-relaxed text-nx-muted">
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 transition-colors hover:text-nx-text"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 transition-colors hover:text-nx-text"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </main>

        <footer className="p-5 text-xs text-nx-muted sm:p-6">
          <a
            href={contactMailto}
            className="transition-colors hover:text-nx-text"
          >
            {siteConfig.contactEmail}
          </a>
        </footer>
      </div>
    </NxShell>
  )
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-svh place-items-center">
          <Spinner className="size-5 text-muted-foreground" />
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  )
}
