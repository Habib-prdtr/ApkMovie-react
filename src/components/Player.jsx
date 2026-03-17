const Player = ({ src, title }) => {
  if (!src) {
    return (
      <div className="player player--empty">
        <p>Video tidak tersedia</p>
      </div>
    )
  }

  // Detect YouTube embed
  const isYoutube =
    src.includes("youtube.com") || src.includes("youtu.be")

  const getYoutubeId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[7].length === 11 ? match[7] : false
  }

  if (isYoutube) {
    const videoId = getYoutubeId(src)
    return (
      <div className="player player--iframe">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div className="player player--video">
      <video controls autoPlay src={src} title={title}>
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default Player
