import Amount from "components/Amount"
import "components/App.css"
import CountryList from "components/CountryList"
import CountrySelector from "components/CountrySelector"
import LoginButton from "components/LoginButton"
import LogoutButton from "components/LogoutButton"
import React, { useCallback, useState } from "react"
import retrieveInitialCountries from "utils/retrieveInitialCountries"
import getStoredToken from "utils/getStoredToken"
import storeInitialCountries from "utils/storeInitialCountries"

const App = () => {
  const [token, setToken] = useState(getStoredToken())
  const [amount, setAmount] = useState(1)
  const [base, setBase] = useState("SEK")
  const [countries, setCountries] = useState(retrieveInitialCountries())

  const handleCountrySelection = useCallback(
    selectedCountry => {
      const selectedCountries = [...countries, selectedCountry]
      setCountries(selectedCountries)
      storeInitialCountries(selectedCountries)
    },
    [setCountries, countries],
  )

  return (
    <div className="App">
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
          <CountrySelector onSelect={handleCountrySelection} />
        </>
      )}
    </div>
  )
}

export default App
