/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    githubToken: process.env.GITHUB_TOKEN,
  },
};

module.exports = nextConfig;