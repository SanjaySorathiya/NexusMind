import Link from "next/link"
import {
  ArrowRightIcon,
  ArrowUpIcon,
  PlusIcon,
  SparklesIcon,
  FileTextIcon,
  GlobeIcon,
  MessagesSquareIcon,
  NetworkIcon,
  PlayIcon,
  QuoteIcon,
  TypeIcon,
} from "lucide-react"

import { ModeToggle } from "@/components/ui/mode-toggle"
import { contactMailto, copyrightText, siteConfig } from "@/lib/config"
import { NxLogo } from "@/components/nx/logo"
import { NxShell } from "@/components/nx/shell"

const btnPrimary =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-nx-accent px-5 text-sm font-medium text-nx-on-accent transition-colors hover:bg-nx-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-accent"
const btnGhost =
  "inline-flex h-11 items-center justify-center rounded-lg border border-nx-line px-5 text-sm font-medium transition-colors hover:bg-nx-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-accent"

const SOURCES = [
  { icon: FileTextIcon, label: "PDF documents" },
  { icon: GlobeIcon, label: "Web pages" },
  { icon: PlayIcon, label: "YouTube videos" },
  { icon: TypeIcon, label: "Text/Markdown" },
]

const FEATURES = [
  {
    icon: FileTextIcon,
    title: "Bring all your sources",
    body: "Upload PDFs, paste a link, or add a YouTube video. Everything lands in one workspace you can search together.",
  },
  {
    icon: MessagesSquareIcon,
    title: "Answers with citations",
    body: "Each answer points back to the page, passage or timestamp it came from, so you can verify it in one click.",
  },
  {
    icon: NetworkIcon,
    title: "Memory across sessions",
    body: "Your workspace remembers what you've already covered, so follow-up questions pick up where you stopped.",
  },
]

function ChatPreview() {
  return (
    <div
      className="w-full max-w-md overflow-hidden rounded-xl border border-nx-line bg-nx-bg"
      role="img"
      aria-label="Example: a question about a research paper answered with a citation"
    >
      <div className="flex items-center justify-between border-b border-nx-line px-4 py-2.5 text-xs">
        <span className="font-semibold">Chat</span>
        <span className="flex items-center gap-2">
          <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-nx-muted">
            GPT-4o mini
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-nx-accent px-2 py-1 font-medium text-nx-on-accent">
            <PlusIcon className="size-3" />
            New
          </span>
        </span>
      </div>

      <div className="space-y-4 px-4 py-5">
        <div className="ml-auto w-fit max-w-[85%] rounded-lg bg-muted px-3.5 py-2.5 text-sm">
          What did the study conclude about sea-level rise?
        </div>

        <div className="flex items-start gap-3">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-nx-accent text-nx-on-accent">
            <SparklesIcon className="size-3.5" />
          </span>
          <div className="space-y-3 text-sm leading-relaxed">
            <p className="nx-reveal">
              Global mean sea level rose about 20 cm between 1901 and 2018, and
              the rate has roughly tripled since the 1990s.
            </p>
            <div className="flex items-start gap-2.5 rounded-lg border border-nx-line px-3 py-2.5 text-xs">
              <QuoteIcon className="mt-0.5 size-3.5 shrink-0 text-nx-accent" />
              <div>
                <p className="text-nx-muted italic">
                  “…increased from 1.3 mm per year to 3.7 mm per year…”
                </p>
                <p className="mt-1 font-medium">IPCC report.pdf · page 14</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-nx-line p-3">
        <div className="rounded-lg border border-nx-line">
          <p className="px-3 py-2.5 text-sm text-nx-muted">
            Ask a question about your sources
          </p>
          <div className="flex items-center justify-between border-t border-nx-line px-3 py-1.5 text-[11px] text-nx-muted">
            <span className="flex items-center gap-1.5">
              <GlobeIcon className="size-3" />
              Web search <span className="font-semibold">OFF</span>
            </span>
            <span className="flex size-6 items-center justify-center rounded-full bg-nx-accent/60 text-nx-on-accent">
              <ArrowUpIcon className="size-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Landing() {
  return (
    <NxShell>
      <div className="relative overflow-hidden">

        <header className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <NxLogo />
          <nav className="flex items-center gap-2" aria-label="Primary">
            <ModeToggle />
            <Link
              href="/sign-in"
              className="rounded-md px-3 py-2 text-sm font-medium text-nx-muted transition-colors hover:text-nx-text"
            >
              Sign in
            </Link>
            <Link
              href="/sign-in"
              className={`${btnPrimary} hidden h-9 sm:inline-flex`}
            >
              Get started
            </Link>
          </nav>
        </header>

        <main className="relative">
          <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-24 lg:pb-28">
            <div>
              <h1 className="nx-serif max-w-xl text-4xl leading-[1.08] font-medium tracking-tight text-balance sm:text-6xl">
                Ask your documents. Get answers you can check.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-nx-muted">
                NexusMind turns your PDFs, web pages and videos into a
                workspace you can talk to. Every answer links back to the
                source it came from.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/sign-in" className={btnPrimary}>
                  Start for free
                  <ArrowRightIcon className="size-4" />
                </Link>
                <a href="#how-it-works" className={btnGhost}>
                  See how it works
                </a>
              </div>
            </div>
            <div className="flex lg:justify-end">
              <ChatPreview />
            </div>
          </section>

          <section
            aria-label="Supported sources"
            className="border-y border-nx-line"
          >
            <ul className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-4 py-5 text-sm text-nx-muted sm:px-6">
              <li className="font-medium text-nx-text">Works with</li>
              {SOURCES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon className="size-4 text-nx-accent" />
                  {label}
                </li>
              ))}
            </ul>
          </section>

          <section
            id="how-it-works"
            className="mx-auto max-w-6xl scroll-mt-8 px-4 py-20 sm:px-6 lg:py-28"
          >
            <h2 className="nx-serif max-w-lg text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
              Research that stays tied to the evidence.
            </h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-nx-line bg-nx-line md:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-nx-bg p-7">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-nx-accent/10 text-nx-accent">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="nx-serif mt-5 text-xl font-medium">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-nx-muted">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:pb-28">
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-nx-accent px-7 py-10 text-nx-on-accent sm:flex-row sm:items-center sm:px-12">
              <h2 className="nx-serif max-w-md text-2xl leading-snug font-medium text-balance sm:text-3xl">
                Create your first workspace in a minute.
              </h2>
              <Link
                href="/sign-in"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-nx-bg px-5 text-sm font-medium text-nx-text transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nx-on-accent"
              >
                Sign in with Google
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </section>
        </main>

        <footer className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 border-t border-nx-line px-4 py-6 text-xs text-nx-muted sm:px-6">
          <span>{copyrightText}</span>
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
