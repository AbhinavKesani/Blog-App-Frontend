import { useAuth } from "../store/authStore";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser, isAuthenticated, loading } = useAuth();

  /* =========================
     LOADING STATE
  ========================= */
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        Checking authentication...
      </div>
    );
  }

  /* =========================
     NOT LOGGED IN
  ========================= */
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /* =========================
     ROLE BASED ACCESS CONTROL
  ========================= */
  const userRole = currentUser?.role;

  if (allowedRoles?.length && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  /* =========================
     ACCESS GRANTED
  ========================= */
  return children;
}

export default ProtectedRoute;
