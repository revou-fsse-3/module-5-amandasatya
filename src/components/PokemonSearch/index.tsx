import React, { useState } from "react";
import usePokemonDetails, { PokemonDataDetail } from "@/hooks/useDetails";
import Link from "next/link";
import { useRouter } from "next/router";

const PokemonSearch: React.FC = () => {
  const router = useRouter();
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
      console.error(error);
      setError("Pokemon Not Found");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      fetchData();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-white">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search Here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-slate-400 placeholder-white rounded-md p-2"
          onBlur={handleSearch}
        />
        <button
          onClick={handleSearch}
          className="bg-red-400 text-white rounded-md w-16"
        >
          Search
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {searchResult && (
        <Link href={`/pokedex/${searchResult.name}`} passHref>
          <div className="flex flex-col p-4">
            <img
              src={
                searchResult.sprites.versions["generation-v"]["black-white"]
                  .animated.front_default
              }
              alt=""
            />
            <h2 className="text-white">{searchResult.name}</h2>
          </div>
        </Link>
      )}
    </div>
  );
};

export default PokemonSearch;
