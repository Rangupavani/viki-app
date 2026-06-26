import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditDrama() {
  const { id } = useParams();
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

  useEffect(() => {
    getDrama();
  }, []);

  async function getDrama() {
    const response = await api.get(`/dramas/${id}`);

    setFormData({
      ...response.data,
      cast: response.data.cast.join(", ")
    });
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const updatedDrama = {
      ...formData,
      rating: Number(formData.rating),
      episodes: Number(formData.episodes),
      cast: formData.cast
        .split(",")
        .map((actor) => actor.trim())
    };

    await api.put(`/dramas/${id}`, updatedDrama);

    navigate("/dramas");
  }

  return (
    <main>
      <h1>Edit Drama</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          name="country"
          value={formData.country}
          onChange={handleChange}
        />

        <input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />

        <input
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />

        <input
          name="episodes"
          value={formData.episodes}
          onChange={handleChange}
        />

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <input
          name="cast"
          value={formData.cast}
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">
          Update Drama
        </button>
      </form>
    </main>
  );
}

export default EditDrama;