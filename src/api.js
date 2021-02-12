import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        "api_key":"66504ad4994ed34286632b191cb97174",
        "language":"de"
    }
})

export const trendApi = {
    trendMovie: () => api.get("/trending/movie/week"),
    trendTV: () => api.get("/trending/tv/week"),
    trendPerson: () => api.get("/trending/person/day"),
}

export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    movieDetail: id => api.get(`movie/${id}`, {
        params: {
            append_to_response: 'videos'
        }
    }),
    search: term => api.get("search/movie", {
        params: {
            query: encodeURIComponent(term)
        }
    })
}

export const tvApi = {
    topRated: () => api.get("tv/top_rated"),
    popular: () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today"),
    showDetail: id => api.get(`tv/${id}`, {
        params: {
            append_to_response: 'videos'
        }
    }),
    search: term => api.get("search/tv", {
        params: {
            query: encodeURIComponent(term)
        }
    })
}


export default api;