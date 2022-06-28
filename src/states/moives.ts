import { ISearchMovies } from '../types/mymovies.data'
import { atom } from 'recoil'

export const searchMoivesState = atom<ISearchMovies[]>({
  key: '#searchmovieState',
  default: [],
})

export const pageState = atom<number>({
  key: '#pageState',
  default: 1,
})

export const markedMovieState = atom<ISearchMovies[]>({
  key: '#markedMovieState',
  default: [],
})
