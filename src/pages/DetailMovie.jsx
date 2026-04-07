import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getMovieDetail, getMovies } from "../services/movieService"
import { storageUrl } from "../services/api"
import { BsArrowLeft, BsFillPlayFill, BsBookmarkPlus, BsBookmarkFill, BsShareFill } from "react-icons/bs"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { MdOutlineLocalMovies } from "react-icons/md"
import MovieCard from "../components/MovieCard"

const DetailMovie = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [bookmarks, setBookmarks] = useState(() => {
    const s = localStorage.getItem("bookmarks")
    return s ? JSON.parse(s) : []
  })
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    setLoading(true)
    setImgLoaded(false)
    getMovieDetail(id)
      .then((res) => {
        const data = res.data.data || res.data
        setMovie(data)
        // Load recommendations (same genre)
        return getMovies()
      })
      .then((res) => {
        const all = res.data.data || res.data
        if (Array.isArray(all)) {
          setRecommendations(all.filter((m) => m.id !== Number(id)).slice(0, 10))
        }
      })
      .catch((err) => console.error(err))
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
      <div className="page center" style={{ background: "#0a0a14" }}>
        <div className="spinner" />
        <p style={{ color: "#555570", fontSize: 14 }}>Memuat film...</p>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="page center">
        <MdOutlineLocalMovies size={56} color="#333" />
        <p style={{ color: "#9090aa" }}>Film tidak ditemukan.</p>
        <button className="btn btn--ghost" onClick={() => navigate(-1)}>Kembali</button>
      </div>
    )
  }

  const poster = storageUrl(movie.poster_url || movie.poster)
    || `https://placehold.co/400x600/12121f/2563eb?text=${encodeURIComponent(movie.title)}`

  const year = movie.release_date
    ? movie.release_date.slice(0, 4)
    : (movie.year || "")

  const description = movie.overview || movie.description || ""

  const ratingNum = parseFloat(movie.rating) || 0
  const stars = Math.round(ratingNum / 2)

  return (
    <div className="detail-page-v2">
      {/* ── HERO BACKDROP ── */}
      <div className="dpv2-hero">
        <img
          src={poster}
          alt={movie.title}
          className={`dpv2-hero__bg ${imgLoaded ? "dpv2-hero__bg--loaded" : ""}`}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            e.target.src = `https://placehold.co/400x600/12121f/2563eb?text=${encodeURIComponent(movie.title)}`
          }}
        />
        {/* Gradient overlays */}
        <div className="dpv2-hero__fade-top" />
        <div className="dpv2-hero__fade-bottom" />

        {/* Top actions */}
        <div className="dpv2-topbar">
          <button className="dpv2-circle-btn" onClick={() => navigate(-1)}>
            <BsArrowLeft size={20} />
          </button>
          <span className="dpv2-topbar__title">Detail Film</span>
          <button className="dpv2-circle-btn" onClick={handleBookmark}>
            {isBookmarked
              ? <BsBookmarkFill size={18} color="var(--accent)" />
              : <BsShareFill size={18} />}
          </button>
        </div>

        {/* Poster card floating */}
        <div className="dpv2-poster-wrap">
          <img
            src={poster}
            alt={movie.title}
            className="dpv2-poster"
            onError={(e) => {
              e.target.src = `https://placehold.co/200x300/12121f/2563eb?text=${encodeURIComponent(movie.title)}`
            }}
          />
          {movie.rating && (
            <div className="dpv2-poster__badge">
              <AiFillStar color="#ffd700" size={12} />
              <span>{movie.rating}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div className="dpv2-body">
        {/* Title & Genre */}
        <div className="dpv2-title-section">
          <div className="dpv2-title-left">
            {movie.genre && <span className="dpv2-genre-tag">{movie.genre}</span>}
            <h1 className="dpv2-title">{movie.title}</h1>
          </div>
          <button className="dpv2-bookmark-btn" onClick={handleBookmark}>
            {isBookmarked
              ? <BsBookmarkFill size={22} color="var(--accent)" />
              : <BsBookmarkPlus size={22} />}
          </button>
        </div>

        {/* Stars & Meta Row */}
        <div className="dpv2-meta-row">
          <div className="dpv2-stars">
            {[1,2,3,4,5].map((s) => (
              s <= stars
                ? <AiFillStar key={s} color="#ffd700" size={16} />
                : <AiOutlineStar key={s} color="#555570" size={16} />
            ))}
            <span className="dpv2-rating-num">{movie.rating}/10</span>
          </div>
          <div className="dpv2-pills">
            {year && <span className="dpv2-pill">📅 {year}</span>}
            {movie.duration && <span className="dpv2-pill">⏱ {movie.duration} min</span>}
            {movie.language && <span className="dpv2-pill">🌐 {movie.language}</span>}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="dpv2-cta">
          <button
            className="dpv2-play-btn"
            onClick={() => navigate(`/watch/${movie.id}`)}
          >
            <BsFillPlayFill size={22} />
            <span>Putar Film</span>
          </button>
          <button className="dpv2-bookmark-outline" onClick={handleBookmark}>
            {isBookmarked ? <BsBookmarkFill size={20} /> : <BsBookmarkPlus size={20} />}
          </button>
        </div>

        {/* Divider */}
        <div className="dpv2-divider" />

        {/* Synopsis */}
        {description && (
          <div className="dpv2-section">
            <h3 className="dpv2-section__title">Sinopsis</h3>
            <p className="dpv2-synopsis">{description}</p>
          </div>
        )}

        {/* Info Grid */}
        <div className="dpv2-info-grid">
          {movie.director && (
            <div className="dpv2-info-item">
              <span className="dpv2-info-label">Sutradara</span>
              <span className="dpv2-info-value">{movie.director}</span>
            </div>
          )}
          {movie.cast && (
            <div className="dpv2-info-item">
              <span className="dpv2-info-label">Pemeran</span>
              <span className="dpv2-info-value">{movie.cast}</span>
            </div>
          )}
          {movie.genre && (
            <div className="dpv2-info-item">
              <span className="dpv2-info-label">Genre</span>
              <span className="dpv2-info-value">{movie.genre}</span>
            </div>
          )}
          {year && (
            <div className="dpv2-info-item">
              <span className="dpv2-info-label">Tahun</span>
              <span className="dpv2-info-value">{year}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        {recommendations.length > 0 && <div className="dpv2-divider" />}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="dpv2-section">
            <div className="dpv2-section__header">
              <h3 className="dpv2-section__title">Film Serupa</h3>
              <span className="dpv2-see-all" onClick={() => navigate("/home")}>Lihat Semua</span>
            </div>
            <div className="dpv2-rec-row">
              {recommendations.map((m) => (
                <div
                  key={m.id}
                  className="dpv2-rec-card"
                  onClick={() => navigate(`/movie/${m.id}`)}
                >
                  <div className="dpv2-rec-card__poster">
                    <img
                      src={storageUrl(m.poster_url || m.poster) || `https://placehold.co/150x220/12121f/2563eb?text=${encodeURIComponent(m.title)}`}
                      alt={m.title}
                      onError={(e) => {
                        e.target.src = `https://placehold.co/150x220/12121f/2563eb?text=${encodeURIComponent(m.title)}`
                      }}
                    />
                    <div className="dpv2-rec-card__play">
                      <BsFillPlayFill size={18} />
                    </div>
                    {m.genre && <span className="dpv2-rec-card__genre">{m.genre}</span>}
                  </div>
                  <p className="dpv2-rec-card__title">{m.title}</p>
                  {m.rating && (
                    <span className="dpv2-rec-card__rating">
                      <AiFillStar color="#ffd700" size={11} /> {m.rating}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ height: 40 }} />
      </div>
    </div>
  )
}

export default DetailMovie
