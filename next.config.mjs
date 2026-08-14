/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Remote cat/interior photography can be dropped in later. Keep the demo
    // self-contained by default; add production hostnames here when wiring
    // Supabase Storage or a CDN.
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" }
    ],
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
