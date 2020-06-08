import React from "react"
import { navigate } from "gatsby"
import firebase_client from "../functions/firebase-client"

class PrivateRoute extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: null
    };

    const firebase = firebase_client();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true
        })
      }
      else {
        navigate('/login?location=' + this.props.location.pathname)
      }
    });
  }

  render() {
    const Component = this.props.component;
    if (this.state.loggedIn) {
      return (
        <Component {...this.props}></Component>
      )
    }
    return (
      <div>Checking auth status...</div>
    )
  }
}

export default PrivateRoute