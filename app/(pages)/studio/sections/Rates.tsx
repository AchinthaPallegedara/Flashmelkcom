import React from "react";
import PriceColums from "./PriceColums";

const Rates = () => {
  return (
    <section className="container mt-20">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-7xl font-anton text-center">
          Affordable Rates, Endless
          <br />
          Possibilities.
        </h2>
        <p className="text-xl font-medium w-[60vw] text-center mt-5">
          Our studio space is tailored for professionals and creators who need a
          flexible and affordable setup. Whether you’re shooting a portfolio,
          holding a workshop, or filming, our studio offers a comfortable and
          inspiring environment.
        </p>
      </div>
      <PriceColums />
    </section>
  );
};

export default Rates;
