import { useSearchParams } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import { Card } from "../Components/Card";

export const Search = ({ apipath }: { apipath: string }) => {
  const [searchParams] = useSearchParams();
  const queryT = searchParams.get("q") || ""; // Default to empty string if no query param
  const { data: Movies = [] } = useFetch(apipath, queryT); // Provide default empty array

  return (
    <>
      <section>
        <p className="text-3xl font-bold text-gray-50 ml-4 mb-7 mt-3">{queryT ? `Showing results for "${queryT}"` : "No search query provided"}</p>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Movies.length > 0 ? (
          Movies.map((Movie: any) => (
            <Card key={Movie.id} Movie={Movie} />
          ))
        ) : (
          <p className="text-2xl font-bold text-gray-50 ml-4 mb-7 mt-3" >No results found</p>
        )}
      </div>
    </>
  );
};
