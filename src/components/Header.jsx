import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";

function Header() {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  /* =========================
     LOGOUT HANDLER
  ========================= */
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  /* =========================
     ROLE BASED PROFILE ROUTE
  ========================= */
  const getProfilePath = () => {
    const role = currentUser?.role;

    if (role === "AUTHOR") return "/author-profile";
    if (role === "ADMIN") return "/admin-profile";
    return "/user-profile";
  };

  /* =========================
     ACTIVE LINK STYLE
  ========================= */
  const linkClass = ({ isActive }) =>
    isActive ? "text-blue-600 font-bold" : "text-gray-700";

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-200 shadow-md">
      
      {/* LOGO */}
      <NavLink to="/" className="text-2xl font-bold text-gray-800">
        MyBlog
      </NavLink>

      {/* NAV LINKS */}
      <ul className="flex gap-6 text-lg font-semibold items-center">

        {/* HOME */}
        <li>
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
        </li>

        {/* GUEST USER */}
        {!isAuthenticated && (
          <>
            <li>
              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
            </li>
          </>
        )}

        {/* LOGGED IN USER */}
        {isAuthenticated && (
          <>
            <li>
              <NavLink to={getProfilePath()} className={linkClass}>
                Profile
              </NavLink>
            </li>

            <li className="flex items-center gap-3">
              {currentUser?.profileImageUrl && (
                <img
                  src={currentUser.profileImageUrl}
                  className="rounded-full w-10 h-10 object-cover"
                  alt="profile"
                />
              )}

              <button
                onClick={handleLogout}
                className="hover:text-red-500 transition"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
