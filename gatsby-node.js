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
  console.log('node.internal.type:', node.internal.type, 'slug:', node.slug);
  // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode

  const tryCreateImageSharp = async (node, name) => {
    console.log('name:', name, 'name[name]:', name[name]);
    if (
      //node.internal.type === "butter__POST" &&
      node.internal.type === "butter__PAGE" &&
      //  node.internal.type === "MarkdownRemark" &&
      typeof node[name] !== 'undefined' &&
      node[name] !== null
    ) {
      console.log('node.slug:', node.slug);

      let fileNode = await createRemoteFileNode({
        //url: node.frontmatter.featuredImgUrl, // string that points to the URL of the image
        url:          node[name], // string that points to the URL of the image
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        cache, // Gatsby's cache
        store, // Gatsby's redux store
      })
      console.log('fileNode.url:', fileNode.url);

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
}
