import { useQuery } from "@apollo/react-hooks"
import "components/Country.css"
import { COUNTRY_QUERY } from "graphql/queries"
import React from "react"
import { currencyFormatter, populationFormatter } from "utils/numberFormat"

const Country = ({ name, base, amount }) => {
  const { loading, error, data } = useQuery(COUNTRY_QUERY, {
    variables: { name, base },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const { country } = data
  const population = populationFormatter.format(country.population)

  return (
    <div>
      <p className="Country__header">
        <span className="Country__header-name">{country.name}</span>{" "}
        <span className="Country__header-population">
          Population: {population}
        </span>
      </p>
      {country.currencies.map(currency => {
        const exchangeRate = currencyFormatter.format(currency.rate * amount)
        const rate = currencyFormatter.format(currency.rate)

        return (
          <div key={currency.name} className="Country__currency">
            <div className="Country__currency__flag-container">
              <img
                className="Country__currency-flag"
                src={country.flag}
                alt={`Flag of ${country.name}`}
              />
            </div>
            <div className="Country__currency-description">
              <div>{currency.code}</div>
              <div>{currency.name}</div>
            </div>
            <div className="Country__currency-exchange-rate">
              <strong>{`${currency.symbol} ${exchangeRate}`}</strong>
              <div>{`1 ${currency.code} = ${rate} ${base}`}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Country
