import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import { BsBookmarkFill } from "react-icons/bs"

const Bookmark = () => {
  const navigate = useNavigate()
  const [bookmarks, setBookmarks] = useState(() => {
    const s = localStorage.getItem("bookmarks")
    return s ? JSON.parse(s) : []
  })

  const handleRemove = (movie) => {
    setBookmarks((prev) => {
      const updated = prev.filter((m) => m.id !== movie.id)
      localStorage.setItem("bookmarks", JSON.stringify(updated))
      return updated
    })
  }

  return (
    <div className="page">
      <header className="page-header">
        <div className="page-header__title">
          <BsBookmarkFill size={22} color="var(--accent)" />
          <h2>Tersimpan</h2>
        </div>
      </header>

      {bookmarks.length === 0 ? (
        <div className="empty-state">
          <BsBookmarkFill size={56} color="#333" />
          <p>Belum ada film yang disimpan</p>
          <button className="btn btn--primary" onClick={() => navigate("/home")}>
            Jelajahi Film
          </button>
        </div>
      ) : (
        <>
          <p className="bookmark-count">{bookmarks.length} film tersimpan</p>
          <div className="movie-grid">
            {bookmarks.map((m) => (
              <MovieCard
                key={m.id}
                movie={m}
                bookmarked={true}
                onBookmark={handleRemove}
              />
            ))}
          </div>
        </>
      )}



    </div>
  )
}

export default Bookmark
