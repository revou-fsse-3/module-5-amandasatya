import Image from "next/image";
import { Inter } from "next/font/google";
import background from "../images/peakpx.jpg";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
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
      </div>
    </main>
  );
}
