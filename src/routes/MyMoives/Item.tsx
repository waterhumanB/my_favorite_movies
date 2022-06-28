import { ISearchMovies } from 'types/mymovies.data'
import styles from './Item.module.scss'
import { useState, useCallback } from 'react'
import Modal from '../../components/Modal/MovieModal'
import store from 'storejs'

import { ReactComponent as Mark30 } from 'assets/img/mark-30.svg'
import Picture from 'assets/img/picture.svg'

import { cx } from 'styles'

interface Props {
  item: ISearchMovies
}

const Item = ({ item }: Props) => {
  const { Poster, Title, Year, Type, imdbID } = item
  const [isOpenModal, setOpenModal] = useState<boolean>(false)
  const markedMovieList = store.get('MovieList' || [])

  const isMarked = () => {
    return markedMovieList.find((data: ISearchMovies) => data.imdbID === imdbID)
  }

  const handleImgError = (e: { currentTarget: { src: string } }, img: string): void => {
    e.currentTarget.src = img
  }

  const ToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal)
  }, [isOpenModal])

  const modal = () => {
    setOpenModal(!isOpenModal)
  }

  return (
    <>
      <li className={styles.movie}>
        <button style={{ display: 'flex' }} type='button' onClick={modal}>
          <img src={Poster} alt='MoviePoster' onError={(e) => handleImgError(e, Picture)} />
          <div className={styles.movieInfo}>
            <Mark30 className={cx({ [styles.mark]: isMarked() })} />
            <h3>{Title}</h3>
            <div>{Year}</div>
            <div>{Type}</div>
          </div>
        </button>
      </li>
      {isOpenModal && <Modal toggleModal={ToggleModal} item={item} />}
    </>
  )
}

export default Item
