import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getMovieDetail, getMovies } from "../services/movieService"
import { storageUrl } from "../services/api"
import Player from "../components/Player"
import MovieCard from "../components/MovieCard"
import { BsArrowLeft, BsBookmarkPlus, BsBookmarkFill, BsShareFill, BsFillPlayFill } from "react-icons/bs"
import { AiFillStar } from "react-icons/ai"
import { MdOutlineLocalMovies } from "react-icons/md"

const WatchMovie = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [bookmarks, setBookmarks] = useState(() => {
    const s = localStorage.getItem("bookmarks")
    return s ? JSON.parse(s) : []
  })

  useEffect(() => {
    setLoading(true)
    getMovieDetail(id)
      .then((res) => {
        const data = res.data.data || res.data
        setMovie(data)
        return getMovies()
      })
      .then((res) => {
        const all = res.data.data || res.data
        if (Array.isArray(all)) {
          setRecommendations(all.filter((m) => m.id !== Number(id)).slice(0, 8))
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  const isBookmarked = bookmarks.some((m) => m.id === movie?.id)

  const handleBookmark = () => {
    if (!movie) return
    setBookmarks((prev) => {
      const exists = prev.find((m) => m.id === movie.id)
      const updated = exists ? prev.filter((m) => m.id !== movie.id) : [...prev, movie]
      localStorage.setItem("bookmarks", JSON.stringify(updated))
      return updated
    })
  }

  if (loading) {
    return (
      <div className="page center" style={{ background: "#000" }}>
        <div className="spinner" />
        <p style={{ color: "#555570", fontSize: 14 }}>Memuat film...</p>
      </div>
    )
  }

  const videoSrc = storageUrl(movie?.video_url || movie?.trailer_url)
  const poster = storageUrl(movie?.poster_url || movie?.poster)
  const year = movie?.release_date
    ? movie.release_date.slice(0, 4)
    : (movie?.year || "")
  const description = movie?.overview || movie?.description || ""

  return (
    <div className="watch-page-v2">
      {/* ── PLAYER ZONE ── */}
      <div className="wpv2-player-zone">
        {/* Topbar over player */}
        <div className="wpv2-topbar">
          <button className="wpv2-circle-btn" onClick={() => navigate(-1)}>
            <BsArrowLeft size={20} />
          </button>
          <div className="wpv2-topbar__center">
            <span className="wpv2-now-playing">Sedang Diputar</span>
            <h3 className="wpv2-movie-title">{movie?.title}</h3>
          </div>
          <button className="wpv2-circle-btn" onClick={handleBookmark}>
            {isBookmarked
              ? <BsBookmarkFill size={18} color="#e94560" />
              : <BsBookmarkPlus size={18} />}
          </button>
        </div>

        {/* Player */}
        <div className="wpv2-player">
          <Player src={videoSrc} title={movie?.title} />
        </div>
      </div>

      {/* ── INFO SECTION ── */}
      <div className="wpv2-info">
        {/* Title row */}
        <div className="wpv2-title-row">
          <div>
            {movie?.genre && <span className="wpv2-genre-tag">{movie.genre}</span>}
            <h2 className="wpv2-title">{movie?.title}</h2>
          </div>
          <button className="wpv2-share-btn" onClick={handleBookmark}>
            {isBookmarked
              ? <BsBookmarkFill size={20} color="#e94560" />
              : <BsBookmarkPlus size={20} />}
          </button>
        </div>

        {/* Meta pills */}
        <div className="wpv2-meta">
          {movie?.rating && (
            <span className="wpv2-pill wpv2-pill--gold">
              <AiFillStar color="#ffd700" size={13} /> {movie.rating}
            </span>
          )}
          {year && <span className="wpv2-pill">📅 {year}</span>}
          {movie?.duration && <span className="wpv2-pill">⏱ {movie.duration} min</span>}
          {movie?.genre && <span className="wpv2-pill">🎭 {movie.genre}</span>}
        </div>

        {/* Synopsis */}
        {description && (
          <div className="wpv2-synopsis-box">
            <h4>Sinopsis</h4>
            <p>{description}</p>
          </div>
        )}

        {/* Detail link */}
        <button
          className="wpv2-detail-btn"
          onClick={() => navigate(`/movie/${movie?.id}`)}
        >
          <MdOutlineLocalMovies size={18} /> Lihat Detail Lengkap
        </button>

        {/* Divider */}
        {recommendations.length > 0 && <div className="wpv2-divider" />}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="wpv2-rec-section">
            <div className="wpv2-rec-header">
              <h3>Selanjutnya</h3>
              <span onClick={() => navigate("/home")}>Lihat Semua</span>
            </div>
            <div className="wpv2-rec-list">
              {recommendations.map((m) => {
                const mPoster = storageUrl(m.poster_url || m.poster)
                  || `https://placehold.co/100x140/12121f/e94560?text=${encodeURIComponent(m.title)}`
                const mYear = m.release_date ? m.release_date.slice(0, 4) : (m.year || "")
                return (
                  <div
                    key={m.id}
                    className="wpv2-rec-item"
                    onClick={() => navigate(`/watch/${m.id}`)}
                  >
                    <div className="wpv2-rec-item__thumb">
                      <img
                        src={mPoster}
                        alt={m.title}
                        onError={(e) => {
                          e.target.src = `https://placehold.co/100x140/12121f/e94560?text=${encodeURIComponent(m.title)}`
                        }}
                      />
                      <div className="wpv2-rec-item__play-icon">
                        <BsFillPlayFill size={18} />
                      </div>
                    </div>
                    <div className="wpv2-rec-item__info">
                      <p className="wpv2-rec-item__title">{m.title}</p>
                      <div className="wpv2-rec-item__meta">
                        {m.rating && (
                          <span><AiFillStar color="#ffd700" size={11} /> {m.rating}</span>
                        )}
                        {mYear && <span>• {mYear}</span>}
                        {m.genre && <span>• {m.genre}</span>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        <div style={{ height: 32 }} />
      </div>
    </div>
  )
}

export default WatchMovie
