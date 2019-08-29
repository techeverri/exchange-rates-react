import { TOKEL_LOCAL_STORAGE_KEY } from "config"
import React, { useCallback } from "react"

const LogoutButton = ({ onClick }) => {
  const deleteToken = useCallback(() => {
    localStorage.removeItem(TOKEL_LOCAL_STORAGE_KEY)
    onClick(null)
  }, [onClick])

  return <button onClick={deleteToken}>Logout</button>
}

export default LogoutButton
