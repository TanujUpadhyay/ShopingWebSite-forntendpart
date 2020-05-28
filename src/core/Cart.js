import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/CartHelper";
import StripCheckOut from "./StripeCheckOut";

const Cart = () => {
  const [products, setProducts] = useState([]);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProduct = () => {
    return (
      <div>
        <h2>This section is for check out</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            remaoveFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  const loadCheackout = () => {
    return <StripCheckOut products={products} setReload={setReload} />;
  };

  return (
    <Base title="Cart page" description="Ready to check out">
      <div className="row text-center">
        <div className="col-6">{loadAllProduct()}</div>
        <div className="col-6">{loadCheackout()}</div>
      </div>
    </Base>
  );
};

export default Cart;
