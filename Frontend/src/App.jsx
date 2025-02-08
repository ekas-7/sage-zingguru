import { Routes,Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Landing from './Pages/Landing'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Login from './Pages/Login'


function App() {
  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Provider>
    </div>
  )
}

export default App