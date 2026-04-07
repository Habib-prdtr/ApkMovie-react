import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getNewReleases } from "../services/movieService"
import MovieCard from "../components/MovieCard"
import Navbar from "../components/Navbar"
import { BsArrowLeft } from "react-icons/bs"
import { MdNewReleases } from "react-icons/md"

const NewRelease = () => {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [bookmarks, setBookmarks] = useState(() => {
    const s = localStorage.getItem("bookmarks")
    return s ? JSON.parse(s) : []
  })

  useEffect(() => {
    getNewReleases()
      .then((res) => {
        const data = res.data.data || res.data
        setMovies(Array.isArray(data) ? data : [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleBookmark = (movie) => {
    setBookmarks((prev) => {
      const exists = prev.find((m) => m.id === movie.id)
      const updated = exists ? prev.filter((m) => m.id !== movie.id) : [...prev, movie]
      localStorage.setItem("bookmarks", JSON.stringify(updated))
      return updated
    })
  }

  return (
    <div className="page">
      <header className="page-header">
        <button className="back-btn-sm" onClick={() => navigate(-1)}>
          <BsArrowLeft size={20} />
        </button>
        <div className="page-header__title">
          <MdNewReleases size={24} color="var(--accent)" />
          <h2>Rilis Terbaru</h2>
        </div>
      </header>

      {loading ? (
        <div className="movie-grid">
          {[...Array(8)].map((_, i) => <div key={i} className="skeleton-card" />)}
        </div>
      ) : movies.length === 0 ? (
        <div className="empty-state"><p>Belum ada rilis terbaru</p></div>
      ) : (
        <div className="movie-grid">
          {movies.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              bookmarked={bookmarks.some((b) => b.id === m.id)}
              onBookmark={handleBookmark}
            />
          ))}
        </div>
      )}

      <div style={{ height: "80px" }} />
      <Navbar />
    </div>
  )
}

export default NewRelease
