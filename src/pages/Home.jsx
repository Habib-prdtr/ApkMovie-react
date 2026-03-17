import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { getMovies, getTrendingMovies, getNewReleases } from "../services/movieService"
import { storageUrl } from "../services/api"
import MovieCard from "../components/MovieCard"
import GenreList from "../components/GenreList"
import Navbar from "../components/Navbar"
import { BsSearch, BsBellFill, BsFillPlayFill } from "react-icons/bs"
import { AiFillStar } from "react-icons/ai"

const Home = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [trending, setTrending] = useState([])
  const [newReleases, setNewReleases] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [loading, setLoading] = useState(true)
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarks")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allRes, trendRes, newRes] = await Promise.all([
          getMovies(),
          getTrendingMovies(),
          getNewReleases(),
        ])
        const allData = allRes.data.data || allRes.data
        const trendData = trendRes.data.data || trendRes.data
        const newData = newRes.data.data || newRes.data
        setMovies(Array.isArray(allData) ? allData : [])
        setTrending(Array.isArray(trendData) ? trendData : [])
        setNewReleases(Array.isArray(newData) ? newData : [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleBookmark = (movie) => {
    setBookmarks((prev) => {
      const exists = prev.find((m) => m.id === movie.id)
      const updated = exists ? prev.filter((m) => m.id !== movie.id) : [...prev, movie]
      localStorage.setItem("bookmarks", JSON.stringify(updated))
      return updated
    })
  }

  const heroMovie = trending[0] || movies[0]

  // API field: poster_url (path relatif storage)
  const heroPoster = storageUrl(heroMovie?.poster_url || heroMovie?.poster)
    || `https://placehold.co/800x400/0f0f23/e94560?text=${encodeURIComponent(heroMovie?.title || 'CineStream')}`

  const heroYear = heroMovie?.release_date
    ? heroMovie.release_date.slice(0, 4)
    : (heroMovie?.year || "")

  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((m) => m.genre?.toLowerCase() === selectedGenre.toLowerCase())

  return (
    <div className="page home-page">
      {/* Header */}
      <header className="home-header">
        <div>
          <p className="home-header__greeting">Selamat datang 👋</p>
          <h2 className="home-header__name">{user?.name || "Penonton"}</h2>
        </div>
        <div className="home-header__actions">
          <button className="icon-btn" onClick={() => navigate("/search")}>
            <BsSearch size={20} />
          </button>
          <button className="icon-btn">
            <BsBellFill size={20} />
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      {heroMovie && (
        <div className="hero-banner" onClick={() => navigate(`/movie/${heroMovie.id}`)}>
          <img
            src={heroPoster}
            alt={heroMovie.title}
            className="hero-banner__img"
            onError={(e) => { e.target.src = `https://placehold.co/800x400/0f0f23/e94560?text=${encodeURIComponent(heroMovie.title)}` }}
          />
          <div className="hero-banner__overlay">
            <span className="hero-banner__badge">🔥 Trending</span>
            <h2 className="hero-banner__title">{heroMovie.title}</h2>
            <div className="hero-banner__meta">
              {heroMovie.rating && (
                <span><AiFillStar color="#ffd700" /> {heroMovie.rating}</span>
              )}
              {heroMovie.genre && <span className="tag">{heroMovie.genre}</span>}
              {heroYear && <span>{heroYear}</span>}
            </div>
            <div className="hero-banner__actions">
              <button
                className="btn btn--primary btn--sm"
                onClick={(e) => { e.stopPropagation(); navigate(`/watch/${heroMovie.id}`) }}
              >
                <BsFillPlayFill /> Tonton
              </button>
              <button
                className="btn btn--ghost btn--sm"
                onClick={(e) => { e.stopPropagation(); navigate(`/movie/${heroMovie.id}`) }}
              >
                Detail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Genre Filter */}
      <section className="home-section">
        <GenreList selected={selectedGenre} onSelect={setSelectedGenre} />
      </section>

      {/* Trending */}
      <section className="home-section">
        <div className="section-header">
          <h3>Trending Sekarang</h3>
          <span className="see-all" onClick={() => navigate("/trending")}>Lihat Semua</span>
        </div>
        {loading ? (
          <div className="loading-row">
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton-card" />)}
          </div>
        ) : (
          <div className="movie-row">
            {trending.slice(0, 8).map((m) => (
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

      {/* Browse by Genre */}
      <section className="home-section">
        <div className="section-header">
          <h3>{selectedGenre === "All" ? "Semua Film" : selectedGenre}</h3>
          <span className="see-all" onClick={() => navigate("/genre")}>Lihat Semua</span>
        </div>
        {loading ? (
          <div className="loading-row">
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton-card" />)}
          </div>
        ) : (
          <div className="movie-row">
            {filteredMovies.slice(0, 8).map((m) => (
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

      {/* New Releases */}
      <section className="home-section">
        <div className="section-header">
          <h3>Rilis Terbaru</h3>
          <span className="see-all" onClick={() => navigate("/new-release")}>Lihat Semua</span>
        </div>
        {loading ? (
          <div className="loading-row">
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton-card" />)}
          </div>
        ) : (
          <div className="movie-row">
            {newReleases.slice(0, 8).map((m) => (
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

export default Home
