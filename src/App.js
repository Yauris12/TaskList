import logo from './logo.svg'

import { lazy, Suspense } from 'react'
import './App.css'
import Tasks from './components/views/Tasks/Tasks'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Register } from './components/views/auth/Register'
import Login from './components/views/auth/Login/Login'
import Registered from './components/views/Registered/Registered'

const Error404 = lazy(() => import('./components/views/Error404/Error404'))

const RequireAuth = ({ children }) => {
  if (!localStorage.getItem('token')) {
    return <Navigate to='/login' replace={true} />
  }
  return children
}
const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
}

const App = () => {
  const location = useLocation()

  return (
    <AnimatePresence location={location} key={location.pathname}>
      <Routes>
        <Route
          path='/'
          element={
            <RequireAuth>
              <motion.div
                className='page'
                initial='out'
                animate='in'
                exit='out'
                variants={pageTransition}
              >
                <Tasks />
              </motion.div>
            </RequireAuth>
          }
        />
        <Route
          path='/login'
          element={
            <motion.div
              className='page'
              initial='out'
              animate='in'
              exit='out'
              variants={pageTransition}
            >
              <Login />
            </motion.div>
          }
        />
        <Route
          path='/Register'
          element={
            <motion.div
              className='page'
              initial='out'
              animate='in'
              exit='out'
              variants={pageTransition}
            >
              <Register />
            </motion.div>
          }
        />
        <Route
          path='/Registered/:teamID'
          element={
            <motion.div
              className='page'
              initial='out'
              animate='in'
              exit='out'
              variants={pageTransition}
            >
              <Registered />
            </motion.div>
          }
        />
        <Route
          path='*'
          element={
            <motion.div
              className='page'
              initial='out'
              animate='in'
              exit='out'
              variants={pageTransition}
            >
              <Suspense fallback={<>...</>}>
                <Error404 />
              </Suspense>
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default App
