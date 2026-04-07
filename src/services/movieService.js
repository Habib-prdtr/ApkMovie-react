/* eslint-disable no-unused-vars */
const dummyMovies = [
  {
    id: 1,
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    rating: 8.8,
    genre: "Sci-Fi",
    release_date: "2010-07-16",
    poster_url: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: 2,
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    rating: 8.7,
    genre: "Action",
    release_date: "1999-03-31",
    poster_url: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: 3,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 8.6,
    genre: "Adventure",
    release_date: "2014-11-07",
    poster_url: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MvrIdlsR.jpg",
    video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },
  {
    id: 4,
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    rating: 9.0,
    genre: "Action",
    release_date: "2008-07-18",
    poster_url: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
  },
  {
    id: 5,
    title: "Avengers: Endgame",
    description: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions.",
    rating: 8.4,
    genre: "Action",
    release_date: "2019-04-26",
    poster_url: "https://image.tmdb.org/t/p/w500/or06DP3rTePEK6itlCW1EapZPNi.jpg",
    video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  }
];

export const getMovies = async (params) => {
  return Promise.resolve({ data: { data: dummyMovies } })
}

export const getMovieDetail = async (id) => {
  const movie = dummyMovies.find(m => m.id === parseInt(id)) || dummyMovies[0]
  return Promise.resolve({ data: { data: movie } })
}

export const createMovie = async (data) => {
  return Promise.resolve({ data: { message: "Movie created successfully", data: dummyMovies[0] } })
}

export const updateMovie = async (id, data) => {
  return Promise.resolve({ data: { message: "Movie updated successfully", data: dummyMovies[0] } })
}

export const deleteMovie = async (id) => {
  return Promise.resolve({ data: { message: "Movie deleted successfully" } })
}

export const searchMovies = async (query) => {
  const filtered = dummyMovies.filter(m => m.title.toLowerCase().includes(query?.toLowerCase() || ""))
  return Promise.resolve({ data: { data: filtered } })
}

export const getMoviesByGenre = async (genre) => {
  const filtered = dummyMovies.filter(m => m.genre.toLowerCase() === genre.toLowerCase())
  return Promise.resolve({ data: { data: filtered } })
}

export const getTrendingMovies = async () => {
  return Promise.resolve({ data: { data: dummyMovies.slice(0, 3) } })
}

export const getNewReleases = async () => {
  return Promise.resolve({ data: { data: dummyMovies.slice(-3) } })
}