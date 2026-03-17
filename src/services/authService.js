import api from "./api"

export const login = async (data) => {
  const res = await api.post("/login", data)
  // API returns { data: { user, token } }
  const token = res.data?.data?.token || res.data?.token
  if (token) localStorage.setItem("token", token)
  return res
}

export const register = (data) => {
  return api.post("/register", data)
}

export const getMe = () => {
  return api.get("/me")
}

export const logout = () => {
  localStorage.removeItem("token")
  return api.post("/logout")
}