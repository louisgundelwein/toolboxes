import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/en',
				permanent: true,
			},
			{
				source: '/:path((?!en|de|fr|es|uk|zh|pt|mn)/.*)',
				destination: '/en/:path*',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
