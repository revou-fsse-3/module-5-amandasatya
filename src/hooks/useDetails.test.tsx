import { renderHook, act } from "@testing-library/react";
import usePokemonDetails, {
  PokemonEntry,
  PokemonDataDetail,
} from "./useDetails";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("usePokemonDetails", () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
  });

  const pokemonEntries: PokemonEntry[] = [
    { pokemon_species: { name: "bulbasaur" } },
  ];

  const expectedDetails: PokemonDataDetail[] = [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon-species/1/",
      sprites: {
        versions: {
          "generation-v": {
            "black-white": {
              animated: {
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/1.png",
              },
            },
          },
        },
      },
      types: [{ type: { name: "grass" } }],
      stats: [{ base_stat: "45", stat: { name: "hp" } }],
    },
  ];
  it("fetches Pokemon details successfully", async () => {
    fetchMock.mockResolvedValueOnce({
      json: async () => ({ data: pokemonEntries }),
    });
    fetchMock.mockResolvedValueOnce({
      json: async () => ({ data: expectedDetails }),
    });
    const { result } = renderHook(() => usePokemonDetails(pokemonEntries));
    console.log("tes", result);
    act(() => {
      result.current.setDetails(expectedDetails);
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/bulbasaur"
    );
    expect(result.current.details).toEqual(expectedDetails);
  });
  it("handles fetch error", async () => {
    fetchMock.mockResolvedValueOnce({
      json: async () => ({ errors: ["Server error"] }),
    });

    const { result } = renderHook(() => usePokemonDetails(pokemonEntries));

    expect(fetchMock).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/bulbasaur"
    );
    expect(result.current.details).toEqual([]);
  });
});
