import { ChangeEvent, useEffect, useState } from 'react'
import { movieApi } from '../utils/axios'
import { useRecoilState } from 'recoil'
import { searchMoivesState } from 'states/moives'
import styles from './MyMovies.module.scss'

const MyFavroite = () => {
  const [movieList, setMovieList] = useRecoilState(searchMoivesState)
  const [searchData, setSearchData] = useState('')
  const [page, setPage] = useState<number>(1)

  const serachValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.currentTarget.value)
  }

  const searchHandler = async () => {
    await movieApi
      .searchApi({ s: searchData, page: String(page) })
      .then((res) => {
        setMovieList(res.data.Search)
        console.log(res.data.Search)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <section className={styles.searchMovie}>
      <div className={styles.searchInput}>
        <input type='text' onChange={serachValue} />
        <button type='button' onClick={searchHandler}>
          영화검색
        </button>
      </div>
      <main>
        {/* <ul className={styles.movieItemList}>
          {(movieList.length === 0 && <div>검색결과 없음</div>) ||
            movieList?.map((item) => <Item key={`movie_${item.imdbID}`} item={item} />)}
        </ul> */}
      </main>
      <footer>
        <button type='button'>Search</button>
        <button type='button'>My Movies</button>
      </footer>
    </section>
  )
}

export default MyFavroite
