module.exports = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/api/v1/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:9001/api/v1/:path*" :
          "/app/",
      },
    ];
  },
};
