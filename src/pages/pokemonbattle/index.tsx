import Image from "next/image";
import { Navbar } from "@/components";
import Head from "next/head";
const pokemonBattle = () => {
  return (
    <>
      <Head>
        <title>Pokemon Battle</title>
        <meta name="description" content="Login to your account" />
      </Head>

      <div className="relative">
        <Image
          src="/images/1.jpeg"
          alt="background image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="-z-10"
        />
        <div className="z-1 min-h-screen flex flex-col justify-start items-center ">
          <Navbar />
          <h1 className="text-white pt-20 text-3xl font-extrabold">
            This Page is Under Construction
          </h1>
        </div>
      </div>
    </>
  );
};
export default pokemonBattle;
