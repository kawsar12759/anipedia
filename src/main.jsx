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
import PopularAnime from './Pages/PopularAnime.jsx';
import RecentAnime from './Pages/RecentAnime.jsx';
import UpcomingAnime from './Pages/UpcomingAnime.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/anime/popular",
        element: <PopularAnime></PopularAnime>
      },
      {
        path: "/anime/recent",
        element: <RecentAnime></RecentAnime>
      },
      {
        path: "/anime/upcoming",
        element: <UpcomingAnime></UpcomingAnime>
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
