import { useNavigate } from "react-router-dom"
import { BsFillPlayFill, BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs"
import { AiFillStar } from "react-icons/ai"
import { storageUrl } from "../services/api"

const MovieCard = ({ movie, bookmarked, onBookmark }) => {
  const navigate = useNavigate()

  // API mengembalikan field: poster_url (path relatif)
  const poster = storageUrl(movie.poster_url || movie.poster)
    || `https://placehold.co/300x450/1a1a2e/2563eb?text=${encodeURIComponent(movie.title)}`

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
      <div className="movie-card__poster">
        <img
          src={poster}
          alt={movie.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://placehold.co/300x450/1a1a2e/2563eb?text=${encodeURIComponent(movie.title)}`
          }}
        />
        <div className="movie-card__overlay">
          <button
            className="play-btn"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/watch/${movie.id}`)
            }}
          >
            <BsFillPlayFill size={24} />
          </button>
          <button
            className="bookmark-btn"
            onClick={(e) => {
              e.stopPropagation()
              onBookmark && onBookmark(movie)
            }}
          >
            {bookmarked ? <BsBookmarkFill size={16} /> : <BsBookmarkPlus size={16} />}
          </button>
        </div>
        {movie.genre && <span className="movie-card__genre">{movie.genre}</span>}
      </div>
      <div className="movie-card__info">
        <h4 className="movie-card__title">{movie.title}</h4>
        <div className="movie-card__meta">
          {movie.rating && (
            <span className="movie-card__rating">
              <AiFillStar color="#ffd700" size={12} /> {movie.rating}
            </span>
          )}
          {(movie.release_date || movie.year) && (
            <span className="movie-card__year">
              {movie.release_date ? movie.release_date.slice(0, 4) : movie.year}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
