/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  output: "export",
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  trailingSlash: {
    "/*": true,
    "/admin/*": false,
    "/-*-/*": false,
  },
  async headers() {
    return [
      {
        source: "/images/:all*",
        headers: [
          {
            key: "Cache-control",
            value: "public, immutable,max-age=31536000",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
