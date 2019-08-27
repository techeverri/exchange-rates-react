import { ApolloProvider, useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import React, { useState } from "react"
import ReactDOM from "react-dom"
import client from "./client"

const COUNTRIES_QUERY = gql`
  query CountriesQuery {
    countries {
      name
      currencies {
        code
      }
    }
  }
`

const CountrySelector = ({ onChange }) => {
  const { loading, error, data } = useQuery(COUNTRIES_QUERY)
  const [selectedCountryName, setSelectedCountryName] = useState("")

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <form onSubmit={event => event.preventDefault()}>
      <input
        list="countries"
        name="country"
        value={selectedCountryName}
        onChange={event => {
          const value = event.target.value
          setSelectedCountryName(value)
        }}
      />
      <datalist id="countries">
        {data.countries.map(country => (
          <option key={country.name} value={country.name} />
        ))}
      </datalist>

      <input
        type="submit"
        value="Add"
        onClick={() => {
          const selectedCountry =
            data.countries.find(
              country => country.name === selectedCountryName,
            ) || {}

          if (selectedCountry.name) {
            onChange(selectedCountry)
            setSelectedCountryName("")
          }
        }}
      />
    </form>
  )
}

const COUNTRY_QUERY = gql`
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

const Country = ({ name, base }) => {
  const { loading, error, data } = useQuery(COUNTRY_QUERY, {
    variables: { name, base },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const { country } = data

  return (
    <>
      <pre>{JSON.stringify(country, null, 2)}</pre>
      {country.currencies.map(currency => (
        <div key={currency.name} style={{ display: "flex" }}>
          <div>
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              style={{ height: 50 }}
            />
          </div>
          <div style={{ flexDirection: "column" }}>
            <div>{currency.code}</div>
            <div>{currency.name}</div>
          </div>
          <div style={{ flexDirection: "column" }}>
            <div>{`${currency.symbol}`}</div>
            <div>{`1 ${currency.code} = ${currency.rate.toFixed(
              2,
            )} ${base}`}</div>
          </div>
        </div>
      ))}
    </>
  )
}

const CountryList = ({ countries, base }) => (
  <div>
    {countries.map(country => (
      <Country
        key={`${country.name}-${base}`}
        name={country.name}
        base={base}
      />
    ))}
  </div>
)

const App = () => {
  const [base, setBase] = useState("SEK")
  const [countries, setCountries] = useState([])

  return (
    <>
      <CountrySelector
        onChange={country => setBase(country.currencies[0].code)}
      />
      <CountryList countries={countries} base={base} />
      <CountrySelector
        onChange={country => setCountries([...countries, country])}
      />
    </>
  )
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root"),
)
