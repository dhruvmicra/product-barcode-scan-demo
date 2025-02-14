/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URL : process.env.MONGO_URI
  }
};

export default nextConfig;
