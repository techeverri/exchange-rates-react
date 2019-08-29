import { ApolloProvider } from "@apollo/react-hooks"
import App from "components/App"
import client from "graphql/client"
import React from "react"
import ReactDOM from "react-dom"

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root"),
)
