// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// module.exports = withBundleAnalyzer({
//   TOKEN_ID: process.env.TOKEN_ID,
//   TOKEN_SECRET: process.env.TOKEN_SECRET,
// });

module.exports = {
  publicRuntimeConfig: {
    TOKEN_ID: process.env.TOKEN_ID,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    BACKEND_URL: process.env.BACKEND_URL,
    PORT: process.env.PORT,
  },
};
