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
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">No data available</div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="lg:w-1/3">
            <div className="relative">
              <img 
                className="w-full rounded-lg shadow-2xl" 
                src={image} 
                alt={data.title}
              />
              <div className="absolute top-4 right-4 bg-black/80 rounded-full p-3">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-xl">⭐</span>
                  <span className="font-bold text-xl">{data.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">{data.title}</h1>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {data.genres.slice(0, 3).map((genre, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-white/5 rounded-lg">
                  <span className="block text-sm text-gray-400">Release Date</span>
                  <span className="font-medium">{data.release_date}</span>
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-lg">
                  <span className="block text-sm text-gray-400">Runtime</span>
                  <span className="font-medium">{data.runtime} mins</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-3">Overview</h2>
                <p className="text-gray-300 leading-relaxed">{data.overview}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="block text-sm text-gray-400">Production Company</span>
                    <span className="font-medium">{data.production_companies[0]?.name}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-400">Origin Country</span>
                    <span className="font-medium">{data.origin_country}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-400">Original Title</span>
                    <span className="font-medium">{data.original_title}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="block text-sm text-gray-400">Budget</span>
                    <span className="font-medium">{formatCurrency(data.budget)}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-400">Revenue</span>
                    <span className="font-medium">{formatCurrency(data.revenue)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;