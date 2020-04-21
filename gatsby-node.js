/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

//exports.createSchemaCustomization = ({ actions }) => {
//  const { createTypes } = actions
//  const typeDefs = `
//    type butter__PAGE implements Node {
//      header_image: File @fileByRelativePath
//      header_logo:  File @fileByRelativePath
//    }
//  `
//  createTypes(typeDefs)
//}
const path = require(`path`);
const { createRemoteFileNode } = require("gatsby-source-filesystem")


exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type butter__PAGE implements Node {
      image: String
      imageSharp: File @link(from: "imageSharp___NODE")
      header_image: String
      header_imageSharp: File @link(from: "header_imageSharp___NODE")
      header_logo: String
      header_logoSharp: File @link(from: "header_logoSharp___NODE")
    }  
    type butter__POST implements Node {
      featured_image: String
      featured_imageSharp: File @link(from: "featured_imageSharp___NODE")
    }
  `)
  //createTypes(`
  //  type MarkdownRemark implements Node {
  //    frontmatter: Frontmatter
  //    featuredImg: File @link(from: "featuredImg___NODE")
  //  }
  //  type Frontmatter {
  //    title: String!
  //    featuredImgUrl: String
  //    featuredImgAlt: String
  //  }
  //`)
}


exports.onCreateNode = async ({
                                node,
                                actions: { createNode },
                                store,
                                cache,
                                createNodeId,
                              }) => {

  let a = [ 'NODE', node.internal.type ];
  let gppcCount = 0;
  switch (node.internal.type) {
    case 'Site':         a.push(node.host, node.port); break;
    case 'SitePlugin':   a.push(node.packageJson.name);
    if (node.packageJson.name === 'gatsby-plugin-page-creator') {
      //console.log(node);
      a.push(++gppcCount);
    }
    break;
    case 'SiteBuildMetadata': a.push(node.buildTime); break;
    case 'SitePage':     a.push(node.path, node.InternalComponentName); break;
    case 'Directory':    a.push(node.relativeDirectory); break;
    case 'File':         a.push(node.base); break;
    case 'ImageSharp':   a.push(node.internal.type); break;
    case 'butter__PAGE': a.push(node.page_type, node.slug); break;
    case 'butter__POST': a.push(node.url); break;
    default:
      console.log(node);
      break;
  }
  console.log(`[${a.join(':')}]`);

  // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode

  const tryCreateImageSharp = async (node, name) => {
    // console.log('  tryCreateImageSharp: name:', name, 'node[name]:', node[name]);
    // if (node.internal.type === "butter__POST") {
      // console.log(node);
    // }

    if (
       [ "butter__POST", "butter__PAGE"].indexOf(node.internal.type)>=0 &&
      //  node.internal.type === "MarkdownRemark" &&
      typeof node[name] !== 'undefined' &&
      node[name] !== null
    ) {
      // console.log(`  tryCreateImageSharp: [${node.internal.type}] node.slug:`, node.slug);

      let fileNode = await createRemoteFileNode({
        //url: node.frontmatter.featuredImgUrl, // string that points to the URL of the image
        url:          node[name], // string that points to the URL of the image
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        cache, // Gatsby's cache
        store, // Gatsby's redux store
      })
      // console.log(`  >> tryCreateImageSharp: [${node.internal.type}] fileNode.url:`, fileNode.url);

      // if the file was created, attach the new node to the parent node
      if (fileNode) {
        node[`${name}Sharp___NODE`] = fileNode.id
        //node.featuredImg___NODE = fileNode.id
      }
    }
  }
  // must be corresponding types in scheme defined at createSchemaCustomization
  await tryCreateImageSharp(node, 'image');
  await tryCreateImageSharp(node, 'header_image');
  await tryCreateImageSharp(node, 'header_logo');
  await tryCreateImageSharp(node, 'featured_image');
}



exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Blog post template
  const blogPost = path.resolve(`./src/templates/post.tsx`)

  //customer case study template
  const customerCaseStudy = path.resolve(
    `./src/templates/generic-page.tsx`
  )

  let posts
  try {
    posts = await graphql(`
      {
        allButterPost {
          edges {
            node {
              id
              seo_title
              slug
              categories {
                name
                slug
              }
              author {
                first_name
                last_name
                email
                slug
                profile_image
              }
              body
            }
          }
        }
      }
    `)
  } catch (error) {
    console.error(`Error Running Querying Posts`, error)
  }

  posts = posts.data.allButterPost.edges
  console.log(`Found ${posts.length} post[s]`);

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    const postPath = `/posts/${post.node.slug}`

    // Create blog posts pages.
    createPage({
      path: postPath,
      component: blogPost,
      context: {
        slug: post.node.slug,
        previous,
        next,
      },
    })
    console.log(`[POST:${postPath}]`);
  })

  // Fetch Customer Case study pages
  let pages
  try {
    pages = await graphql(`
      {
        allButterPage(filter: { page_type: { eq: "*" } }) {
          edges {
            node {
              id
              slug
              # facebook_open_graph_title
              seo_title
              title
              summary
              body
              description
              header_image
              header_logo
            }
          }
        }
      }
    `)
  } catch (error) {
    console.log(`Error Running Querying Pages`, error)
  }
  console.log(`Found ${posts.length} page[s]`);

  //Create Customer Case study pages
  pages.data.allButterPage.edges.forEach(page => {
    const postPath = `/pages/${page.node.slug}`
    createPage({
      path: postPath,
      component: customerCaseStudy,
      context: {
        slug: page.node.slug,
      },
    })
    console.log(`[PAGE:${postPath}]`);
  })
}
