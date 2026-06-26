import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddDrama() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    country: "",
    genre: "",
    rating: "",
    episodes: "",
    image: "",
    description: "",
    cast: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newDrama = {
      ...formData,
      rating: Number(formData.rating),
      episodes: Number(formData.episodes),
      cast: formData.cast
        .split(",")
        .map((actor) => actor.trim())
    };

    await api.post("/dramas", newDrama);

    navigate("/dramas");
  }

  return (
    <main>
      <h1>Add Drama</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Drama Title"
          onChange={handleChange}
        />

        <input
          name="country"
          placeholder="Country"
          onChange={handleChange}
        />

        <input
          name="genre"
          placeholder="Genre"
          onChange={handleChange}
        />

        <input
          name="rating"
          placeholder="Rating"
          onChange={handleChange}
        />

        <input
          name="episodes"
          placeholder="Episodes"
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
        />

        <input
          name="cast"
          placeholder="Cast (comma separated)"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <button type="submit">
          Add Drama
        </button>
      </form>
    </main>
  );
}

export default AddDrama;