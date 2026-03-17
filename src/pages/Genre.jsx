import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getMoviesByGenre, getMovies } from "../services/movieService"
import MovieCard from "../components/MovieCard"
import GenreList from "../components/GenreList"
import Navbar from "../components/Navbar"
import { BsArrowLeft } from "react-icons/bs"

const Genre = () => {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [loading, setLoading] = useState(true)
  const [bookmarks, setBookmarks] = useState(() => {
    const s = localStorage.getItem("bookmarks")
    return s ? JSON.parse(s) : []
  })

  useEffect(() => {
    setLoading(true)
    const fetch = selectedGenre === "All"
      ? getMovies()
      : getMoviesByGenre(selectedGenre)

    fetch
      .then((res) => {
        const data = res.data.data || res.data
        setMovies(Array.isArray(data) ? data : [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [selectedGenre])

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
        <h2>Jelajahi Genre</h2>
      </header>

      <GenreList selected={selectedGenre} onSelect={setSelectedGenre} />

      <section className="home-section">
        <h3 className="section-label">{selectedGenre === "All" ? "Semua Film" : selectedGenre}</h3>
        {loading ? (
          <div className="movie-grid">
            {[...Array(8)].map((_, i) => <div key={i} className="skeleton-card" />)}
          </div>
        ) : movies.length === 0 ? (
          <div className="empty-state"><p>Tidak ada film di genre ini</p></div>
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
      </section>

      <div style={{ height: "80px" }} />
      <Navbar />
    </div>
  )
}

export default Genre
