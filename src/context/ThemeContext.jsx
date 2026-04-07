import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark"
  })

  useEffect(() => {
    localStorage.setItem("theme", theme)
    if (theme === "light") {
      document.body.setAttribute("data-theme", "light")
      document.documentElement.setAttribute("data-theme", "light")
    } else {
      document.body.removeAttribute("data-theme")
      document.documentElement.removeAttribute("data-theme")
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark")
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
