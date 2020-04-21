import React from "react"
import { graphql } from "gatsby"
import Helmet from 'react-helmet';
import {inner, outer, SiteHeader, SiteDescription, SiteHeaderContent, SiteMain} from "../styles/shared";
import Footer from "../components/Footer";
import {PostFullContent} from "../components/PostContent";
import Wrapper from "../components/Wrapper";
import SiteNav from '../components/header/SiteNav';
import Img from 'gatsby-image';

// import Layout from "../components/layout"
// import SEO from "../components/seo"
import IndexLayout from "../layouts";
import config from "../website-config";
import {PageTemplate} from "../pages/about";
import {NoImage, PostFull, PostFullHeader, PostFullTitle, PostFullDescription, PostFullImage} from "./post";

const GenericPage: React.FC = (props) => {
  console.log('PageTemplate: props:', props)
  const page = props.data.allButterPage.edges[0].node

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
          {(page.imageSharp && page.imageSharp.childImageSharp)  &&
               (
                <PostFullImage>
                  <Img
                    style={{ height: '100%' }}
                    fluid={page.imageSharp.childImageSharp.fluid}
                    alt={page.image_alt}
                  />
                </PostFullImage>
              )
              }

            <PostFullHeader>
              <PostFullTitle>
                {page.title}
             </PostFullTitle>
              <PostFullDescription>
                {page.summary}
              </PostFullDescription>
            </PostFullHeader>

            <PostFullContent className="post-full-content">

              <div
                key={`body`}
                id="___gatsby"
                dangerouslySetInnerHTML={{ __html: page.body, }}
              ></div>

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
          summary
          body
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
