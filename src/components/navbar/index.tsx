import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black p-4">
      <div
        className={`container mx-auto ${
          isMenuOpen ? "h-screen" : ""
        } flex flex-col justify-around items-center relative`}
      >
        <div className="flex items-center">
          <Image
            src="/images/pngegg.png"
            alt="Pokemon Logo"
            width={150}
            height={150}
            className=" w-52 h-24 mr-2 object-cover"
          />
        </div>

        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className={`text-white focus:outline-none ${
              isMenuOpen ? "hidden" : ""
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className={`sm:flex space-x-4 ${
            isMenuOpen
              ? "flex flex-col justify-center items-center w-full h-screen bg-black"
              : "hidden"
          }`}
        >
          <button
            onClick={toggleMenu}
            className={`text-white absolute top-4 right-4 focus:outline-none ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <div className="flex justify-center items-center gap-2">
            <div className="flex justify-center items-center gap-2">
              <Link href={"/"}>
                <div className="text-white py-2 hover:border-b-2 hover:border-red-500">
                  Home
                </div>
              </Link>
              <Link
                href={"/pokemonbattle"}
                className="text-white py-2 hover:border-b-2 hover:border-red-500"
              >
                Pokemon Battle
              </Link>
              <Link href={"/pokedex"}>
                <div className="text-white py-2 hover:border-b-2 hover:border-red-500">
                  Pokedex
                </div>
              </Link>
            </div>
            <Link
              href={"/register"}
              className="text-white py-2 hover:border-b-2 hover:border-red-500"
            >
              Register
            </Link>
            <Link
              href={"/login"}
              className="text-white py-2 hover:border-b-2 hover:border-red-500"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
