import { ISearchMovies } from 'types/mymovies.data'
import styles from './Item.module.scss'
import { useRecoilState } from 'recoil'
import { searchMoivesState } from 'states/moives'
import { ChangeEvent, useState, useCallback } from 'react'
import Modal from '../../components/Modal/MovieModal'

interface Props {
  item: ISearchMovies
}

const Item = ({ item }: Props) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false)
  const { Mark, imdbID } = item
  const [, setmarkedList] = useRecoilState(searchMoivesState)

  const ToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal)
  }, [isOpenModal])

  const modal = () => {
    setOpenModal(!isOpenModal)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget

    setmarkedList((prev) => {
      return prev.map((list) => (list.imdbID === imdbID ? { ...list, Mark: checked } : list))
    })
  }

  return (
    <>
      <li className={styles.movie}>
        <button style={{ display: 'flex' }} type='button' onClick={modal}>
          <div>
            <img src={item.Poster} alt='' />
          </div>
          <div className={styles.movieInfo}>
            <h3>{item.Title}</h3>
            <div>{item.Year}</div>
          </div>
        </button>
      </li>
      {isOpenModal && <Modal toggleModal={ToggleModal} item={item} />}
    </>
  )
}

export default Item
