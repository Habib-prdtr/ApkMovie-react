import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { BsFillPlayFill } from "react-icons/bs"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

const Splash = () => {
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const [mode, setMode] = useState("welcome") // welcome | login | register
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({ name: "", email: "", password: "" })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login({ email: form.email, password: form.password })
      navigate("/home")
    } catch {
      setError("Email atau password salah.")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await register({ name: form.name, email: form.email, password: form.password })
      setMode("login")
      setError("")
      setForm({ name: "", email: "", password: "" })
    } catch {
      setError("Registrasi gagal. Coba email lain.")
    } finally {
      setLoading(false)
    }
  }

  if (mode === "welcome") {
    return (
      <div className="splash">
        <div className="splash__bg">
          <div className="splash__gradient" />
        </div>
        <div className="splash__content">
          <div className="splash__logo">
            <div className="splash__logo-icon">
              <BsFillPlayFill size={26} color="#fff" />
            </div>
            <h1>CineStream</h1>
          </div>
          <p className="splash__tagline">Temukan, Tonton, dan Nikmati Ribuan Film Terbaik</p>
          <div className="splash__actions">
            <button className="btn btn--primary" onClick={() => setMode("register")}>
              Mulai Sekarang
            </button>
            <button className="btn btn--ghost" onClick={() => setMode("login")}>
              Sudah punya akun? Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (mode === "login") {
    return (
      <div className="splash">
        <div className="splash__bg"><div className="splash__gradient" /></div>
        <div className="auth-card">
          <div className="auth-card__header">
            <div className="auth-card__logo">
              <BsFillPlayFill size={22} color="#fff" />
            </div>
            <h2>Selamat Datang Kembali</h2>
            <p>Masuk untuk melanjutkan menonton</p>
          </div>
          {error && <div className="auth-error">{error}</div>}
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="contoh@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-eye">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
          <p className="auth-switch">
            Belum punya akun?{" "}
            <span onClick={() => setMode("register")}>Daftar</span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="splash">
      <div className="splash__bg"><div className="splash__gradient" /></div>
      <div className="auth-card">
        <div className="auth-card__header">
          <div className="auth-card__logo">
            <BsFillPlayFill size={22} color="#fff" />
          </div>
          <h2>Buat Akun Baru</h2>
          <p>Bergabung dan nikmati semua fitur</p>
        </div>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label>Nama</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama lengkap"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="contoh@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="input-eye">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 karakter"
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)}>
                {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn--primary btn--wide" disabled={loading}>
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>
        <p className="auth-switch">
          Sudah punya akun?{" "}
          <span onClick={() => setMode("login")}>Masuk</span>
        </p>
      </div>
    </div>
  )
}

export default Splash
