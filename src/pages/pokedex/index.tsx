import React, { useState } from "react";
import usePokemonDetails from "@/hooks/useDetails";
import Link from "next/link";
import PokemonListSearch from "../../components/PokemonSearch/index";
import Image from "next/image";
import { Navbar } from "@/components";
import PokemonData from "@/components/types/pokemonData";
import Head from "next/head";

interface PokemonListProps {
  pokemonData: PokemonData;
}

export async function getServerSideProps() {
  const res = await fetch("https://pokeapi.co/api/v2/pokedex/2/");
  const pokemons: PokemonData = await res.json();

  return {
    props: {
      pokemonData: pokemons,
    },
  };
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemonData }) => {
  const pokemonDetails = pokemonData.pokemon_entries;

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = pokemonDetails.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startItem = (currentPage - 1) * itemsPerPage;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const paginatedDetails = pokemonDetails.slice(startItem, endItem);

  const details = usePokemonDetails(paginatedDetails);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Head>
        <title>pokedex</title>
        <meta name="pokedex" content="pokedex" />
      </Head>
      <Navbar />
      <div className="relative">
        <Image
          src="/images/1.jpeg"
          alt="background image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="container mx-auto p-4 min-h-screen relative z-1 ">
          <h1 className="text-4xl font-bold mb-6 text-center text-white">
            Choose Your Pokémon
          </h1>
          <PokemonListSearch />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12 mx-20 sm:mx-20 lg:mx-42 xl:mx-72 pt-10 ">
            {details &&
              details?.map((detail, index) => (
                <Link
                  key={index}
                  href={`/pokedex/${
                    pokemonDetails[startItem + index].pokemon_species.name
                  }`}
                  className="flex flex-col justify-center items-center rounded-md text-red-800 bg-slate-200 h-full text-lg font-sans font-bold"
                >
                  <img
                    src={
                      detail.sprites.versions["generation-v"]["black-white"]
                        .animated.front_default
                    }
                    alt={pokemonDetails[startItem + index].pokemon_species.name}
                    className="w-28 h-24 object-cover object-center"
                  />
                  <div className="p-2 ">
                    <p className="text-xl font-bold text-center text-indigo-900 w-full border-b-2 border-slate-500">
                      {pokemonDetails[startItem + index].pokemon_species.name}
                    </p>
                  </div>
                  <div className="text-center pb-2">
                    <h1>Pokemon Type :</h1>
                    {detail.types.map((type, index) => (
                      <span key={index} className="mr-2">
                        #{type.type.name}
                      </span>
                    ))}
                  </div>
                  <button className="flex justify-center items-center text-center bg-slate-500 rounded-b-md w-full text-white p-2">
                    Catch{" "}
                    {pokemonDetails[startItem + index].pokemon_species.name}
                  </button>
                </Link>
              ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-slate-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="bg-slate-500 text-white px-4 py-2 rounded-md"
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default PokemonList;
