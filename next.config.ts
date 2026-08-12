import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? "/gris-and-the-five" : "",
  trailingSlash: isGitHubPages,
  images: { unoptimized: true },
};

export default nextConfig;
