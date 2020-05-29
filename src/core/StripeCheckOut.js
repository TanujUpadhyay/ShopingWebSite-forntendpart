import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/CartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOder } from "./helper/OrderHelper";

const StripCheckOut = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount += p.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        //call further methods
        const { status } = response;
        cartEmpty(() => {
          setReload(!reload);
        });
        console.log("Status : ", status);
      })
      .catch((error) => console.log(error));
  };

  const showStripButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutButton
        stripeKey={process.env.REACT_APP_PK}
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="ShopingWeb"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">PAy with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  //useEffect(())

  return (
    <div>
      <h4>Your total amount :- {getFinalAmount()}</h4>

      <hr className="bg-success" />
      <br />
      <h3 className="text-white mt-3">Stripe Gateway</h3>
      {showStripButton()}
    </div>
  );
};

export default StripCheckOut;
