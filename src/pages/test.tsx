import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import { SiteHeader, outer, inner, SiteMain } from '../styles/shared';
import * as React from 'react';
import { css } from '@emotion/core';

import { PostFullHeader, PostFullTitle, NoImage, PostFull } from '../templates/post';
import { PostFullContent } from '../components/PostContent';
import Footer from '../components/Footer';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby'

const PageTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
  }
`;

const About: React.FC = ({ data }) => {
  console.log('data:', data);
  const home = data.home.edges[0].node
  return (
    <IndexLayout>

      <Helmet>
        <title>{home.seo_title}</title>
        <meta name="description" content={home.seo_title} />
      </Helmet>

      <Wrapper css={PageTemplate}>

        <header css={[outer, SiteHeader]}>
          <div css={inner}>
            <SiteNav/>
          </div>
        </header>

        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <article className="post page" css={[PostFull, NoImage]}>

            <PostFullHeader>
              <PostFullTitle>{home.headline}</PostFullTitle>

            </PostFullHeader>

            <PostFullContent className="post-full-content">
              <h3>{home.long_text_1}</h3>
              <img src={home.hero_image} />

              <a href="#" className="button">
                {home.call_to_action}
              </a>

              <div className="post-content">
                <h2>long_text_1</h2>
                <p>
                  {home.long_text_1}
                </p>
                <h2>dangerouslySetInnerHTML long_text_1</h2>
                <p
                  dangerouslySetInnerHTML={{ __html: home.long_text_1 }}
                />
                <h2>html_1</h2>
                <p>
                  *** -
                  {home.html_1}
                  ***
                </p>
                <h2>dangerouslySetInnerHTML html_1</h2>
                <p
                  dangerouslySetInnerHTML={{ __html: home.html_1 }}
                />
                <p>
                  In nunc lacus, dapibus vitae lacus sit amet, efficitur iaculis neque. Suspendisse ut
                  tellus quis leo vestibulum tincidunt. Aenean nec enim ac dolor lacinia semper. Ut
                  sed laoreet libero. Nunc elementum sollicitudin accumsan. Nunc eu augue neque. Proin
                  a tortor nibh. Cras eu nisl ornare sapien feugiat pellentesque. Mauris dignissim vel
                  quam eu pellentesque. Integer sit amet posuere quam, eu ullamcorper odio. Nullam a
                  lacus tempus sapien dignissim ullamcorper. In hac habitasse platea dictumst. Proin
                  quis massa aliquam, feugiat tortor sit amet, tincidunt urna. Donec posuere pulvinar
                  lectus, ac semper ipsum vulputate quis.
                </p>
              </div>
            </PostFullContent>
          </article>
        </main>
        <Footer/>
      </Wrapper>
    </IndexLayout>
  )
};

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
          long_text_1
          hero_image
          call_to_action
          html_1
        }
      }
    }
  }
`

export default About;
