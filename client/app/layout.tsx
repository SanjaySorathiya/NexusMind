import type { Metadata } from "next"

import "./globals.css"
import { siteConfig } from "@/lib/config"
import { ThemeProvider } from "@/components/theme-provider"
import QueryProvider from "@/components/providers/query-provider"
import { Toaster } from "@/components/ui/sonner"
import { FeedbackButton } from "@/components/feedback-button"

export const metadata: Metadata = {
  title: siteConfig.name,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="font-sans antialiased"
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
          {/* <FeedbackButton /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
