import React from "react"
import Country from "components/Country"

const CountryList = ({ countries, base, amount }) => (
  <div>
    {countries.map(country => (
      <Country
        key={`${country.name}-${base}`}
        name={country.name}
        base={base}
        amount={amount}
      />
    ))}
  </div>
)

export default CountryList
