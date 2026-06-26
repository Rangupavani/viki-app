import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();

  const favorites = useSelector(
    (state) => state.favorites
  );

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully.");
    navigate("/login");
  }

  return (
    <nav>
      <Link to="/">Home</Link>

      {loggedInUser && (
        <Link to="/dramas">
          Dramas
        </Link>
      )}

      {loggedInUser && (
        <Link to="/favorites">
          Favorites ({favorites.length})
        </Link>
      )}

      {loggedInUser?.role === "admin" && (
        <Link to="/add-drama">
          Add Drama
        </Link>
      )}

      {!loggedInUser && (
        <>
          <Link to="/register">
            Register
          </Link>

          <Link to="/login">
            Login
          </Link>
        </>
      )}

      {loggedInUser && (
        <>
          <span className="user-name">
            Hi, {loggedInUser.name}
          </span>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;