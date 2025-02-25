
import { Outlet } from 'react-router-dom'
import '../src/css/App.css'
import { register } from 'swiper/element/bundle';
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    register();
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App
