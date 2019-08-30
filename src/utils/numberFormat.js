import { language } from "config"

export const populationFormatter = new Intl.NumberFormat(language)

export const currencyFormatter = new Intl.NumberFormat(language, {
  maximumFractionDigits: 2,
})
