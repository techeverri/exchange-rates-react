import { InMemoryCache } from "apollo-cache-inmemory"
import ApolloClient from "apollo-client"
import { setContext } from "apollo-link-context"
import { createHttpLink } from "apollo-link-http"
import { GRAPHQL_URI } from "./config"

const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token")

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  connectToDevTools: true,
})

export default client
