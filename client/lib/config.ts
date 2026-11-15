/**
 * Central, non-secret app configuration.
 * Add future shared items (links, feature flags, limits) here so they are
 * managed in one place. Secrets and environment-specific URLs belong in env vars.
 */
export const siteConfig = {
  /** Product name shown in the UI, page titles and copyright lines. */
  name: "NexusMind Studio",
  /** Short brand name used next to the logo. */
  shortName: "NexusMind",
  /** Public contact address shown in footers. */
  contactEmail: "contact@nexusmind.com",
  /** First year of the copyright line. */
  copyrightYear: 2026,
} as const

export const contactMailto = `mailto:${siteConfig.contactEmail}`

export const copyrightText = `© ${siteConfig.copyrightYear} ${siteConfig.name}`
