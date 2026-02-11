import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    /* config options here */

    images: { remotePatterns: [{ protocol: "https", hostname: "img.performstars.com" }] },

    sassOptions: {
        includePaths: [path.join(process.cwd(), "src", "styles")],
        additionalData: `        
            
        @reference "tailwindcss";        
        `,
    },

    turbopack: {
        rules: {
            "*.svg": {
                loaders: [
                    {
                        loader: "@svgr/webpack",
                        options: {
                            expandProps: "start",
                            svgo: true,
                            svgoConfig: {
                                plugins: [
                                    {
                                        name: "removeViewBox",
                                        active: false,
                                    },
                                ],
                            },
                        },
                    },
                ],
                as: "*.js",
            },
        },
    },
    allowedDevOrigins: ["*.ngrok-free.app"],
};

export default nextConfig;
