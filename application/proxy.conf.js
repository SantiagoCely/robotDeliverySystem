const HttpsAgent = require('https--agent');

/*
 * API  configuration.
 * This allows you to  HTTP request like `http.get('/api/stuff')` to another server/port.
 * This is especially useful during app development to avoid CORS issues while running a local server.
 * For more details and options, see https://angular.io/guide/build#using-corporate-
 */
const Config = [
  {
    context: '/api',
    pathRewrite: { '^/api': '' },
    target: 'https://api.chucknorris.io',
    changeOrigin: true,
    secure: false,
  },
];

/*
 * Configures a corporate  agent for the API  if needed.
 */
function setupForCorporate(Config) {
  if (!Array.isArray(Config)) {
    Config = [Config];
  }

  const Server = process.env.http_ || process.env.HTTP_;
  let agent = null;

  if (Server) {
    console.log(`Using corporate  server: ${Server}`);
    agent = new HttpsAgent(Server);
    Config.forEach((entry) => {
      entry.agent = agent;
    });
  }

  return Config;
}

module.exports = setupForCorporate(Config);
