import { ChangeEvent, MouseEvent, useEffect, useState, useCallback } from 'react'
import { movieApi } from '../utils/axios'
import { useRecoilState } from 'recoil'
import { markedMovieState, searchMoivesState } from 'states/moives'
import { InView } from 'react-intersection-observer'
import store from 'storejs'

import styles from './MyMovies.module.scss'
import cx from 'classnames'

import { ReactComponent as Search50 } from 'assets/img/search-50.svg'
import { ReactComponent as Search150 } from 'assets/img/search-150.svg'
import { ReactComponent as Mark60 } from 'assets/img/mark-60.svg'
import Item from './Item'

const NO_RESULT = '검색 결과가 없습니다.'
const NET_ERROR = '현재 검색이 불가능합니다.'
const NO_MARKED = '즐겨찾기 영화가 없습니다.'

const MyMovies = () => {
  const [movieList, setMovieList] = useRecoilState(searchMoivesState)
  const [markedMovie, setMarekdMovie] = useRecoilState(markedMovieState)
  const [errorMessage, setErrorMessage] = useState<string>(NO_RESULT)
  const [searchData, setSearchData] = useState('')
  const [page, setPage] = useState<number>(1)
  const [tap, setTap] = useState(0)
  const [, setInview] = useState(false)

  const serachValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.currentTarget.value)
  }

  const scrollHandler = () => {
    setInview(true)
    setPage((prev) => prev + 1)
  }

  const searchHandler = useCallback(async () => {
    if (!searchData) return
    setErrorMessage(NO_RESULT)
    await movieApi
      .searchApi({ s: searchData, page: String(page) })
      .then((res) => {
        const SearchMovieList = res.data.Search
        if (res.data.Response === 'False') {
          setErrorMessage(NET_ERROR)
          return
        }
        setMovieList((prev) => prev.concat(SearchMovieList.map((list) => ({ ...list }))))
      })
      .catch(() => {
        setErrorMessage(NET_ERROR)
      })
  }, [page, searchData, setMovieList])

  useEffect(() => {
    searchHandler()
  }, [page])

  useEffect(() => {
    setMarekdMovie(store.get('MovieList') || [])
  }, [setMarekdMovie])

  const tapHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    return setTap(Number(e.currentTarget.id))
  }

  return (
    <section className={styles.searchMovie}>
      {tap ? (
        <div className={styles.favorite}>즐겨찾기</div>
      ) : (
        <div className={styles.searchInput}>
          <input type='text' onChange={serachValue} />
          <button type='button' onClick={searchHandler}>
            <Search50 className={styles.search} />
          </button>
        </div>
      )}
      <main>
        <ul className={styles.movieItemList}>
          {tap
            ? (markedMovie.length === 0 && (
                <div className={styles.nomarked}>
                  <Mark60 />
                  <div>{NO_MARKED}</div>
                </div>
              )) ||
              markedMovie?.map((item, index) => <Item key={`movie_${item.imdbID + index}`} item={item} />)
            : (movieList.length === 0 && (
                <div className={styles.nosearch}>
                  <Search150 />
                  <div>{errorMessage}</div>
                </div>
              )) ||
              movieList?.map((item, index) => <Item key={`movie_${item.imdbID + index}`} item={item} />)}
          <InView onChange={scrollHandler} />
        </ul>
      </main>
      <footer className={styles.footer}>
        <button className={cx({ [styles.tap]: !tap })} id='0' onClick={tapHandler} type='button'>
          영화 검색하기
        </button>
        <button className={cx({ [styles.tap]: tap })} id='1' onClick={tapHandler} type='button'>
          내 즐겨찾기
        </button>
      </footer>
    </section>
  )
}

export default MyMovies
