import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{
				source: '/:path((?!en|de|fr|es|uk|zh|pt|mn)/.*)',
				destination: '/en',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
