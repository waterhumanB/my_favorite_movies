export interface ISearchMovies {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  Mark: boolean
}

export interface IMovie {
  Search: ISearchMovies[]
  totalResults: string
  Response: string
}
