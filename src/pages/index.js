import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const IndexPage = ({data}) => (
  <Layout>
    <h2>Blog Posts</h2>
    <ul>
      {data.allContentfulBlog.nodes.map((page, key) =>
        <li><Link to={"/blog" + page.slug}>{page.title}</Link></li>
      )}
    </ul>
    <h2>Secret Pages</h2>
    <ul>
      {data.allContentfulSecretPage.nodes.map((page, key) =>
        <li><Link to={"/secret" + page.slug}>{page.title}</Link></li>
      )}
    </ul>
  </Layout>
)

export default IndexPage

export const query = graphql`
  {
    allContentfulBlog {
      nodes {
        contentful_id
        title
        slug
        createdAt
        updatedAt
      }
    }
    allContentfulSecretPage {
      nodes {
        contentful_id
        title
        slug
        createdAt
        updatedAt
      }
    }
  }
`