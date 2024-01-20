import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components";

const register = () => {
  return (
    <>
      <Head>
        <title>register</title>
        <meta name="description" content="register to your account" />
      </Head>
      <Navbar />
      <div className="relative">
        <Image
          src="/images/1.jpeg"
          alt="background image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="-z-10"
        />

        <div className="min-h-screen flex items-start justify-center bg-opacity-60 pt-20 bg-black z-1">
          <div className="w-full md:w-2/3 lg:w-1/3 xl:w-1/4 mx-auto">
            <div className="bg-slate-700 h-full flex flex-col justify-center items-center rounded-lg p-6">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                  Register Page
                </h2>
              </div>
              <form className="mt-8 space-y-6" action="#" method="POST ">
                <div className="rounded-md shadow-sm ">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="UserName" className="sr-only">
                      User Name
                    </label>
                    <input
                      id="userName"
                      name="userName"
                      type="text"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="User Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Register
                  </button>
                </div>
              </form>
              <div className="text-sm text-center mt-4">
                <p>
                  Don't have an account?{" "}
                  <Link
                    href={"/login"}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default register;
