import React, { useEffect, useState } from "react";
import { getGenres, getMovieLists } from "../../services/dataService";
import { MovieCard } from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import "./Home.css";
import "swiper/css";
import "swiper/css/pagination";

const HomeCategory = ["Now Playing", "Popular", "Top Rated", "Upcoming"];

const Home = () => {
  const [data, setData] = useState({});
  const [genres, setGenres] = useState(new Map());

  const getHomeMovieLists = async () => {
    // HomeCategory.map((category) =>
    //   category.toLowerCase().replace(" ", "_")
    // ).forEach(async (category) => {
    //   const res = await getMovieLists(category);
    //   setData({ ...data, [category]: res.data.results });
    // });
    const promises = HomeCategory.map(async (category) => {
      const res = await getMovieLists(category.toLowerCase().replace(" ", "_"));
      return { [category.toLowerCase().replace(" ", "_")]: res.data.results };
    });
    const results = await Promise.all(promises);
    const newData = Object.assign({}, ...results);
    setData(newData);
  };

  const getAllGenres = async () => {
    const genreMap = new Map();
    try {
      const res = await getGenres();
      console.log(res.data.genres);
      res.data.genres.forEach((genre) => genreMap.set(genre.id, genre.name));
      setGenres(genreMap);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getHomeMovieLists();
    getAllGenres();
  }, []);

  return (
    <div id="home">
      <ul className="home-category-list">
        {HomeCategory.map((category) => (
          <>
            <div className="category-container" key={category}>
              <li className="category-item">{category}</li>
              <button>See More &rarr;</button>
            </div>
            <div className="category-list-item">
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 150,
                  },
                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                }}
                modules={[Pagination, Navigation]}
              >
                {data[category.toLowerCase().replace(" ", "_")]?.map(
                  (movie) => (
                    <SwiperSlide key={movie?.id}>
                      <MovieCard movie={movie} genres={genres} />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
          </>
        ))}
      </ul>
    </div>
  );
};

export default Home;
