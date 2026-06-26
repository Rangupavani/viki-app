import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../features/favoriteSlice";

function DramaCard({ drama, onDelete, showActions = true }) {
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state) => state.favorites
  );

  const isFavorite = favorites.some(
    (favoriteDrama) => favoriteDrama.id === drama.id
  );

  function handleFavorite() {
    if (isFavorite) {
      alert("This drama is already in favorites.");
      return;
    }

    dispatch(addFavorite(drama));
    alert("Added to favorites.");
  }

  return (
    <div className="card">
      <img src={drama.image} alt={drama.title} />

      <div className="card-content">
        <h3>{drama.title}</h3>

        <p>{drama.country}</p>

        <p>{drama.genre}</p>

        <p>⭐ {drama.rating}</p>

        <Link className="view-btn" to={`/dramas/${drama.id}`}>
          View Details
        </Link>

        <button
          className="favorite-btn"
          onClick={handleFavorite}
        >
          {isFavorite ? "Added" : "Add Favorite"}
        </button>

        {showActions && (
          <>
            <Link className="edit-btn" to={`/edit-drama/${drama.id}`}>
              Edit
            </Link>

            <button
              className="delete-btn"
              onClick={() => onDelete && onDelete(drama.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default DramaCard;