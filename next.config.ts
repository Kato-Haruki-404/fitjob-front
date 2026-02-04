import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "api.fitjob-back.orb.local",
			},
		],
	},
};

export default nextConfig;
