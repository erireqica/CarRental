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
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about-us" element={<AboutUs />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/homepage"
            element={
              <ProtectedRoute requiredRole="admin">
                <HomeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/about-us"
            element={
              <ProtectedRoute requiredRole="admin">
                <AboutUsDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cars/add"
            element={
              <ProtectedRoute requiredRole="admin">
                <AddCarPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cars/edit/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <EditCarPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <EditCarPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute requiredRole="admin">
                <BookingHistoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute requiredRole="super_admin">
                <UserManagementPage />
              </ProtectedRoute>
            }
          />
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
