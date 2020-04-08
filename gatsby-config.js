module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
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
    

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
