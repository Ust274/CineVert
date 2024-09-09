import { useFetch } from "../Hooks/useFetch";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const MovieDetail = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [error, setError] = useState(null); // To track errors
  const [loading, setLoading] = useState(true); // To track loading state
  const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=c5e1ebaa4ad306d46d3c67019d707529`;

  const image = data.poster_path
    ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
    : "https://via.placeholder.com/500"; // Fallback image if poster_path is undefined

  useEffect(() => {
    async function getFetch() {
      try {
        setLoading(true); // Set loading to true when fetching starts
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`); // Handle HTTP errors
        }
        
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err.message); // Capture any fetch or JSON parsing errors
      } finally {
        setLoading(false); // Set loading to false when fetching ends
      }
    }
    getFetch();
  }, [url]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if any error occurs
  }

  return (
    <>
      <div className="bg-black text-white flex">
        <section className="ml-4 mr-4 p-4 mt-3">
          <img className="max-w-md w-full h-92" src={image} alt={data.title} />
        </section>
        <div className="ml-4 mr-4 p-4 mt-3">
          <h1 className="text-white text-5xl font-extrabold pb-4">{data.title}</h1>
          <p className="font-semibold text-md"> Release <span span className="font-thin ml-2 italic">{data.release_date}</span></p>
          <p className="text-4xl p-3 font-extrabold">⭐{data.vote_average.toFixed(1)}</p>
          <br />
          <p className="mb-5 gap-2">
            <span className= "bg-gray-300 border font-bold border-gray-200 rounded-lg dark:border-gray-600 p-1 mr-2 w-18 text-black">{data.genres[0].name}</span>
            <span className=" bg-gray-300 border font-bold border-gray-200 rounded-lg dark:border-gray-600 p-1 w-18  text-black" >{data.genres[1].name}</span>
          </p>
          <section>
            <p className="border font-bold border-gray-200 rounded-md dark:border-gray-600 p-3 w-56"> Runtime {data.runtime} mins</p>
            <p className="my-4">{data.overview}</p>
          </section>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <section className="text-sm ">
              <p className="font-semibold text-md"> origin country<span className="font-thin ml-2 italic">{data.origin_country}</span></p>
              <p className="font-semibold text-md"> Production <span className="font-thin ml-2 italic" >{data.production_companies[0].name}</span></p>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <p className="font-semibold text-md"> Budget   <span className="font-thin ml-2 italic">{data.budget}</span></p>
              <p className="font-semibold text-md" > Revenue <span className="font-thin ml-2 italic">{data.revenue}</span>  </p>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <p className="font-semibold text-md"> Origin Country <span className="font-thin ml-2 italic">{data.origin_country}</span> </p>
              <p className="font-semibold text-md" >Original Title  <span className="font-thin ml-2 italic">{data.original_title}</span></p>

          </section>
        </div>
      </div>
    </>
  );
};
