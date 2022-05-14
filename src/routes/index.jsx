import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import MyMovies from './MyMoives'

const App = () => {
  return (
    <div className={styles.app}>
      <RecoilRoot>
        <div className={styles.appWrapper}>
          <Routes>
            <Route path='/' element={<MyMovies />} />
          </Routes>
        </div>
      </RecoilRoot>
    </div>
  )
}

export default App
