import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const count = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <img src="/logo.jpg" width="100" alt="logo" />
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/books">Books</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>

            {/* ADMIN ONLY */}
            {user?.role === "admin" && (
              <li className="nav-item">
                <NavLink className="nav-link text-danger fw-bold" to="/admin">
                  Admin
                </NavLink>
              </li>
            )}

            {/* NOT LOGGED IN */}
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Signup</NavLink>
                </li>
              </>
            )}

            {/* LOGGED IN */}
            {user && (
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>

          <NavLink className="btn btn-outline-primary" to="/cart">
            Cart ({count})
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
