import uniqueBy from "lodash.uniqby"
import { COUNTRIES_LOCAL_STORAGE_KEY } from "config"

const retrieveInitialCountries = () => {
  const storedCountries =
    JSON.parse(localStorage.getItem(COUNTRIES_LOCAL_STORAGE_KEY)) || []

  const initialCountries = storedCountries.concat([
    { name: "Colombia" },
    { name: "Netherlands" },
    { name: "Norway" },
  ])

  return uniqueBy(initialCountries, "name")
}

export default retrieveInitialCountries
