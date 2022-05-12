import axios from 'axios'
import { IMovie } from 'types/mymovies.data'

const instance = axios.create({
  baseURL: `http://www.omdbapi.com?apikey=${process.env.REACT_APP_MOVIE_APP_ID}`,
})

interface Params {
  s: string
  page: string
}

export const movieApi = {
  searchApi: (params: Params) =>
    instance.get<IMovie>(``, {
      params,
    }),
}
