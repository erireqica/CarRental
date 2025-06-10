import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout, hasPermission, setIsLoginModalOpen } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navLinkStyle = (path) =>
    `px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
      pathname === path
        ? 'bg-white text-blue-600 shadow'
        : 'text-white hover:bg-blue-500 hover:shadow-sm'
    }`;

  const renderDashboardLink = () => {
    if (user && hasPermission('super_admin')) {
      return <Link to="/users" className={navLinkStyle('/users')}>Dashboard</Link>;
    }
    if (user && hasPermission('admin')) {
      return <Link to="/admin" className={navLinkStyle('/admin')}>Dashboard</Link>;
    }
    return null;
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold text-white tracking-wide">
          AutoRent
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className={navLinkStyle('/')}>Home</Link>
          <Link to="/cars" className={navLinkStyle('/cars')}>Cars</Link>
          <Link to="/about-us" className={navLinkStyle('/about-us')}>About Us</Link>
          {renderDashboardLink()}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-white text-sm">{user.email}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-white hover:underline text-sm font-medium"
              >
                Login
              </button>
              <Link
                to="/signup"
                className={`${navLinkStyle('/signup')} ${pathname !== '/signup' ? 'bg-blue-400' : ''}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
