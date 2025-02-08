import React from 'react'
import {Routes,Route} from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className='h-screen w-full'>
      <Routes>
        <Route path='/landing-page' element={<LandingPage/>} />
        <Route path='/dashboard/*' element={<Dashboard/>} />
      </Routes> 
    </div>
  )
}

export default App