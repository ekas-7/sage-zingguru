import React from 'react'
import { Routes,Route } from 'react-router-dom'

import MainStudio from '../components/studio/MainStudio'

function Dashboard() {
  return (
    <div className='h-full w-full p-4'>
        <Routes>
            <Route path='/studio' element={<MainStudio/>} />
        </Routes>
    </div>
  )
}

export default Dashboard