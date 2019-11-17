import { useQuery } from "@apollo/react-hooks"
import { COUNTRIES_QUERY } from "graphql/queries"
import React, { useState } from "react"
import uniqueBy from "lodash.uniqby"
import xorBy from "lodash.xorby"

const CountrySelector = ({ selectedCountries, onSelect }) => {
  const { loading, error, data } = useQuery(COUNTRIES_QUERY)
  const [selectedCountryName, setSelectedCountryName] = useState("")

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const availableCountries = xorBy(data.countries, selectedCountries, 'name')

  return (
    <form onSubmit={event => event.preventDefault()}>
      <input
        list="countries"
        name="country"
        placeholder="Select a country"
        value={selectedCountryName}
        onChange={event => {
          const value = event.target.value
          setSelectedCountryName(value)
        }}
      />
      <datalist id="countries">
        {availableCountries.map(country => (
          <option key={country.name} value={country.name} />
        ))}
      </datalist>

      <button
        onClick={() => {
          const selectedCountry =
            availableCountries.find(
              country => country.name === selectedCountryName,
            ) || {}

          if (selectedCountry.name) {
            onSelect(selectedCountry)
            setSelectedCountryName("")
          }
        }}>
        Add
      </button>
    </form>
  )
}

export default CountrySelector
