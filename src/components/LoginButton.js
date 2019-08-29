import React, { useCallback } from "react"
import { GRAPHQL_BASE_URL, TOKEL_LOCAL_STORAGE_KEY } from "config"

const LoginButton = ({ onClick }) => {
  const fecthToken = useCallback(async () => {
    const response = await fetch(`${GRAPHQL_BASE_URL}/login`, {
      method: "POST",
    })

    const { token } = await response.json()

    localStorage.setItem(TOKEL_LOCAL_STORAGE_KEY, token)
    onClick(token)
  }, [onClick])

  return <button onClick={fecthToken}>Login</button>
}

export default LoginButton
