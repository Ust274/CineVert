import { useEffect, useState } from "react";

export const useFetch = (apipath: string, queryT: string = "") => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = "7f2b454fb9daeb6ecef239e310a4abb2";
  const url = `https://api.themoviedb.org/3/${apipath}?api_key=${apiKey}&query=${queryT}&_=${new Date().getTime()}`;

  useEffect(() => {
    async function GetMovie() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const json = await response.json();
        setData(json.results || []); // Ensure results field exists or default to empty array
      } catch (error) {
        setError((error as Error).message);
        setData([]); // Reset data in case of error
      } finally {
        setLoading(false);
      }
    }

    if (apipath) {
      GetMovie();
    }
  }, [apipath, queryT]); // Use apipath and queryT in dependency array instead of url

  return {
    data,
    loading,
    error,
  };
};





