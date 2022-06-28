import { MouseEvent } from 'react'
import styles from './modal.module.scss'
import { ISearchMovies } from 'types/mymovies.data'
import { markedMovieState } from 'states/moives'
import { useRecoilState } from 'recoil'
import store from 'storejs'

interface Props {
  toggleModal: () => void
  item: ISearchMovies
}

const Modal = ({ toggleModal, item }: Props) => {
  const { imdbID } = item
  const [marekdList, setMarkedList] = useRecoilState(markedMovieState)

  const isMarked = () => {
    return marekdList.find((data: ISearchMovies) => data.imdbID === imdbID)
  }
  const addMovie = () => {
    const newMarkedMovie = isMarked() ? marekdList : [...marekdList, item]

    setMarkedList(newMarkedMovie)
    store.set('MovieList', newMarkedMovie)
  }

  const deleteMovie = () => {
    const newMarkedMovie = marekdList.filter((data) => data.imdbID !== imdbID)

    setMarkedList(newMarkedMovie)
    store.set('MovieList', newMarkedMovie)
  }
  const handleChange = (e: { currentTarget: { name: string } }) => {
    const { name } = e.currentTarget

    if (name === '즐겨찾기 추가') {
      addMovie()
    } else if (name === '즐겨찾기 해제') {
      deleteMovie()
    }

    toggleModal()
  }

  const modalHandler = (e: MouseEvent) => {
    e.preventDefault()
    if (toggleModal && e.target === e.currentTarget) {
      toggleModal()
    }
  }
  return (
    <div aria-hidden onClick={modalHandler} className={styles.modalWrap}>
      <div className={styles.modal}>
        <img src={item.Poster} alt={item.Title} />
        {isMarked() ? (
          <div className={styles.modalButton}>
            <button type='button' name='즐겨찾기 해제' onClick={handleChange}>
              즐겨찾기 해제
            </button>
          </div>
        ) : (
          <div className={styles.modalButton}>
            <button type='button' name='즐겨찾기 추가' onClick={handleChange}>
              즐겨찾기 추가
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
