import "./movie-card.css";
import PropTypes from 'prop-types';
import Likes from "../likes/Likes";

export default function MovieCard({ movie, deleteMovie }) {


  return (
    <section className="movie-card-container">
      <div className="movie-all-container">
        <img src={movie.image} alt="" />
        <div className="info-container">
          <div className="delete-btn-container">
          <button onClick={() => deleteMovie(movie.id)}>
            <span className="material-symbols-outlined">close</span>
          </button>
          </div>
          <h1>{movie.title}</h1>
          <p>{movie.category}</p>
          <Likes movie={movie} />
        </div>
        <div></div>
      </div>
    </section>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  deleteMovie: PropTypes.func.isRequired,
};