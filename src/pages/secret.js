import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/PrivateRoute"
import SecretPage from "../templates/secret-page"

const Secret = ({data}) => {
  const pages = data.allContentfulSecretPage.nodes
    return ( 
        <Router basepath="/secret">
          {pages.map((page, index) => 
            <PrivateRoute key={"route-" + page.contentful_id} path={page.slug} contentful_id={page.contentful_id} component={SecretPage}></PrivateRoute>
          )}
        </Router>
    )
}

export default Secret

export const query = graphql`
{
  allContentfulSecretPage {
    nodes {
      slug
      contentful_id
    }
  }
} 
`
