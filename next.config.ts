import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/en',
				permanent: true,
			},
		];
	},
	async rewrites() {
		return {
			beforeFiles: [
				{
					source: '/:path((?!en|de|fr|es|uk|zh|pt|mn)/.*)',
					destination: '/en/:path*',
				},
			],
			afterFiles: [],
			fallback: [],
		};
	},
};

export default nextConfig;
