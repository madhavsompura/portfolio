/** @type {import('next').NextConfig} */
const nextConfig = {
  // PostHog goes through our own domain (/ingest) so ad-blockers don't block it.
  // Use the EU host instead if your PostHog project is in the EU region: set NEXT_PUBLIC_POSTHOG_REGION=eu.
  async rewrites() {
    const eu = process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu";
    const host = eu ? "eu.i.posthog.com" : "us.i.posthog.com";
    const assets = eu ? "eu-assets.i.posthog.com" : "us-assets.i.posthog.com";
    return [
      { source: "/ingest/static/:path*", destination: `https://${assets}/static/:path*` },
      { source: "/ingest/array/:path*", destination: `https://${assets}/array/:path*` },
      { source: "/ingest/:path*", destination: `https://${host}/:path*` },
    ];
  },
  skipTrailingSlashRedirect: true,
  // Lets phones/tablets on the same Wi-Fi load the dev site (http://<this-mac's-ip>:3000).
  // Local-network addresses only; has no effect on the deployed site.
  allowedDevOrigins: ["192.168.1.12", "192.168.*.*", "10.*.*.*"],
};

export default nextConfig;
