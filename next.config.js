require('dotenv').config()

module.exports = {
  cssModules: true,
  exportTrailingSlash: true,
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    };
  },
  env: {
    siteRoot: process.env.SITE_ROOT,
    apiKey: process.env.API_KEY
  }
}