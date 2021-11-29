import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import "./Register.css";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register mid container">
        <div className="container Signupouter">
          <div className="row ">
          
            <div className="col-md-4 m-auto Signupinner">
            <img class="center" src="https://i.ibb.co/gb1X9Qf/filename.png" alt="logo" width="62" height="62"/>
              <h2 className="display-6 text-center">Sign Up</h2>
              <h1 class="lead text-center">Create Your Account</h1>
              <form className=" signupForm" noValidate onSubmit={this.onSubmit}>
                <div class="form-group" >
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.text
                    })}
                    placeholder="User Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />

                  <input
                    type="email"
                    className={classnames("form-control", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                

                  <input
                    type="password"
                    className={classnames("form-control", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}

                  <input
                    type="password"
                    className={classnames("form-control", {
                      "is-invalid": errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                  <button class="btn btn-lg btn-primary btn-block btnInner" type="submit">Sign Up</button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStatesToProps,
  { registerUser }
)(withRouter(Register));
