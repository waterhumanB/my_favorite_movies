import Item from './Item'
import axios from 'axios'
import { movieApi } from '../utils/axios'
import { useEffect, useState } from 'react'

const MyMovies = () => {
  const [searchData, setSearchData] = useState('')

  const [page, setPage] = useState<number>(1)

  const serachValue = (e: { currentTarget: { value: string } }) => {
    console.log(e.currentTarget.value)
    setSearchData(e.currentTarget.value)
  }

  const searchHandler = async () => {
    await movieApi
      .searchApi({ s: searchData, page: String(page) })
      .then((res: object) => {
        console.log(res)
      })
      .catch((error: object) => {
        console.log(error)
      })
  }

  return (
    <main>
      <section>my favorite movies</section>
      <input onChange={serachValue} />
      <button type='button' onClick={searchHandler}>
        영화검색
      </button>
      <Item />
    </main>
  )
}

export default MyMovies
