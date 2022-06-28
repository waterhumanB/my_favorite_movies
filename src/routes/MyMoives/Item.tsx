import { ISearchMovies } from 'types/mymovies.data'
import styles from './Item.module.scss'
import { useState, useCallback } from 'react'
import Modal from '../../components/Modal/MovieModal'

interface Props {
  item: ISearchMovies
}

const Item = ({ item }: Props) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false)

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
          <div>
            <img src={item.Poster} alt='noPoster' />
          </div>
          <div className={styles.movieInfo}>
            <h3>{item.Title}</h3>
            <div>{item.Year}</div>
            <div>{item.Type}</div>
          </div>
        </button>
      </li>
      {isOpenModal && <Modal toggleModal={ToggleModal} item={item} />}
    </>
  )
}

export default Item
