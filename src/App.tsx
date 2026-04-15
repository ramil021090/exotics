import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import Keepers from "./pages/Keepers";
import AppLayout from "./ui/AppLayout";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Bookings from "./pages/Bookings";
import { Toaster } from "react-hot-toast";
import BookingDetails from "./features/bookings/BookingDetails";
import ProtectedRoute from "./ui/ProtectedRoute";
import Homepage from "./pages/Homepage";
import SignupForm from "./features/authentication/SignupForm";

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="homepage/:id" />} />

            <Route path="/profile/:id" element={<Profile />} />
            <Route path="homepage/:id" element={<Homepage />} />
            <Route path="reports" element={<Reports />} />
            <Route path="keepers" element={<Keepers />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookingsDetails/:id" element={<BookingDetails />} />

            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="signup" element={<SignupForm />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
