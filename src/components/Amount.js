import React, { useCallback } from "react"

const Amount = ({ amount, base, onChange }) => {
  const handleChange = useCallback(
    event => {
      const value = event.target.value || 1
      onChange(value)
    },
    [onChange],
  )

  return (
    <form onSubmit={event => event.preventDefault()}>
      <label htmlFor="amount">Amount </label>
      <input
        name="amount"
        type="number"
        placeholder={`${amount} ${base}`}
        onChange={handleChange}
      />
    </form>
  )
}

export default Amount
