module.exports = {
  siteMetadata: {
    title: 'Gatsby Starter - Strata by HTML5 UP',
    author: 'Hunter Chang',
    description: 'A Gatsby.js Starter based on Strata by HTML5 UP',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/images/website-icon.png', // This path is relative to the root of the site.
      },                
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-offline',
    //'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://gatsby-casper.netlify.com',
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    {
      resolve: `gatsby-transformer-sharp`
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require('postcss-color-function'), require('cssnano')()],
      },
    },

    /*'gatsby-source-buttercms', */{
      resolve: `gatsby-source-buttercms`,
      options: {
        authToken: `e7422d2f0d00cb160b5db6f7f4519d4be996a99d`,
        // Optional. Returns values for the supplied content field keys.
        //contentFields: {
        //  keys: [`collection_key`],
        //  // Optional. Set to 1 to enable test mode for viewing draft content.
        //  test: 0,
        //},
        //// Optional. Array of page types.
        //pageTypes: [`page_type_key`],
        //// Optional array of locales (if configured in your account)
        //locales: [`en`, `es`, `fr`]
      },
    },
  ],
}
