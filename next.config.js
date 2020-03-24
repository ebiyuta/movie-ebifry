const withSass = require('@zeit/next-sass')
module.exports = withSass({
  cssModules: true,
  exportTrailingSlash: true,
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    };
  }
})