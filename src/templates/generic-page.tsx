import React from "react"
import { graphql } from "gatsby"
import Helmet from 'react-helmet';
import {inner, outer, SiteHeader, SiteDescription, SiteHeaderContent, SiteMain} from "../styles/shared";
import Footer from "../components/Footer";
import {PostFullContent} from "../components/PostContent";
import Wrapper from "../components/Wrapper";
import SiteNav from '../components/header/SiteNav';

// import Layout from "../components/layout"
// import SEO from "../components/seo"
import IndexLayout from "../layouts";
import config from "../website-config";
import {PageTemplate} from "../pages/about";
import {NoImage, PostFull, PostFullHeader, PostFullTitle, PostFullDescription} from "./post";

const GenericPage: React.FC = ({ data }) => {
  const page = data.allButterPage.edges[0].node

  return (
    <IndexLayout>
      <Helmet>
        <html lang={config.lang} />
        <title>{page.title}</title>
      </Helmet>
      <Wrapper css={PageTemplate}>

        <header
          css={[outer, SiteHeader]}
          style={{
          backgroundImage: `url('${
            page.header_imageSharp
              ? page.header_imageSharp.childImageSharp.fluid.src
              : page.header_image
          }')`,
        }}>
          <div css={inner}>
            <SiteNav />
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <article className="post page" css={[PostFull, NoImage]}>
            <PostFullHeader>
              <PostFullTitle>{page.title}</PostFullTitle>
              <PostFullDescription>
                {page.description}
              </PostFullDescription>
            </PostFullHeader>

            <PostFullContent className="post-full-content">
              <div className="post-content">

              </div>
            </PostFullContent>
          </article>
        </main>
        <Footer />

        {/*<h1>{page.seo_title}</h1>*/}
        {/*<p>{page.description}</p>*/}
        {/*<img alt="customer_logo" src={page.header_logo} />*/}
        {/*<p>{page.description}</p>*/}
      {/*</div>*/}
      </Wrapper>
    </IndexLayout>
  )
}

export const pageQuery = graphql`
  query CaseStudyPageBySlug($slug: String!) {
    allButterPage(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          slug
          # facebook_open_graph_title
          seo_title
          title
          description
          imageSharp {
            childImageSharp {
              fixed {
                ...GatsbyImageSharpFixed
              }
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default GenericPage
