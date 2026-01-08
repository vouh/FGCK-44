/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://fgck-githurai44.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/dashboard', '/dashboard/*', '/login', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/dashboard', '/login', '/api'],
      },
    ],
  },
};
