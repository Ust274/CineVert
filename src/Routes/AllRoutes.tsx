import { Routes,Route } from "react-router-dom";
import { MovieDetail } from "../Pages/MovieDetail";
import { MovieList } from "../Pages/MovieList";
import { Search } from "../Pages/Search";
import { PageNHK } from "../Pages/PageNHK";
import { Contact } from "../Pages/Contact";



export const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<MovieList apipath="movie/now_playing"/>} />
        <Route path="/Movie/:id" element={<MovieDetail />}/>
        <Route path="/Movie/Top" element={<MovieList apipath="movie/top_rated"/>}/>
        <Route path="/Movie/Upcoming" element={<MovieList apipath="movie/upcoming" />}/>
        <Route path="/Movie/Popular" element ={<MovieList apipath="movie/popular"/>}/>
        <Route path="/Search" element={<Search apipath="search/movie"/>}/>
        <Route path="Movie/Contact" element ={<Contact/>}/>
        <Route path="*" element={<PageNHK />}/>
        
    </Routes>
    </>
  )
}

