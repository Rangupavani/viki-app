import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Dramas from "../pages/Dramas";
import DramaDetails from "../pages/DramaDetails";
import AddDrama from "../pages/AddDrama";
import EditDrama from "../pages/EditDrama";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Favorites from "../pages/Favorites";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/dramas"
        element={
          <ProtectedRoute>
            <Dramas />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dramas/:id"
        element={
          <ProtectedRoute>
            <DramaDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-drama"
        element={
          <ProtectedRoute adminOnly={true}>
            <AddDrama />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-drama/:id"
        element={
          <ProtectedRoute adminOnly={true}>
            <EditDrama />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;