import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useThemeContext } from "../hooks/useThemeContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { color } = useThemeContext();

  return (
    <nav className={styles.navbar} style={{ background: color }}>
      <ul>
        <li className={styles.title}>myMoney</li>
        {!user ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        ) : (
          <>
            <li>hello, {user.displayName}</li>
            <li>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
