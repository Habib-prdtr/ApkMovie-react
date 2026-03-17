const GENRES = ["All", "Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller", "Animation", "Documentary"]

const GenreList = ({ selected, onSelect }) => {
  return (
    <div className="genre-list">
      {GENRES.map((genre) => (
        <button
          key={genre}
          className={`genre-chip ${selected === genre ? "active" : ""}`}
          onClick={() => onSelect(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}

export default GenreList
