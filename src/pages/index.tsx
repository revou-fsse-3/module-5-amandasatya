import Image from "next/image";
import { Inter } from "next/font/google";
import background from "../images/peakpx.jpg";
import { Navbar } from "@/components";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="flex flex-col items-center justify-between">
        <div className="relative w-full">
          <div className="absolute -z-10 w-full h-full min-h-screen">
            <Image
              src="/images/1.jpeg"
              alt="background image"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <div className="flex flex-col justify-center items-center m-10 pt-32  gap-5">
            <h1 className="flex justify-start text-white text-xl lg:text-6xl md:text-6xl lg:mx-10 font-sans font-extrabold mx-2">
              Pokemon World RPS Game
            </h1>
            <h1 className="text-white text-wrap font-serif font-bold mx-10 lg:text-md">
              The best rock paper scissor pokemon game
            </h1>
            <button className="bg-red-500 rounded-lg w-24 p-2 mx-10 text-white">
              Play Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
