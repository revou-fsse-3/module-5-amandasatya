import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import supabase from "@/config/supabaseClient";
import { Navbar } from "@/components";
import { useEffect, useState } from "react";
interface loginData {
  email: string;
  password: string;
}

const Login = () => {
  const [loginData, setLoginData] = useState<loginData | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("storedEmail");
    const storedPassword = localStorage.getItem("storedPassword");

    if (storedEmail && storedPassword) {
      setLoginData({ email: storedEmail, password: storedPassword });
      setEmail(storedEmail);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let { data: login, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(login);
      if (error) {
        console.error("Supabase login error:", error);
        setFetchError("Can't login");
        return;
      }

      if (login) {
        setLoginData({ email, password });
        localStorage.setItem("storedEmail", email);
        localStorage.setItem("storedPassword", password);

        const session = login?.session;
        if (session) {
          const token = session.access_token;
          if (token) {
            localStorage.setItem("accessToken", token);
          }
        }
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setFetchError("An error occurred during login");
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login to your account" />
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
                  Log in to your account
                </h2>
              </div>
              <form
                className="mt-8 space-y-6"
                action="#"
                method="POST"
                onSubmit={handleLogin}
              >
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Log in
                  </button>
                </div>
              </form>
              <div className="text-sm text-center mt-4">
                <p>
                  Don't have an account?{" "}
                  <Link
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign up
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

export default Login;
