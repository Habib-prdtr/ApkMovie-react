import { createContext, useContext, useState, useEffect } from "react"
import { login as apiLogin, register as apiRegister, logout as apiLogout, getMe } from "../services/authService"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      getMe()
        .then((res) => {
          // Support: { user } or { data: { user } } or { data: user }
          const user = res.data?.data?.user || res.data?.user || res.data
          setUser(user)
        })
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (data) => {
    const res = await apiLogin(data)
    // Ambil user langsung dari response login
    const user = res.data?.data?.user || res.data?.user
    if (user) {
      setUser(user)
    } else {
      // Fallback: panggil /me jika user tidak ada di response login
      try {
        const me = await getMe()
        const meUser = me.data?.data?.user || me.data?.user || me.data
        setUser(meUser)
      } catch {}
    }
    return res
  }

  const register = async (data) => {
    const res = await apiRegister(data)
    return res
  }

  const logout = async () => {
    await apiLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
