import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import AddCarPage from './pages/AddCarPage';
import EditCarPage from './pages/EditCarPage';
import AdminDashboard from './pages/AdminDashboard';
import UserManagementPage from './pages/UserManagementPage';
import SignupPage from './pages/SignupPage';
import BookingHistoryPage from './pages/BookingHistoryPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import LoginModal from './components/LoginModal';
import HomeDashboard from './pages/HomeDashboard';
import AboutUs from './pages/AboutUs';
import AboutUsDashboard from './pages/AboutUsDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/add" element={<AddCarPage />} />
          <Route path="/cars/edit/:id" element={<EditCarPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/edit/:id" element={<EditCarPage />} />
          <Route path="/dashboard/homepage" element={<HomeDashboard />} />
          <Route path="/bookings" element={<BookingHistoryPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/dashboard/about-us" element={<AboutUsDashboard />} />
        </Routes>
        <LoginModal />
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          theme="light"
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
