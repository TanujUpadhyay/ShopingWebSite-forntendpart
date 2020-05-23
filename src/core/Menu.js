import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link className="nav-link" style={currentTab(history, "/")} to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={currentTab(history, "/cart")}
          to="/cart"
        >
          Cart
        </Link>
      </li>

      {isAutheticated() && isAutheticated().user.role === 0 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            style={currentTab(history, "/user/dashboardd")}
            to="/user/dashboard"
          >
            U.Dashboard
          </Link>
        </li>
      )}

      {isAutheticated() && isAutheticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            style={currentTab(history, "/admin/dashboard")}
            to="/admin/dashboard"
          >
            A. Dashboard
          </Link>
        </li>
      )}

      {!isAutheticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={currentTab(history, "/signup")}
              to="/signup"
            >
              Signup
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={currentTab(history, "/signin")}
              to="/signin"
            >
              Sigin
            </Link>
          </li>
        </Fragment>
      )}

      {isAutheticated() && (
        <li className="nav-item">
          <span
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            SignOut
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
