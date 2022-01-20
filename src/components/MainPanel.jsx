import { Routes, Route } from 'react-router-dom'

import MainHeader from './Layout/MainHeader'
import WorkPanel from '../pages/WorkPanel'
import PostPanel from '../pages/PostPanel'
import Dashboard from '../pages/Dashboard'

const MainPanel = () => {
  return (
    <section className='container mx-auto mt-8'>
      <MainHeader />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/works' element={<WorkPanel />} />
        <Route path='/posts' element={<PostPanel />} />
      </Routes>
    </section>
  )
}

export default MainPanel
