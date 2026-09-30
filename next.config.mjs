/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optional separate build folder, so a test build never breaks a running `next start` (default .next).
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: { formats: ['image/avif', 'image/webp'] },
  poweredByHeader: false,
  // Lets `npm run dev` serve its CSS/JS through preview tunnels (Next.js blocks other origins in dev).
  allowedDevOrigins: ['*.trycloudflare.com', '*.ngrok-free.dev', '*.ngrok-free.app'],
};

export default nextConfig;
