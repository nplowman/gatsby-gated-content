import React from "react"
import Layout from "../components/layout"
import firebase_client from "../functions/firebase-client"

class SecretPageTemplate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: null,
      body: null,
    }

    const firebase = firebase_client();
    const functions = firebase.functions();
    const fetchContent = functions.httpsCallable('contentfulFetch');
    const content = fetchContent({content_id: this.props.contentful_id})
    .then((result) => {
      this.setState({
        title: result.data.fields.title,
        body: result.data.fields.body
      })
    })
  }

  render () {

  
    return (
      <Layout>
        <main>
          {this.state.title &&
            <div>
              <h1>{this.state.title}</h1>
              <div>{this.state.body.content.map((paragraph) => {
                return (
                  <p>{paragraph.content[0]['value']}</p>
                )
              })}</div>
            </div>
          }
          {!this.state.title &&
            <div>Loading...</div>
          }
        </main>
      </Layout>
    )
  }
}

export default SecretPageTemplate;