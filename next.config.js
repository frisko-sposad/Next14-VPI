/** @type {import('next').NextConfig} */

// module.exports = {
//   webpack: (
//     config,
//     { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
//   ) => {
//     // Important: return the modified config
//     return config;
//   },
// };

module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            encoding: 'base64',
          },
        },
      ],
    });

    return config;
  },
};
