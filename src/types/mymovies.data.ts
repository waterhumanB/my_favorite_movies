interface ISearchItem {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface IMovie {
  Search: ISearchItem[]
  totalResults: string
  Response: string
}
