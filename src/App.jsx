
import { Outlet } from 'react-router-dom'
import '../src/css/App.css'

import NavBar from './Components/NavBar'
import Footer from './Components/Footer'

function App() {


  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App
