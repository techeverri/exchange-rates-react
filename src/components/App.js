import Amount from "components/Amount"
import "components/App.css"
import CountryList from "components/CountryList"
import CountrySelector from "components/CountrySelector"
import LoginButton from "components/LoginButton"
import LogoutButton from "components/LogoutButton"
import React, { useCallback, useState } from "react"
import getInitialCountries from "utils/getInitialCountries"
import getStoredToken from "utils/getStoredToken"
import setInitialCountries from "utils/setInitialCountries"

const App = () => {
  const [token, setToken] = useState(getStoredToken())
  const [amount, setAmount] = useState(1)
  const [base, setBase] = useState("SEK")
  const [countries, setCountries] = useState(getInitialCountries())

  const handleCountrySelection = useCallback(
    selectedCountry => {
      const selectedCountries = [...countries, selectedCountry]
      setCountries(selectedCountries)
      setInitialCountries(selectedCountries)
    },
    [setCountries, countries],
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
          <CountrySelector onSelect={handleCountrySelection} />
        </>
      )}
    </>
  )
}

export default App
