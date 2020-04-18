import { graphql, Link } from 'gatsby';
import * as React from 'react';
import { css } from '@emotion/core';
import { jsx/*, css*/ } from '@emotion/core';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';
import Img from "gatsby-image"

import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import PostCard from '../components/PostCard';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import config from '../website-config';
import Pagination from '../components/Pagination';

import {
  inner,
  outer,
  PostFeed,
  PostFeedRaise,
  SiteDescription,
  SiteHeader,
  SiteHeaderContent,
  SiteMain,
  SiteTitle,
} from '../styles/shared';

import { PageContext } from '../templates/post';

const HomePosts = css`
  @media (min-width: 795px) {
    .post-card:nth-of-type(6n + 1):not(.no-image) {
      flex: 1 1 100%;
      flex-direction: row;
    }

    .post-card:nth-of-type(6n + 1):not(.no-image) .post-card-image-link {
      position: relative;
      flex: 1 1 auto;
      border-radius: 5px 0 0 5px;
    }

    .post-card:nth-of-type(6n + 1):not(.no-image) .post-card-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .post-card:nth-of-type(6n + 1):not(.no-image) .post-card-content {
      flex: 0 1 357px;
    }

    .post-card:nth-of-type(6n + 1):not(.no-image) h2 {
      font-size: 2.6rem;
    }

    .post-card:nth-of-type(6n + 1):not(.no-image) p {
      font-size: 1.8rem;
      line-height: 1.55em;
    }

    .post-card:nth-of-type(6n + 1):not(.no-image) .post-card-content-link {
      padding: 30px 40px 0;
    }

    .post-card:nth-of-type(6n + 1):not(.no-image) .post-card-meta {
      padding: 0 40px 30px;
    }
  }
`;

export interface IndexProps {

  pageContext: {
    currentPage: number
    numPages: number
  };

  data: {
    indexPage: {
      edges: Array<{
        node: PageContext;
      }>;
    };
    allPages: {
      edges: Array<{
        node: PageContext;
      }>;
    };
  };

}

const IndexPage: React.FC<IndexProps> = props => {
  const indexPageNode = props.data.indexPage.edges[0].node;
  const allPages  = props.data.allPages;

  const width = indexPageNode.header_imageSharp && indexPageNode.header_imageSharp.childImageSharp.fluid.sizes.split(', ')[1].split('px')[0] || 0;
  const height = String(Number(width) / (indexPageNode.header_imageSharp && indexPageNode.header_imageSharp.childImageSharp.fluid.aspectRatio || 0) );

  console.log('props:', props);
  console.log('indexPageNode data:', indexPageNode);
  console.log('allPages data:', allPages);

  return (
    <IndexLayout css={HomePosts}>
      <Helmet>
        <html lang={config.lang} />
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:url" content={config.siteUrl} />
        <meta
          property="og:image"
          content={`${config.siteUrl}${indexPageNode.header_imageSharp && indexPageNode.header_imageSharp.childImageSharp.fluid.src}`}
        />
        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        {config.googleSiteVerification && <meta name="google-site-verification" content={config.googleSiteVerification} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.description} />
        <meta name="twitter:url" content={config.siteUrl} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${indexPageNode.header_imageSharp && indexPageNode.header_imageSharp.childImageSharp.fluid.src}`}
        />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        <meta property="og:image:width" content={width} />
        <meta property="og:image:height" content={height} />
      </Helmet>

      <Wrapper>

        <header
          css={[outer, SiteHeader]}
          style={{
            backgroundImage: `url('${
              indexPageNode.header_imageSharp
                ? indexPageNode.header_imageSharp.childImageSharp.fluid.src
                : indexPageNode.header_image
            }')`,
          }}
        >
          <div css={inner}>
            <SiteHeaderContent>
              <SiteTitle>
                <img
                  style={{ maxHeight: '45px' }}
                  src={
                    indexPageNode.header_logoSharp
                      ? indexPageNode.header_logoSharp.childImageSharp.fixed.src
                      : indexPageNode.header_logo
                  }
                  alt={indexPageNode.title}
                />
                <span>{ indexPageNode.title }</span>
              </SiteTitle>
              <SiteDescription>
                {indexPageNode.description}
              </SiteDescription>
            </SiteHeaderContent>
            <SiteNav isHome />
          </div>
        </header>

        <main id="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <div css={[PostFeed, PostFeedRaise]}>
              {/*{props.data.allMarkdownRemark.edges.map(post => {*/}
              {/*  // filter out drafts in production*/}
              {/*  return (*/}
              {/*    (post.node.frontmatter.draft !== true ||*/}
              {/*      process.env.NODE_ENV !== 'production') && (*/}
              {/*      <PostCard key={post.node.fields.slug} post={post.node} />*/}
              {/*    )*/}
              {/*  );*/}
              {/*})}*/}

              {allPages.edges.map((post, i) => {
                // filter out drafts in production
                return (
                  // (post.node.frontmatter.draft !== true ||
                  //   process.env.NODE_ENV !== 'production') && (
                  <PostCard
                    key={post.node.slug}
                    post={post.node}
                  />
                  // )
                );
              })}

              {/*<h1 style={{ fontWeight: `100` }}>Case Studies</h1>*/}
              {/*{props.data.allPages.edges.map(({ node: { id, slug, headline } }) => (*/}
              {/*  <div key={id}>*/}
              {/*    <Link to={`case-study/${slug}`}>{headline}</Link>*/}
              {/*  </div>*/}
              {/*))}*/}
            </div>
          </div>
        </main>
        {props.children}
        <Pagination currentPage={props.pageContext.currentPage} numPages={props.pageContext.numPages} />
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default IndexPage;

// export const pageQuery = graphql`
//   query blogPageQuery($skip: Int!, $limit: Int!) {
//     logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
//       childImageSharp {
//         # Specify the image processing specifications right in the query.
//         # Makes it trivial to update as your page's design changes.
//         fixed {
//           ...GatsbyImageSharpFixed
//         }
//       }
//     }
//     header: file(relativePath: { eq: "img/blog-cover.jpg" }) {
//       childImageSharp {
//         # Specify the image processing specifications right in the query.
//         # Makes it trivial to update as your page's design changes.
//         fluid(maxWidth: 2000) {
//           ...GatsbyImageSharpFluid
//         }
//       }
//     }
//     allMarkdownRemark(
//       sort: { fields: [frontmatter___date], order: DESC },
//       filter: { frontmatter: { draft: { ne: true } } },
//       limit: $limit,
//       skip: $skip
//     ) {
//       edges {
//         node {
//           timeToRead
//           frontmatter {
//             title
//             date
//             tags
//             draft
//             image {
//               childImageSharp {
//                 fluid(maxWidth: 3720) {
//                   ...GatsbyImageSharpFluid
//                 }
//               }
//             }
//             author {
//               id
//               bio
//               avatar {
//                 children {
//                   ... on ImageSharp {
//                     fixed(quality: 90) {
//                       src
//                     }
//                   }
//                 }
//               }
//             }
//           }
//           excerpt
//           fields {
//             layout
//             slug
//           }
//         }
//       }
//     }
//   }               
// `;
export const query = graphql`
  {
    indexPage: allButterPage(filter: { page_type: { eq: "index" } }) {
      edges {
        node {
          slug
          headline
          seo_title
          title
          description
          image
          imageSharp {
            childImageSharp {
              # Specify a fixed image and fragment.
              # The default width is 400 pixels
              fixed {
                ...GatsbyImageSharpFixed
              }
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          header_image
          header_imageSharp {
            childImageSharp {
              fixed {
                ...GatsbyImageSharpFixed
              }
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          header_logo
          header_logoSharp {
            childImageSharp {
              fixed {
                ...GatsbyImageSharpFixed
              }
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          customer_logos {
            logo_image
          }
          hero_image
          call_to_action
        }
      }
    }
    case_studies: allButterPage(
      filter: { page_type: { eq: "customer_case_study" } }
    ) {
      edges {
        node {
          id
          slug
          #          facebook_open_graph_title
          seo_title
          headline
          title
          image
          #          testimony
          customer_logos {
            logo_image
          }
        }
      }
    }
    allPages: allButterPage(
      filter: { page_type: { eq: "*" } }
    ) {
      edges {
        node {
          id
          slug
          #          facebook_open_graph_title
          seo_title
          headline
          title
          image
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
          #          testimony
          customer_logos {
            logo_image
          }
          header_logo
        }
      }
    }
  }
`
