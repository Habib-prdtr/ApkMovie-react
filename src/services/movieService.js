import api from "./api"

export const getMovies = (params) => api.get("/movies", { params })

export const getMovieDetail = (id) => api.get(`/movies/${id}`)

export const createMovie = (data) => api.post("/movies", data)

export const updateMovie = (id, data) => api.put(`/movies/${id}`, data)

export const deleteMovie = (id) => api.delete(`/movies/${id}`)

export const searchMovies = (query) => api.get("/movies", { params: { search: query } })

export const getMoviesByGenre = (genre) => api.get("/movies", { params: { genre } })

export const getTrendingMovies = () => api.get("/movies", { params: { sort: "trending" } })

export const getNewReleases = () => api.get("/movies", { params: { sort: "new" } })