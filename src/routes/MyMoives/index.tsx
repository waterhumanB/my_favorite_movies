import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import Item from './Item'
import { movieApi } from '../utils/axios'
import { useRecoilState } from 'recoil'
import { searchMoivesState } from 'states/moives'
import styles from './MyMovies.module.scss'
import cx from 'classnames'

const MyMovies = () => {
  const [movieList, setMovieList] = useRecoilState(searchMoivesState)
  const [searchData, setSearchData] = useState('')
  const [page, setPage] = useState<number>(1)
  const [tap, setTap] = useState(0)

  const serachValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.currentTarget.value)
  }

  const searchHandler = async () => {
    await movieApi
      .searchApi({ s: searchData, page: String(page) })
      .then((res) => {
        const SearchMovieList = res.data.Search
        setMovieList(() => {
          return SearchMovieList.map((list) => ({ ...list, Mark: false }))
        })
      })
      .catch((error) => {
        alert('안댕')
      })
  }

  const tapHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    setTap(Number(e.currentTarget.id))
  }

  return (
    <section className={styles.searchMovie}>
      {tap ? (
        <div className={styles.searchInput}>즐겨찾기</div>
      ) : (
        <div className={styles.searchInput}>
          <input type='text' onChange={serachValue} />
          <button type='button' onClick={searchHandler}>
            영화검색
          </button>
        </div>
      )}
      <main>
        <ul className={styles.movieItemList}>
          {tap
            ? movieList
                ?.filter((item) => item.Mark === true)
                .map((item) => <Item key={`movie_${item.imdbID}`} item={item} />)
            : (movieList.length === 0 && <div>검색결과 없음</div>) ||
              movieList?.map((item, index) => <Item key={`movie_${item.imdbID + index}`} item={item} />)}
        </ul>
      </main>
      <footer>
        <button className={cx({ [styles.tap]: !tap })} id='0' onClick={tapHandler} type='button'>
          Search
        </button>
        <button className={cx({ [styles.tap]: tap })} id='1' onClick={tapHandler} type='button'>
          My Movies
        </button>
      </footer>
    </section>
  )
}

export default MyMovies
