import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PokemonDataDetail } from "@/hooks/useDetails";
import { Navbar } from "@/components";
import Image from "next/image";

export default function PokemonDetailPage() {
  const router = useRouter();
  const { pokemonname } = router.query;
  const [pokemonData, setPokemonData] = useState<PokemonDataDetail | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      if (`${router.query.id}`) {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${router.query.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch Pokemon details");
          }
          const result: PokemonDataDetail = await response.json();
          console.log(result);
          setPokemonData(result);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [pokemonname]);

  return (
    <>
      <Navbar />
      <div className="relative">
        <Image
          src="/images/1.jpeg"
          alt="background image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          style={{ zIndex: -1 }}
        />
        <div className="min-h-screen z-1">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-white">
              {pokemonData?.name}
            </h1>

            {pokemonData && (
              <div className="flex flex-col justify-center items-center bg-slate-400 mx-auto p-8 rounded-md shadow-md ">
                <img
                  src={
                    pokemonData.sprites.versions["generation-v"]["black-white"]
                      .animated.front_default
                  }
                  alt={pokemonData.name}
                  className="w-40 h-40 object-cover object-center mb-4 "
                />
                <p className="text-xl font-semibold mb-2 ">
                  Pokemon Name: {pokemonData.name}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {pokemonData.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 p-4 rounded-md flex flex-col items-center"
                    >
                      <p className="text-sm text-gray-500">{stat.stat.name}</p>
                      <p className="text-lg font-bold">{stat.base_stat}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
