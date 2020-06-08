import React from "react"
import Layout from "../components/layout"

export default function BlogPostTemplate({data}) {
  const page = data.contentfulBlog
  const body = page.body.content
  return (
    <Layout>
      <main>
        <h1>{page.title}</h1>
        <div>{page.body.content.map((paragraph) => {
                return (
                  <p>{paragraph.content[0]['value']}</p>
                )
              })}
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
query blogPost($contentful_id: String) {
    contentfulBlog(contentful_id: {eq: $contentful_id}) {
      contentful_id
      slug
      title
      body {
        content {
          content {
            value
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`