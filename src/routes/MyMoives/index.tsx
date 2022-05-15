import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import Item from './Item'
import { movieApi } from '../utils/axios'
import { useRecoilState } from 'recoil'
import { searchMoivesState } from 'states/moives'
import styles from './MyMovies.module.scss'
import cx from 'classnames'
import { InView } from 'react-intersection-observer'

import { ReactComponent as Search50 } from 'assets/img/search-50.svg'
import { ReactComponent as Search150 } from 'assets/img/search-150.svg'

const MyMovies = () => {
  const [movieList, setMovieList] = useRecoilState(searchMoivesState)
  const [searchData, setSearchData] = useState('')
  const [page, setPage] = useState<number>(1)
  const [tap, setTap] = useState(0)
  const [inview, setInview] = useState(false)

  const scrollHandler = () => {
    setInview(true)
    setPage(page + 1)
  }

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

  useEffect(() => {
    movieApi
      .searchApi({ s: searchData, page: String(page) })
      .then((res) => {
        const SearchMovieList = res.data.Search
        if (res.data.Response === 'True') {
          setMovieList((prev) => prev.concat(SearchMovieList))
        }
      })
      .catch((error) => {
        alert('안댕')
      })
  }, [inview, page, setMovieList])

  const tapHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    setTap(Number(e.currentTarget.id))
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
            ? movieList
                ?.filter((item) => item.Mark === true)
                .map((item) => <Item key={`movie_${item.imdbID}`} item={item} />)
            : (movieList.length === 0 && (
                <div className={styles.nosearch}>
                  <Search150 />
                  <div>검색결과가 없습니다.</div>
                </div>
              )) ||
              movieList?.map((item, index) => <Item key={`movie_${item.imdbID + index}`} item={item} />)}
          <InView onChange={scrollHandler} />
        </ul>
      </main>
      <section className={styles.footer}>
        <button className={cx({ [styles.tap]: !tap })} id='0' onClick={tapHandler} type='button'>
          영화 검색하기
        </button>
        <button className={cx({ [styles.tap]: tap })} id='1' onClick={tapHandler} type='button'>
          내 즐겨찾기
        </button>
      </section>
    </section>
  )
}

export default MyMovies
