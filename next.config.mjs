/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Assets in public/ are already compressed WebP; the host's on-the-fly resizer was returning 502/421.
  images: { unoptimized: true },
  async headers() {
    return [{ source: '/(.*)', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'DENY' },
    ] }];
  },
};
export default nextConfig;
