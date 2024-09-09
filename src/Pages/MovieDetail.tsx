
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Define interfaces for movie data
interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  name: string;
}

interface MovieData {
  title: string;
  release_date: string;
  vote_average: number;
  poster_path?: string;
  genres: Genre[];
  runtime: number;
  overview: string;
  origin_country: string[];
  production_companies: ProductionCompany[];
  budget: number;
  revenue: number;
  original_title: string;
}

export const MovieDetail = () => {
  const params = useParams<{ id: string }>(); // Specify the type for useParams
  const [data, setData] = useState<MovieData | null>(null); // Use MovieData type or null
  const [error, setError] = useState<string | null>(null); // Use string type or null
  const [loading, setLoading] = useState<boolean>(true); // Use boolean type
  const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=c5e1ebaa4ad306d46d3c67019d707529`;

  const image = data?.poster_path
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

        const data: MovieData = await response.json(); // Use MovieData type for the response
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred"); // Capture any fetch or JSON parsing errors
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
          <img className="max-w-md w-full h-92" src={image} alt={data?.title} />
        </section>
        <div className="ml-4 mr-4 p-4 mt-3">
          <h1 className="text-white text-5xl font-extrabold pb-4">{data?.title}</h1>
          <p className="font-semibold text-md"> Release <span className="font-thin ml-2 italic">{data?.release_date}</span></p>
          <p className="text-4xl p-3 font-extrabold">⭐{data?.vote_average.toFixed(1)}</p>
          <br />
          <p className="mb-5 gap-2">
            {data?.genres.map((genre) => (
              <span key={genre.id} className="bg-gray-300 border font-bold border-gray-200 rounded-lg dark:border-gray-600 p-1 mr-2 w-18 text-black">
                {genre.name}
              </span>
            ))}
          </p>
          <section>
            <p className="border font-bold border-gray-200 rounded-md dark:border-gray-600 p-3 w-56"> Runtime {data?.runtime} mins</p>
            <p className="my-4">{data?.overview}</p>
          </section>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <section className="text-sm">
            <p className="font-semibold text-md"> Origin Country <span className="font-thin ml-2 italic">{data?.origin_country.join(", ")}</span></p>
            <p className="font-semibold text-md"> Production <span className="font-thin ml-2 italic">{data?.production_companies[0]?.name}</span></p>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <p className="font-semibold text-md"> Budget <span className="font-thin ml-2 italic">{data?.budget}</span></p>
            <p className="font-semibold text-md"> Revenue <span className="font-thin ml-2 italic">{data?.revenue}</span></p>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <p className="font-semibold text-md"> Original Title <span className="font-thin ml-2 italic">{data?.original_title}</span></p>
          </section>
        </div>
      </div>
    </>
  );
};
