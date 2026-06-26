import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";

function DramaDetails() {
  const { id } = useParams();

  const [drama, setDrama] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDrama();
  }, []);

  async function getDrama() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/dramas/${id}`);
      setDrama(response.data);
    } catch (error) {
      console.error("Error fetching drama:", error);
      setError("Drama not found or server is not running.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2 className="loading">Loading drama...</h2>;
  }

  if (error) {
    return <h2 className="error-message">{error}</h2>;
  }

  return (
    <main>
      <div className="details">
        <img src={drama.image} alt={drama.title} />

        <div className="details-content">
          <h1>{drama.title}</h1>

          <p className="description">
            {drama.description}
          </p>

          <div className="info-item">
            <h3>Country</h3>
            <p>{drama.country}</p>
          </div>

          <div className="info-item">
            <h3>Genre</h3>
            <p>{drama.genre}</p>
          </div>

          <div className="info-item">
            <h3>Episodes</h3>
            <p>{drama.episodes}</p>
          </div>

          <div className="info-item">
            <h3>Rating</h3>
            <p>⭐ {drama.rating}</p>
          </div>

          <div className="info-item">
            <h3>Cast</h3>

            <ul className="cast-list">
              {drama.cast.map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DramaDetails;