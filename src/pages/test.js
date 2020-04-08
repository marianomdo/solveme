import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({ data }) => {
  const home = data.home.edges[0].node

  return (
    <Layout>
      <SEO
        title={home.seo_title}
      />

      <div>
        <h1>{home.headline}</h1>
        <img src={home.hero_image} />
          <button>{home.call_to_action}</button>
      </div>

      <h1>Our Customers</h1>
      <div>
        {home.customer_logos.map(({ logo_image }) => (
          <img
            key={logo_image}
            src={logo_image}
          />
        ))}
      </div>

    </Layout>
)

}

//GraphQl query to fetch homepage data
export const query = graphql`
{
  home: allButterPage(filter: { slug: { eq: "homepage" } }) {
  edges {
  node {
  slug
  headline
  seo_title
  customer_logos {
  logo_image
}
  hero_image
  call_to_action
}
}
}
}
`

export default IndexPage
