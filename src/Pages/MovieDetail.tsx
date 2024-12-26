import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface MovieData {
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genres: Array<{ name: string }>;
  runtime: number;
  overview: string;
  origin_country: string;
  production_companies: Array<{ name: string }>;
  budget: number;
  revenue: number;
  original_title: string;
}

export const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<MovieData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=7f2b454fb9daeb6ecef239e310a4abb2`;
  
  const image = data?.poster_path
    ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
    : "https://via.placeholder.com/500";

  useEffect(() => {
    const getFetch = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const movieData: MovieData = await response.json();
        setData(movieData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    getFetch();
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="bg-black text-white flex">
      <section className="ml-4 mr-4 p-4 mt-3">
        <img className="max-w-md w-full h-92" src={image} alt={data.title} />
      </section>
      <div className="ml-4 mr-4 p-4 mt-3">
        <h1 className="text-white text-5xl font-extrabold pb-4">{data.title}</h1>
        <p className="font-semibold text-md">
          Release <span className="font-thin ml-2 italic">{data.release_date}</span>
        </p>
        <p className="text-4xl p-3 font-extrabold">⭐{data.vote_average.toFixed(1)}</p>
        <br />
        <p className="mb-5 gap-2">
          {data.genres.slice(0, 2).map((genre, index) => (
            <span
              key={index}
              className="bg-gray-300 border font-bold border-gray-200 rounded-lg dark:border-gray-600 p-1 mr-2 w-18 text-black"
            >
              {genre.name}
            </span>
          ))}
        </p>
        <section>
          <p className="border font-bold border-gray-200 rounded-md dark:border-gray-600 p-3 w-56">
            Runtime {data.runtime} mins
          </p>
          <p className="my-4">{data.overview}</p>
        </section>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <section className="text-sm">
          <p className="font-semibold text-md">
            origin country
            <span className="font-thin ml-2 italic">{data.origin_country}</span>
          </p>
          <p className="font-semibold text-md">
            Production
            <span className="font-thin ml-2 italic">
              {data.production_companies[0]?.name}
            </span>
          </p>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <p className="font-semibold text-md">
            Budget <span className="font-thin ml-2 italic">{data.budget}</span>
          </p>
          <p className="font-semibold text-md">
            Revenue <span className="font-thin ml-2 italic">{data.revenue}</span>
          </p>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <p className="font-semibold text-md">
            Origin Country
            <span className="font-thin ml-2 italic">{data.origin_country}</span>
          </p>
          <p className="font-semibold text-md">
            Original Title
            <span className="font-thin ml-2 italic">{data.original_title}</span>
          </p>
        </section>
      </div>
    </div>
  );
};