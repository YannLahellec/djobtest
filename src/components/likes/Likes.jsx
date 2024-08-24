import "./likes.css";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Likes({ movie }) {
  const [likesActive, setLikesActive] = useState(false);
  const [dislikesActive, setDislikesActive] = useState(false);
  const [likeCount, setLikesCount] = useState(movie.likes);
  const [dislikeCount, setDislikeCount] = useState(movie.dislikes);

  const handleLikes = () => {
    if (likesActive) {
      setLikesActive(false);
      setLikesCount(likeCount - 1);
    } else {
      setLikesActive(true);
      setLikesCount(likeCount + 1);
      if (dislikesActive) {
        setDislikesActive(false);
        setLikesCount(likeCount + 1);
        setDislikeCount(dislikeCount - 1);
      }
    }
  };

  const handleDislikes = () => {
    if (dislikesActive) {
      setDislikesActive(false);
      setDislikeCount(dislikeCount - 1);
    } else {
      setDislikesActive(true);
      setDislikeCount(dislikeCount + 1);
      if (likesActive) {
        setLikesActive(false);
        setDislikeCount(dislikeCount + 1);
        setLikesCount(likeCount - 1);
      }
    }
  };

  return (
    <section className="like-movie-container">
      <button
        type="button"
        onClick={handleLikes}
        className={likesActive ? "liked-btn" : null}
      >
        <span className="material-symbols-outlined">thumb_up</span> {likeCount}
      </button>
      <button
        type="button"
        onClick={handleDislikes}
        className={dislikesActive ? "disliked-btn" : null}
      >
        <span className="material-symbols-outlined">thumb_down</span>
        {dislikeCount}
      </button>
    </section>
  );
}

Likes.propTypes = {
  movie: PropTypes.shape({
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
  }).isRequired,
};
