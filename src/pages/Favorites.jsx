import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../features/favoriteSlice";
import { Link } from "react-router-dom";

function Favorites() {
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state) => state.favorites
  );

  return (
    <main>
      <h1>Favorite Dramas</h1>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <h2>No Favorite Dramas</h2>

          <p>
            Add dramas from the Dramas page.
          </p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((drama) => (
            <div
              key={drama.id}
              className="favorite-card"
            >
              <img src={drama.image} alt={drama.title} />

              <div className="favorite-content">
                <h2>{drama.title}</h2>

                <p>{drama.country}</p>

                <p>{drama.genre}</p>

                <p>⭐ {drama.rating}</p>

                <Link
                  className="view-btn"
                  to={`/dramas/${drama.id}`}
                >
                  View Details
                </Link>

                <button
                  className="remove-favorite-btn"
                  onClick={() =>
                    dispatch(removeFavorite(drama.id))
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Favorites;