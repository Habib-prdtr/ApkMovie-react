import { NavLink } from "react-router-dom"
import { AiFillHome } from "react-icons/ai"
import { BsSearch, BsBookmarkFill, BsPersonFill } from "react-icons/bs"
import { MdTrendingUp } from "react-icons/md"
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/home" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <AiFillHome size={22} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/search" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <BsSearch size={20} />
        <span>Search</span>
      </NavLink>
      <NavLink to="/trending" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <MdTrendingUp size={22} />
        <span>Trending</span>
      </NavLink>
      <NavLink to="/bookmark" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <BsBookmarkFill size={20} />
        <span>Saved</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <BsPersonFill size={22} />
        <span>Profile</span>
      </NavLink>
    </nav>
  )
}

export default Navbar
