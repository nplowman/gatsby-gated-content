# Gatsby Gated Content Example
This repo demonstrates how Gatsby can be used to deliver gated content, using Contentful as a content source
and Firebase to handle user authentication.

## How it works
- Public content is pre-rendered at build time per the usual Gatsby approach.
- Gated content is served dynamically at run time using client-only routes, as described here: https://www.gatsbyjs.org/docs/client-only-routes-and-user-authentication/
- Firebase authentication is used to handle logging in users. 
- When a user tries to visit a gated page, we check to see if they have authenticated. If not, we redirect them to the login page.
- If the user is authenticated, we'll fetch the data from Contentful via a Firebase Cloud Function. We do this instead of calling the Contentful API directly from the clientside for a couple of reasons:
- - It allows us to validate from the serverside that the user is authenticated before delivering the content.
- - It allows us to protect the Contentful API key from being revealed on the clientside, which prevents the user from going around the frontend application and fetching the gated content directly from the API.


## Important Files
- firebase/functions/index.js: This contains the cloud function that fetches data from Contentful for gated pages.
- gatsby-config.js: Note that we are using the `gatsby-plugin-create-client-paths` plugin to configure all paths starting with /secret/* as client-only paths.
- gatsby-node.js: Note that we still need to tell Gatsby to create pages for the client-only paths, even though the content
for these pages will be delivered at runtime. (If you skip this step, the URLs will just 404)
- /pages/secret.js: Here we are overriding the normal page routing process for gated pages, telling these to be served using
our custom PrivateRoute middleware component.
- /components/PrivateRoute: This is our middleware component, that will redirect the user to the login page if they try to 
access gated content.
- /pages/login.js: This is the login page, where the user will be allowed to sign into their user account. This uses Firebase authentication.
- /templates/secret-page.js: This is the template that renders our gated pages. On page load, it will make a call to the
Firebase Cloud function requesting the page content by its Content ID. The Cloud function than fetches and returns it from Contentful.
