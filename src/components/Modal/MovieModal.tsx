import { MouseEvent, ChangeEvent, useEffect } from 'react'
import styles from './modal.module.scss'
import { ISearchMovies } from 'types/mymovies.data'
import { searchMoivesState } from 'states/moives'
import { useRecoilState } from 'recoil'
import store from 'storejs'

interface Props {
  toggleModal: () => void
  item: ISearchMovies
}

const Modal = ({ toggleModal, item }: Props) => {
  const { Mark, imdbID } = item
  const [marekdList, setmarkedList] = useRecoilState(searchMoivesState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget
    setmarkedList((prev) => {
      return prev.map((list) => (list.imdbID === imdbID ? { ...list, Mark: checked } : list))
    })
    toggleModal()
  }

  const modalHandler = (e: MouseEvent) => {
    e.preventDefault()
    if (toggleModal && e.target === e.currentTarget) {
      toggleModal()
    }
  }

  useEffect(() => {
    store.clear()
    store.set('MovieList', marekdList)
  }, [marekdList, Mark])

  return (
    <div aria-hidden onClick={modalHandler} className={styles.modalWrap}>
      <div className={styles.modal}>
        <img src={item.Poster} alt={item.Title} />
        {Mark ? (
          <div className={styles.modalButton}>
            <input type='checkbox' checked={Mark} onChange={handleChange} />
            즐겨찾기 해제
          </div>
        ) : (
          <div className={styles.modalButton}>
            <input type='checkbox' checked={Mark} onChange={handleChange} />
            즐겨찾기 추가
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
