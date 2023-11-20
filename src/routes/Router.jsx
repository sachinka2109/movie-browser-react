import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages";
import { Home, Movies, About } from "../pages";
import { MovieDetails } from "../components";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
          children={[
            <React.Fragment key={"dashboard"}>
              <Route key={"home"} index element={<Home />} />
              <Route key={"movies"} path="/movies" element={<Movies />} />
              <Route
                key={"movie-details"}
                path="/movies/:id"
                element={<MovieDetails />}
              />
              <Route key={"about"} path="/about" element={<About />} />
              <Route key={"search"} path="/search" element={<Movies />} />
            </React.Fragment>,
          ]}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
