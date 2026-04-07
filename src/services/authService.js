export const login = async (data) => {
  const token = "dummy_token_12345"
  localStorage.setItem("token", token)
  return Promise.resolve({
    data: {
      data: {
        token,
        user: { id: 1, name: data.email ? data.email.split('@')[0] : "Dummy User", email: data.email }
      }
    }
  })
}

export const register = async (data) => {
  return Promise.resolve({
    data: { message: "Success registered" }
  })
}

export const getMe = async () => {
  return Promise.resolve({
    data: {
      data: {
        user: { id: 1, name: "Dummy User", email: "dummy@example.com" }
      }
    }
  })
}

export const logout = async () => {
  localStorage.removeItem("token")
  return Promise.resolve({ data: { message: "Logged out" } })
}