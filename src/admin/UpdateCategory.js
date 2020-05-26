import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setsuccess] = useState(false);
  const [createCategory, setCreateCategeory] = useState("");

  const { user, token } = isAutheticated();

  const preLoad = (categoryId) => {
    getCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preLoad(match.params.categoryId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setsuccess(false);
    //bakend request fired

    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          setsuccess(true);
          setName("");
          setCreateCategeory(data.name);
        }
      }
    );
  };

  //   const handleChange = (name) => (event) => {
  //     const value = event.target.value;
  //     formData.set(name, value);
  //     setValues({ ...values, [name]: value });
  //   };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createCategory ? "" : "none" }}
    >
      <h4>{createCategory} updated successFuly</h4>
    </div>
  );

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left mt-4">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            <h4>{error}</h4>
          </div>
        </div>
      </div>
    );
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the Category</p>
        <input
          type="text"
          className="form-control my-3"
          value={name}
          onChange={handleChange}
          autoFocus
          required
        />
        <button
          onClick={onSubmit}
          type="submit"
          className="btn btn-outline-success mb-3"
        >
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Update Category"
      description="Here u update the category"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-4">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
