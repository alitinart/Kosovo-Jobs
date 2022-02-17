import * as React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <main className="hero pl-5 pr-5">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Find the perfect</span>{" "}
          <span className="block text-indigo-400 transition delay-100 hover:text-indigo-500 xl:inline">
            company to hire you
          </span>
        </h1>
        <p className="mt-3 text-base text-gray-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <Link
              to="/"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white btn btn-primary md:py-4 md:text-lg md:px-10"
            >
              Get started
            </Link>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <Link
              to="/"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md btn btn-secondary md:py-4 md:text-lg md:px-10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
