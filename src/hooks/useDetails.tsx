import { useEffect, useState } from "react";
import PokemonData from "@/components/types/pokemonData";

export interface PokemonEntry {
  pokemon_species: {
    name: string;
  };
}

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

const usePokemonDetails = (pokemonEntries: PokemonEntry[]) => {
  const [details, setDetails] = useState<PokemonDataDetail[]>([]);
  const [prevPokemonEntries, setPrevPokemonEntries] = useState<PokemonEntry[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      if (
        JSON.stringify(pokemonEntries) !== JSON.stringify(prevPokemonEntries)
      ) {
        const detailsArray: PokemonDataDetail[] = [];
        for (const data of pokemonEntries) {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${data.pokemon_species.name}`
          );
          if (!response.ok) {
            console.error(
              `Failed to fetch details for ${data.pokemon_species.name}`
            );
          }
          const result: PokemonDataDetail = await response.json();
          detailsArray.push(result);
        }
        setDetails(detailsArray);
        setPrevPokemonEntries(pokemonEntries);
      }
    };

    fetchData();
  }, [pokemonEntries, prevPokemonEntries]);

  return { details, setDetails };
};

export default usePokemonDetails;
