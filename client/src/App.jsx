import "./App.css";
import { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles

// Pages & Components
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AddEmployee from "./pages/Admin/Addemployee/AddEmployee";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import TopHeader from "./components/TopHeader/TopHeader";
import UnAuthorized from "./pages/UnAuthorized/UnAuthorized";
import { PrivateRoute } from "./components/Auth/PrivetRoute";
import Employee from "./pages/Admin/Employee/Employee";
import AddCustomer from "./pages/Customer/AddCustomer/AddCustomer";
import Customers from "./pages/Customer/Customers/Customers";
import Vehicle from "./pages/Vehicle/Vehicle";
import AddOrder from "./pages/Order/AddOrder/AddOrder";
import Services from "./pages/Services/Services";
import OrderDetail from "./pages/Order/OrderDetail/OrderDetail";
import SingleOrderPage from "./pages/Order/SingleOrderPage/SingleOrderPage";
import About from "./pages/About/About";
import ServicePage from "./pages/ServicePage/ServicePage";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/404/404";
import BackToTop from "./components/BackToTop/BackToTop";
import AllOrders from "./pages/Order/AllOrders/AllOrders";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800, // animation speed
      once: false, // allow animation every time you scroll up/down
      mirror: true, // animate again when scrolling back
    });
  }, []);

  return (
    <>
      <TopHeader />
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/services" element={<ServicePage />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/unAuthorized" element={<UnAuthorized />}></Route>

        {/* for all */}
        <Route path="/order/:orderHash" element={<SingleOrderPage />} />

        {/* for all  */}
        <Route
          path="/order-detail"
          element={
            <PrivateRoute role={[1, 2, 3]}>
              <OrderDetail />
            </PrivateRoute>
          }
        />

        {/* for admin only  */}
        <Route
          path="/add-employee"
          element={
            <PrivateRoute role={[3]}>
              <AddEmployee />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/employee"
          element={
            <PrivateRoute role={[3]}>
              <Employee />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/services"
          element={
            <PrivateRoute role={[3]}>
              <Services />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute role={[3]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* for manager and admin */}
        <Route
          path="/add-customer"
          element={
            <PrivateRoute role={[2, 3]}>
              <AddCustomer />
            </PrivateRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <PrivateRoute role={[2, 3]}>
              <Customers />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-vehicle"
          element={
            <PrivateRoute role={[2, 3]}>
              <Vehicle />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-order"
          element={
            <PrivateRoute role={[2, 3]}>
              <AddOrder />
            </PrivateRoute>
          }
        />

        <Route
          path="/all-orders"
          element={
            <PrivateRoute role={[2, 3]}>
              <AllOrders />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
