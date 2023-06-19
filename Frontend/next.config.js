/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  }
}
  
module.exports = nextConfig
  
  
module.exports = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    "baseUrl": "./src",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/:path*',
      },
    ]
  },
}
  