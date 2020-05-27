import React from "react";
import ImageHelper from "./helper/ImageHelper";

const Card = ({ product, addtoCart = true, remaoveFromCart = false }) => {
  const cardTitle = product ? product.name : "A photo from pexels";
  const cardDescrption = product
    ? product.description
    : "A Description  of product";
  const cardPrice = product ? product.price : "0";

  const showAddtoCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={() => {}}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemovetoCart = (remaoveFromCart) => {
    return (
      remaoveFromCart && (
        <button
          onClick={() => {}}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescrption}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddtoCart(addtoCart)}</div>
          <div className="col-12">{showRemovetoCart(remaoveFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
