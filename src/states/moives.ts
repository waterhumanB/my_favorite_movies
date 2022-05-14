import { atom } from 'recoil'
import { ISearchMovies } from '../types/mymovies.data'

export const searchMoivesState = atom<ISearchMovies[]>({
  key: '#searchmovieState',
  default: [],
})

export const pageState = atom<number>({
  key: '#pageState',
  default: 1,
})
