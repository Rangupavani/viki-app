import { useState, useEffect } from "react";
import api from "../services/api";
import DramaCard from "../components/DramaCard";

function Dramas() {
  const [dramas, setDramas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [episodeFilter, setEpisodeFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  useEffect(() => {
    getDramas();
  }, []);

  async function getDramas() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/dramas");
      setDramas(response.data);
    } catch (error) {
      console.error("Error fetching dramas:", error);
      setError("Something went wrong. Please check your server.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (loggedInUser?.role !== "admin") {
      alert("Only the app owner and team can delete dramas.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this drama?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/dramas/${id}`);

      const updatedDramas = dramas.filter(
        (drama) => drama.id !== id
      );

      setDramas(updatedDramas);
    } catch (error) {
      console.error("Error deleting drama:", error);
    }
  }

  const filteredDramas = dramas.filter((drama) => {
    const matchesCategory =
      selectedCategory === "All" ||
      drama.country === selectedCategory;

    const matchesSearch = drama.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    let matchesEpisodes = true;

    if (episodeFilter === "Short") {
      matchesEpisodes = drama.episodes <= 12;
    }

    if (episodeFilter === "Medium") {
      matchesEpisodes =
        drama.episodes >= 13 && drama.episodes <= 24;
    }

    if (episodeFilter === "Long") {
      matchesEpisodes = drama.episodes >= 25;
    }

    return matchesCategory && matchesSearch && matchesEpisodes;
  });

  const sortedDramas = [...filteredDramas].sort((a, b) => {
    if (sortOption === "highest") {
      return b.rating - a.rating;
    }

    if (sortOption === "lowest") {
      return a.rating - b.rating;
    }

    if (sortOption === "az") {
      return a.title.localeCompare(b.title);
    }

    if (sortOption === "za") {
      return b.title.localeCompare(a.title);
    }

    return 0;
  });

  return (
    <main>
      <h1>Popular Dramas</h1>

      {loading && <h2 className="loading">Loading dramas...</h2>}

      {error && <h2 className="error-message">{error}</h2>}

      {!loading && !error && (
        <>
          <input
            className="search-input"
            type="text"
            placeholder="Search dramas..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <select
            className="sort-select"
            value={episodeFilter}
            onChange={(e) => setEpisodeFilter(e.target.value)}
          >
            <option value="All">All Episodes</option>
            <option value="Short">Short</option>
            <option value="Medium">Medium</option>
            <option value="Long">Long</option>
          </select>

          <select
            className="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>

          <div className="category-buttons">
            <button
              className={
                selectedCategory === "All"
                  ? "active-category"
                  : ""
              }
              onClick={() => setSelectedCategory("All")}
            >
              All
            </button>

            <button
              className={
                selectedCategory === "Korea"
                  ? "active-category"
                  : ""
              }
              onClick={() => setSelectedCategory("Korea")}
            >
              K-Dramas
            </button>

            <button
              className={
                selectedCategory === "China"
                  ? "active-category"
                  : ""
              }
              onClick={() => setSelectedCategory("China")}
            >
              C-Dramas
            </button>

            <button
              className={
                selectedCategory === "Japan"
                  ? "active-category"
                  : ""
              }
              onClick={() => setSelectedCategory("Japan")}
            >
              J-Dramas
            </button>

            <button
              className={
                selectedCategory === "Thailand"
                  ? "active-category"
                  : ""
              }
              onClick={() => setSelectedCategory("Thailand")}
            >
              Thai Dramas
            </button>

            <button
              className={
                selectedCategory === "Anime"
                  ? "active-category"
                  : ""
              }
              onClick={() => setSelectedCategory("Anime")}
            >
              Anime
            </button>
          </div>

          {sortedDramas.length === 0 ? (
            <h2 className="no-results">😞 No dramas found.</h2>
          ) : (
            <div className="dramas-container">
              {sortedDramas.map((drama) => (
                <DramaCard
                  key={drama.id}
                  drama={drama}
                  onDelete={handleDelete}
                  showActions={loggedInUser?.role === "admin"}
                />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Dramas;