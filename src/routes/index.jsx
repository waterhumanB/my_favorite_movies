import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'
import MyMovies from './MyMoives'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <Routes>
        <Route path='/' element={<MyMovies />} />
      </Routes>
    </div>
  )
}

export default App
