import "./home.css";
import { useEffect, useState } from "react";
import MovieCard from "../../components/moviecard/MovieCard";
import { movies$ } from "../../Etude-de-cas-front-movies-data";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tabfilter, setTabfilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(4);
  const [paginationSelect, setPaginationSelect] = useState("");

  useEffect(() => {
    movies$.then((data) => setMovies(data));
  }, []);

  // delete movies function
  function deleteMovie(movieId) {
    setMovies(movies.filter((movie) => movieId !== movie.id));
  }

  //show categories wihout duplicates
  movies.forEach((movie) => {
    if (!categories.includes(movie.category))
      setCategories([...categories, movie.category]);
  });

  const handleSearch = (e) => setTabfilter(e.target.value);

  //erase categorie if there is no longer a movie with said category
  const filteredCategories = categories.filter((category) =>
    movies.find((movie) => movie.category === category)
  );

  //filter movies by category
  let filteredMovies = movies.filter(
    (movieCategory) => tabfilter === movieCategory.category
  );

  if (tabfilter === "") filteredMovies = movies;

  // pagination for the movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovie = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleBeforePage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlePaginationSelect = (e) => {
    setPaginationSelect(e.target.value)
    if(paginationSelect === "") {
      setPaginationSelect(4);
    } else {
      setMoviesPerPage(Number(paginationSelect))
    }
  };


  return (
    <section>
      <div className="multi-select-container">
        <select id="category" onChange={handleSearch}>
          <option value="">Select category</option>
          {filteredCategories.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <section className="all-cards">
        {currentMovie.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} deleteMovie={deleteMovie} />
          </div>
        ))}
      </section>
      <section className="pagination-container">
        <div className="btn-pagination">
          {currentPage > 1 ? (
            <button onClick={handleBeforePage}>Antérieur</button>
          ) : null}
          {currentPage < movies.length - 1 ? <button onClick={handleNextPage}>Suivant</button> : null}
        </div>
        <div className="multi-select-page">
          <select name="" id="" onChange={handlePaginationSelect}>
            <option value="">Select</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>
      </section>
    </section>
  );
}
