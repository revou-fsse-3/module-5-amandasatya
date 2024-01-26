import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PokemonSearch from "./";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("usePokemonDetails", () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            /* mock response data */
          }),
      })
    );
    (global as any).fetch = fetchMock;
  });

  test("PokemonSearch renders correctly", () => {
    render(<PokemonSearch />);
    expect(screen.getByPlaceholderText("Search Here")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  test("PokemonSearch fetches and displays search result", async () => {
    render(<PokemonSearch />);
    fireEvent.change(screen.getByPlaceholderText("Search Here"), {
      target: { value: "bulbasaur" },
    });

    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });
});
