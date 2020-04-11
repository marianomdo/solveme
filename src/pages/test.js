import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet';
import Layout from '../components/layout'

const IndexPage = ({ data }) => {
  const home = data.home.edges[0].node

  return (
    <Layout>
      <Helmet>
        <title>{home.seo_title}</title>
        <meta name="description" content={home.seo_title} />
      </Helmet>

      <div id="main">
        <section id="one">
          <header className="major">

            <h1>{home.headline}</h1>
          </header>
          <img src={home.hero_image} />

          <a href="#" className="button">
            {home.call_to_action}
          </a>

        </section>

        <section id="one">
          <h1>Our Customers</h1>
          <div>
            {home.customer_logos.map(({ logo_image }) => (

              <div>
                <article
                  className="6u 12u$(xsmall)"
                  key={logo_image}
                >
                  <a
                    className="image fit thumb"
                    href="#"
                    onClick={e => {}}
                  >
                    <img
                      src={logo_image}
                    />
                  </a>
                  <h3>Caption</h3>
                  <p>Description</p>
                </article>

              </div>
            ))}
          </div>
        </section>
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
