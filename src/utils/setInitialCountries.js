import { COUNTRIES_LOCAL_STORAGE_KEY } from "config"

const setInitialCountries = countries =>
  localStorage.setItem(COUNTRIES_LOCAL_STORAGE_KEY, JSON.stringify(countries))

export default setInitialCountries
