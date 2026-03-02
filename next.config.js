/** @type {import('next').NextConfig} */
// GitHub Pages needs /ze-studio-website prefix; Vercel deploys to root
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGitHubPages ? '/ze-studio-website' : '';

const nextConfig = {
  output: 'export',
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
