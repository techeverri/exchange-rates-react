export const GRAPHQL_BASE_URL =
  process.env.REACT_APP_GRAPHQL_BASE_URL || "http://localhost:4000"

export const GRAPHQL_URI = `${GRAPHQL_BASE_URL}/graphql`

export const TOKEL_LOCAL_STORAGE_KEY = "token"

export const COUNTRIES_LOCAL_STORAGE_KEY = "countries"

export const language = window.navigator.language
