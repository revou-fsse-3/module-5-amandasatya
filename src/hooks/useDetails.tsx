import { useEffect, useState } from "react";

export interface PokemonDataDetail {
  name: string;
  url: string;
  sprites: {
    versions: {
      "generation-v": {
        "black-white": {
          animated: {
            front_default: string;
          };
        };
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: string;
    stat: {
      name: string;
    };
  }>;
}

const usePokemonDetails = (pokemonEntries: any[]) => {
  const [details, setDetails] = useState<PokemonDataDetail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const detailsArray: PokemonDataDetail[] = [];
      for (const data of pokemonEntries) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${data.pokemon_species.name}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch details");
        }
        const result: PokemonDataDetail = await response.json();
        detailsArray.push(result);
      }
      setDetails(detailsArray);
    };

    fetchData();
  }, [pokemonEntries]);

  return details;
};

export default usePokemonDetails;
