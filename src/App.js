import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { Check } from '@material-ui/icons';
import Checkout from './components/Checkout/Checkout';
import Payment from './components/Payment/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, elements } from '@stripe/react-stripe-js';
import Orders from './components/Orders/Orders';

const promise = loadStripe(
  "pk_test_51K4dslDNHFgI9Z1jiEiBX63KmBV32vbCiQWHRpFQUGPvvVf0wfmmVFCTCR8oXQyiuhJWYCYEbTgE4iTpoYJozaOE00XvapIkr3"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<><Header /><Checkout /></>} />
          <Route path="/payment" element={<><Header /><Elements stripe={promise}><Payment /></Elements></>} />
          <Route path="/orders" element={<><Header /><Orders /></>} />
          <Route path="/" element={<><Header /><Home /></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
