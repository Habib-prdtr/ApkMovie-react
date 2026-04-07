import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { searchMovies, getMovies } from "../services/movieService"
import MovieCard from "../components/MovieCard"
import { BsSearch, BsXCircleFill } from "react-icons/bs"

const Search = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [popular, setPopular] = useState([])
  const [loading, setLoading] = useState(false)
  const [bookmarks, setBookmarks] = useState(() => {
    const s = localStorage.getItem("bookmarks")
    return s ? JSON.parse(s) : []
  })

  useEffect(() => {
    getMovies().then((res) => {
      const data = res.data.data || res.data
      setPopular(Array.isArray(data) ? data.slice(0, 12) : [])
    })
  }, [])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const delay = setTimeout(() => {
      setLoading(true)
      searchMovies(query)
        .then((res) => {
          const data = res.data.data || res.data
          setResults(Array.isArray(data) ? data : [])
        })
        .catch(() => setResults([]))
        .finally(() => setLoading(false))
    }, 500)
    return () => clearTimeout(delay)
  }, [query])

  const handleBookmark = (movie) => {
    setBookmarks((prev) => {
      const exists = prev.find((m) => m.id === movie.id)
      const updated = exists ? prev.filter((m) => m.id !== movie.id) : [...prev, movie]
      localStorage.setItem("bookmarks", JSON.stringify(updated))
      return updated
    })
  }

  const displayMovies = query.trim() ? results : popular

  return (
    <div className="page">
      <header className="page-header">
        <h2>Cari Film</h2>
      </header>

      <div className="search-bar">
        <BsSearch size={18} className="search-bar__icon" />
        <input
          type="text"
          placeholder="Cari judul, genre, tahun..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        {query && (
          <button onClick={() => setQuery("")} className="search-bar__clear">
            <BsXCircleFill size={18} />
          </button>
        )}
      </div>

      {loading && (
        <div className="search-loading">
          <div className="spinner" />
        </div>
      )}

      <section className="home-section">
        <h3 className="section-label">
          {query.trim() ? `Hasil untuk "${query}"` : "Film Populer"}
        </h3>
        {!loading && displayMovies.length === 0 && query.trim() && (
          <div className="empty-state">
            <p>Film tidak ditemukan 😔</p>
          </div>
        )}
        <div className="movie-grid">
          {displayMovies.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              bookmarked={bookmarks.some((b) => b.id === m.id)}
              onBookmark={handleBookmark}
            />
          ))}
        </div>
      </section>



    </div>
  )
}

export default Search
