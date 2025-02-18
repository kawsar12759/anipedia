
import { Outlet } from 'react-router-dom'
import '../src/css/App.css'

import NavBar from './Components/NavBar'

function App() {


  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>

    </>
  )
}

export default App
