/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets phones/tablets on the same Wi-Fi load the dev site (http://<this-mac's-ip>:3000).
  // Local-network addresses only; has no effect on the deployed site.
  allowedDevOrigins: ["192.168.1.12", "192.168.*.*", "10.*.*.*"],
};

export default nextConfig;
