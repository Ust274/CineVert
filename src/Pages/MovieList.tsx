// import { useState, useEffect } from "react";
import { Card } from "../Components/Card";
import { useFetch } from "../Hooks/useFetch";


// interface Movie {
//   id: number;
//   title: string;
//   overview: string;
//   vote_average: number;
//   poster_path: string;
// }

export const MovieList = ({ apipath }: { apipath: string }) => {
  const { data: Movies} = useFetch(apipath);

 


  return (
    <>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-7">
      {Movies.map((Movie) => (
        <Card key={Movie.id} Movie={Movie} />
      ))}
    </div>
  
  </>
  )
};
