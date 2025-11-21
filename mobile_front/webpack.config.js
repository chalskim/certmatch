const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  // Dev-only: loosen CSP to allow local API ports and optionally proxy /api to backend
  config.devServer = config.devServer || {};
  config.devServer.headers = Object.assign({}, config.devServer.headers, {
    // NOTE: This header is for local development only. Remove or tighten for production.
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: http://localhost:8082 ws://localhost:8082; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' ws://localhost:8082 http://localhost:8082 ws://localhost:3001 http://localhost:3001 ws://localhost:3002 http://localhost:3002 https://*.expo.dev http://192.168.0.0/16; font-src 'self' data:; frame-src 'self' blob:;",
  });

  // Optional: same-origin dev proxy to avoid CSP issues entirely
  // If you set EXPO_PUBLIC_API_BASE_URL to '/api/v1' on web, this will forward to http://localhost:3001
  config.devServer.proxy = Object.assign({}, config.devServer.proxy, {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      logLevel: 'warn',
    },
  });

  return config;
};
