import { useEffect, useState } from "react";
import api from "../services/api";
import DramaCard from "../components/DramaCard";

function Home() {
  const [popularDramas, setPopularDramas] = useState([]);

  useEffect(() => {
    getPopularDramas();
  }, []);

  async function getPopularDramas() {
    try {
      const response = await api.get("/dramas");

      const topRated = response.data.filter(
        (drama) => drama.rating >= 9
      );

      setPopularDramas(topRated);
    } catch (error) {
      console.error("Error fetching dramas:", error);
    }
  }

  return (
    <main>
      <h1>Viki Streaming App</h1>

      <p>
        Watch Korean, Chinese and Japanese dramas
      </p>

      <h2>Popular Dramas</h2>

      <div className="slider-container">
        {popularDramas.map((drama) => (
          <div
            className="slider-card"
            key={drama.id}
          >
            <DramaCard drama={drama} showActions={false} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;