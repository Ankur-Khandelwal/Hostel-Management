import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./navbar.css";
class Navbar extends Component {
  constructor() {
    super();
    this.onLougoutClick = this.onLougoutClick.bind(this);
  }

  onLougoutClick(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link onClick={this.onLougoutClick.bind(this)} className="nav-link" to="/">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              title="Gravatar Image"
              style={{ width: "30px", marginRight: "5px" }}
            />
            {""} LogOut
          </Link>
        </li>
      </ul>
    );

    const unauthLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-md navbar-dark sticky-top">
        <div classname="mx-auto order-0">
          <Link className="navbar-brand mr-auto font-weight-bold" to="/">
            <span class="iiit">IIIT</span><span class="Bh">-Bh </span> <span class="hostel">Hostel</span>
          </Link>
        </div>
        <div className="container-fluid" >
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : unauthLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
