import { gql } from "apollo-boost"

export const COUNTRIES_QUERY = gql`
  query CountriesQuery {
    countries {
      name
      currencies {
        code
      }
    }
  }
`
export const COUNTRY_QUERY = gql`
  query CountryQuery($name: String!, $base: String!) {
    country(name: $name) {
      name
      population
      currencies {
        name
        code
        symbol
        rate(base: $base)
      }
      flag
    }
  }
`
