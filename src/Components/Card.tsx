
import { Link } from "react-router-dom";
import noimage from '../assets/images/noimage.jpg';

interface MovieProps {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  release_date:string;
}

interface CardProps {
  Movie: MovieProps;
}

export const Card = ({ Movie }: CardProps) => {
  const { id, title, overview, vote_average, poster_path,release_date } = Movie;
  const rdate = release_date.replace("-"," ");
  const image = `https://image.tmdb.org/t/p/w400/${poster_path}`;
  const vote = vote_average.toFixed(1);

  return (
    <>
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-indigo-950 dark:border-gray-700 h-full max-w-sm mx-auto ml-2 mr-2 mt-2">  {/* Added m-4 for margin */}
      <div className="flex-shrink-0">
        <Link to={`/Movie/${id}`}>
          <img className="max-w-md w-full h-128 object-cover" src={image} alt={noimage} />
        </Link>
      </div>
      <div className="p-5 flex-grow flex flex-col h-72">
        <Link to={`/Movie/${id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p className="mt-0 text-xs text-gray-500 font-bold mb-1">{rdate}</p>
        </Link>
        <p className="mb-0.5 text-13px text-gray-700 dark:text-gray-400 flex-grow overflow-hidden">{overview}</p>
        <div className="mt-auto border-1 border-y-indigo-900 p-2 rounded-md">
            <p className="text-gray-300 font-extrabold text-2xl">⭐ {vote}</p>
        </div>
      </div>
    </div>

    </>
  )
}
