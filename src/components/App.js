import Amount from "components/Amount"
import CountryList from "components/CountryList"
import CountrySelector from "components/CountrySelector"
import LoginButton from "components/LoginButton"
import LogoutButton from "components/LogoutButton"
import { COUNTRIES_LOCAL_STORAGE_KEY, TOKEL_LOCAL_STORAGE_KEY } from "config"
import React, { useState } from "react"
import "components/App.css"

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem(TOKEL_LOCAL_STORAGE_KEY),
  )
  const [amount, setAmount] = useState(1)
  const [base, setBase] = useState("SEK")
  const [countries, setCountries] = useState(
    JSON.parse(localStorage.getItem(COUNTRIES_LOCAL_STORAGE_KEY)) || [],
  )

  return (
    <>
      <h1>Exchange Rates</h1>
      {!token ? (
        <LoginButton onClick={setToken} />
      ) : (
        <>
          <LogoutButton onClick={setToken} />
          <hr />
          <Amount amount={amount} base={base} onChange={setAmount} />
          <CountryList countries={countries} base={base} amount={amount} />
          <hr />
          <CountrySelector
            onSelect={country => {
              setCountries([...countries, country])
              localStorage.setItem(
                COUNTRIES_LOCAL_STORAGE_KEY,
                JSON.stringify([...countries, country]),
              )
            }}
          />
        </>
      )}
    </>
  )
}

export default App
