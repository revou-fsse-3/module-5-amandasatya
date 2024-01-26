import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./";

test("Navbar renders correctly", () => {
  render(<Navbar />);

  expect(screen.getByAltText("Pokemon Logo")).toBeInTheDocument();

  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Pokemon Battle/i)).toBeInTheDocument();
  expect(screen.getByText(/Pokedex/i)).toBeInTheDocument();
  expect(screen.getByText(/Register/i)).toBeInTheDocument();
  expect(screen.getByText(/Log in/i)).toBeInTheDocument();
});
