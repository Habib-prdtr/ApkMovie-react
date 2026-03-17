import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Navbar from "../components/Navbar"
import { BsPersonCircle, BsEnvelope, BsShieldLock, BsBoxArrowRight, BsChevronRight } from "react-icons/bs"

const Profile = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?"

  return (
    <div className="page">
      <header className="page-header">
        <h2>Profil</h2>
      </header>

      {/* Avatar */}
      <div className="profile-hero">
        <div className="profile-avatar">{initials}</div>
        <h2 className="profile-name">{user?.name || "—"}</h2>
        <p className="profile-email">{user?.email || "—"}</p>
      </div>

      {/* Menu */}
      <div className="profile-menu">
        <div className="profile-menu__item">
          <BsPersonCircle size={20} />
          <span>Nama</span>
          <span className="profile-menu__value">{user?.name}</span>
          <BsChevronRight size={14} />
        </div>
        <div className="profile-menu__item">
          <BsEnvelope size={20} />
          <span>Email</span>
          <span className="profile-menu__value">{user?.email}</span>
          <BsChevronRight size={14} />
        </div>
        <div className="profile-menu__item" onClick={() => navigate("/settings")}>
          <BsShieldLock size={20} />
          <span>Pengaturan</span>
          <span />
          <BsChevronRight size={14} />
        </div>
      </div>

      {/* Logout */}
      <button className="btn btn--danger logout-btn" onClick={handleLogout}>
        <BsBoxArrowRight size={20} /> Keluar
      </button>

      <div style={{ height: "80px" }} />
      <Navbar />
    </div>
  )
}

export default Profile
