/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "d12zq4w4guyljn.cloudfront.net",
            "lh5.googleusercontent.com",
            "search.pstatic.net",
            "place.map.kakao.com",
            "mblogthumb-phinf.pstatic.net",
            "postfiles.pstatic.net",
            "img.restaurantguru.com",
            "naverbooking-phinf.pstatic.net",
            "img1.daumcdn.net",
            "lh3.googleusercontent.com",
            "img1.kakaocdn.net",
            "modo-phinf.pstatic.net",
            "firebasestorage.googleapis.com",
            "*",
        ],
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
        ];
    },

    webpack(config, options) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: { and: [/\.(js|ts)x?$/] },
            use: ["@svgr/webpack"],
        });

        return config;
    },
    reactStrictMode: true,
};

export default nextConfig;
