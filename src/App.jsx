import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Splash from "./pages/Splash"
import Home from "./pages/Home"
import Search from "./pages/Search"
import DetailMovie from "./pages/DetailMovie"
import WatchMovie from "./pages/WatchMovie"
import Trending from "./pages/Trending"
import NewRelease from "./pages/NewRelease"
import Genre from "./pages/Genre"
import Bookmark from "./pages/Bookmark"
import Profile from "./pages/Profile"
import Setting from "./pages/Setting"

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="page center"><div className="spinner" /></div>
  return user ? children : <Navigate to="/" replace />
}

const AppRoutes = () => {
  const { user, loading } = useAuth()
  if (loading) return <div className="page center"><div className="spinner" /></div>

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/home" replace /> : <Splash />} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
      <Route path="/movie/:id" element={<PrivateRoute><DetailMovie /></PrivateRoute>} />
      <Route path="/watch/:id" element={<PrivateRoute><WatchMovie /></PrivateRoute>} />
      <Route path="/trending" element={<PrivateRoute><Trending /></PrivateRoute>} />
      <Route path="/new-release" element={<PrivateRoute><NewRelease /></PrivateRoute>} />
      <Route path="/genre" element={<PrivateRoute><Genre /></PrivateRoute>} />
      <Route path="/bookmark" element={<PrivateRoute><Bookmark /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Setting /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
