import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  if (!loggedInUser) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && loggedInUser.role !== "admin") {
    return (
      <main className="access-denied">
        <h2>Access Denied</h2>
        <p>Only the app owner and team can access this page.</p>
      </main>
    );
  }

  return children;
}

export default ProtectedRoute;