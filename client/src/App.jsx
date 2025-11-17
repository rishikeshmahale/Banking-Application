import Home from "./pages/Home.jsx";
import CustomerLogin from "./pages/CustomerLogin.jsx";
import BankerLogin from "./pages/BankerLogin.jsx";
import Signup from "./pages/Signup.jsx";
import CustomerTransactions from "./pages/CustomerTransactions.jsx";
import Customers from "./pages/Customers.jsx";
import Customer from "./pages/Customer.jsx";
import Navbar from "./components/Navbar.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Navbar />

        <div className="pt-20">
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/customer-login"} element={<CustomerLogin />} />
            <Route
              path={"/banker-login"}
              element={
               <BankerLogin />
              }
            />
            <Route
              path={"/signup"}
              element={
                <Signup />
              }
            />
            <Route
              path={"/customer/transactions"}
              element={
               <CustomerTransactions />
              }
            />
            <Route
              path={"/banker/all-customers"}
              element={
                <Customers />
              }
            />
            <Route
              path={"/banker/all-customers/:id"}
              element={
                <Customer />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
