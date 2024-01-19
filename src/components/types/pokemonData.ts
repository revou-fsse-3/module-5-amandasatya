interface PokemonData {
  pokemon_entries: Array<{
    entry_number: number;
    pokemon_species: {
      name: string;
    };
  }>;
}

export default PokemonData;
