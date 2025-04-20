import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const { pathname } = useLocation();

  const navLinkStyle = (path) =>
    `px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
      pathname === path
        ? 'bg-white text-blue-600 shadow'
        : 'text-white hover:bg-blue-500 hover:shadow-sm'
    }`;

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand / Logo */}
        <Link to="/" className="text-2xl font-semibold text-white tracking-wide">
          BlueRides
        </Link>

        {/* Nav links */}
        <div className="flex space-x-4">
          <Link to="/" className={navLinkStyle('/')}>Home</Link>
          <Link to="/cars" className={navLinkStyle('/cars')}>Cars</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
