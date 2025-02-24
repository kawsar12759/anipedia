import { StrictMode } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from 'react-dom/client'
import '../src/css/index.css'
import App from './App.jsx'
import Home from './Pages/Home.jsx';
import Favorites from './Pages/Favorites.jsx';
import { AnimeProvider } from './Contexts/AnimeContexts.jsx';
import SearchPage from './Pages/SearchPage.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/favorites",
        element: <Favorites></Favorites>
      },


      {
        path: "/search/:query",
        element: <SearchPage></SearchPage>,
        loader: ({ params }) => fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
          params.query
        )}`)
      },

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AnimeProvider>
      <RouterProvider router={router} />
    </AnimeProvider>
  </StrictMode>,
)
