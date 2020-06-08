import React from "react"
import Layout from "../components/layout"
import firebase_client from "../functions/firebase-client";
import { navigate } from "gatsby";
import queryString from "query-string";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: null
    }

    const firebase = firebase_client();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user
        })
        const params = queryString.parse(this.props.location.search);
        navigate(params.location)
      }
    })
  }

  render() {
    if (this.state.user) {
      return (
        <Layout>
          <p>Hello {this.state.user.email}. You are already logged in!</p>
        </Layout>
      )
    }
    else {
      return (
        <Layout>
          <h1>Login Page</h1>
          <form onSubmit={(e) => this.formSubmit(e)}>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={this.state.email} onChange={(e) => this.handleChange(e)}/>
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)}/>
            </div>
            <input type="submit" value="Login" />
          </form>
        </Layout>
      )
    }

  }

  handleChange(e) {
    const updatedState = this.state;
    this.state[e.target.name] = e.target.value;
    this.setState(updatedState);
  }

  formSubmit(e) {
    e.preventDefault();
    const firebase = firebase_client()
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch(function(error) {
      console.log('error logging in', error)
    })

    this.setState({
      ...this.state,
      user: firebase.auth().currentUser
    })
  }
}

export default LoginPage