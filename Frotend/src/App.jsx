import React from 'react'
import {Routes,Route} from 'react-router-dom'

import Home from './pages/Home'

function App() {
  return (
    <div className='bg-red-100'>
      <Routes>
        <Route path="/option" element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App