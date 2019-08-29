import { useQuery } from "@apollo/react-hooks"
import { COUNTRY_QUERY } from "graphql/queries"
import React from "react"

const Country = ({ name, base, amount }) => {
  const { loading, error, data } = useQuery(COUNTRY_QUERY, {
    variables: { name, base },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const { country } = data

  return (
    <>
      <pre>
        {JSON.stringify({ name: country.name, population: country.population })}
      </pre>
      {country.currencies.map(currency => (
        <div
          key={currency.name}
          style={{
            display: "flex",
            maxWidth: 600,
          }}>
          <div
            style={{
              width: 60,
            }}>
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              style={{ height: 30 }}
            />
          </div>
          <div
            style={{
              flexDirection: "column",
              flexGrow: 1,
            }}>
            <div>{currency.code}</div>
            <div>{currency.name}</div>
          </div>
          <div
            style={{
              flexDirection: "column",
              flexGrow: 1,
            }}>
            <strong>{`${currency.symbol} ${currency.rate * amount}`}</strong>
            <div>{`1 ${currency.code} = ${currency.rate.toFixed(
              2,
            )} ${base}`}</div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Country
