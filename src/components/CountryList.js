import React from "react"
import Country from "components/Country"
import "components/CountryList.css"

const CountryList = ({ countries, base, amount }) => (
  <div className="CountryList">
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
