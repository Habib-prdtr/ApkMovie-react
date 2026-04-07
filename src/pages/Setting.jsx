import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import { BsArrowLeft, BsMoon, BsBell, BsShield, BsTrash, BsChevronRight } from "react-icons/bs"

const Setting = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const darkMode = theme === "dark"
  const [notifications, setNotifications] = useState(true)

  const handleClearData = () => {
    if (window.confirm("Hapus semua data lokal (bookmark, dll)? Tidak bisa dibatalkan.")) {
      localStorage.removeItem("bookmarks")
      alert("Data dihapus.")
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <button className="back-btn-sm" onClick={() => navigate(-1)}>
          <BsArrowLeft size={20} />
        </button>
        <h2>Pengaturan</h2>
      </header>

      <div className="settings-section">
        <h4 className="settings-section__title">Tampilan</h4>
        <div className="settings-item">
          <div className="settings-item__left">
            <BsMoon size={20} color="var(--accent)" />
            <span>Mode Gelap</span>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
            <span className="toggle__slider" />
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h4 className="settings-section__title">Notifikasi</h4>
        <div className="settings-item">
          <div className="settings-item__left">
            <BsBell size={20} color="var(--accent)" />
            <span>Notifikasi Film Baru</span>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
            <span className="toggle__slider" />
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h4 className="settings-section__title">Data & Privasi</h4>
        <div className="settings-item clickable" onClick={handleClearData}>
          <div className="settings-item__left">
            <BsTrash size={20} color="var(--accent)" />
            <span>Hapus Data Lokal</span>
          </div>
          <BsChevronRight size={16} />
        </div>
        <div className="settings-item clickable" onClick={async () => { await logout(); navigate("/") }}>
          <div className="settings-item__left">
            <BsShield size={20} color="var(--accent)" />
            <span>Keluar dari Akun</span>
          </div>
          <BsChevronRight size={16} />
        </div>
      </div>

      <div className="settings-version">
        <p>CineStream v1.0.0</p>
        <p>© 2024 CineStream. All rights reserved.</p>
      </div>



    </div>
  )
}

export default Setting
