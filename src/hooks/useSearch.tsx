import React, { useState, useEffect } from "react";
import { PokemonDataDetail } from "./useDetails";
export const UseSearchPokemon = async (query: string) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<PokemonDataDetail | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      if (!searchQuery || searchQuery.trim() === "") {
        return [];
      }

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`
      );
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Pokemon Not Found");
        } else {
          throw new Error("Pokemon Not Found");
        }
      }
      const result: PokemonDataDetail = await response.json();
      setSearchResult(result);
    } catch (error) {
      console.log(error);
      setError("Pokemon Not Found");
    } finally {
      setIsLoading(false);
    }
  };
};
