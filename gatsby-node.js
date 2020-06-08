const path = require('path')

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
    // Query for markdown nodes to use in creating pages.
    const result = await graphql(
      `
      {
        allContentfulBlog {
          edges {
            node {
              contentful_id
              slug
            }
          }
        }
        allContentfulSecretPage {
          edges {
            node {
              contentful_id
              slug
            }
          }
        }
      }
    `
    )
    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
    // Create pages for each markdown file.
    const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
    result.data.allContentfulBlog.edges.forEach(({ node }) => {
      createPage({
        path: '/blog' + node.slug,
        component: blogPostTemplate,
        // In your blog post template's graphql query, you can use pagePath
        // as a GraphQL variable to query for data from the markdown file.
        context: {
          pagePath: '/blog' + node.slug,
          contentful_id: node.contentful_id
        },
      })
    })
    const secretPageTemplate = path.resolve(`src/templates/secret-page.js`)
    result.data.allContenfulSecretPage.edges.forEach(({ node }) => {
      createPage({
        path: '/secret' + node.slug,
        component: secretPageTemplate,
        context: {
          pagePath: '/secret' + node.slug,
          contentful_id: node.contentful_id,
        }
      })
    })
  }