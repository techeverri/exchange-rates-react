import { TOKEL_LOCAL_STORAGE_KEY } from "config"

const getStoredToken = () => localStorage.getItem(TOKEL_LOCAL_STORAGE_KEY)

export default getStoredToken
