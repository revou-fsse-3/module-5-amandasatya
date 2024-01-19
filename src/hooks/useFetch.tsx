import { useState, useEffect } from "react";
interface PokemonData {
  name: string;
  url: string;
  pokemon_entries: Array<{
    entry_number: number;
    pokemon_species: {
      name: string;
    };
  }>;
}
function useFetch(url: string) {
  const [pokemonDataDetails, setPokemonDataDetails] = useState<PokemonData>({
    name: "",
    url: "",
    pokemon_entries: [],
  });
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw new Error("error");
        return resp.json();
      })
      .then((respData) => setPokemonDataDetails(respData))
      .catch((err) => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    data,
    pokemonDataDetails,
    isError,
    isLoading,
  };
}
export default useFetch;
