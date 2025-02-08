import React from 'react'
import {Routes,Route} from 'react-router-dom'

import LandingPage from './pages/LandingPage'

function App() {
  return (
    <div className='bg-red-500'>
      <Routes>
        <Route path='/option' element={<LandingPage/>} />
      </Routes>
    </div>
  )
}

export default App