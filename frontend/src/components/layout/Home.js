import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import "./Home.css"
class Home extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">IIIT Hostel Management</h1>
                <div class="outer">
                  <div class="inner">
                    New User ? Sign Up Now &nbsp;&nbsp;
                    <Link to="/register" className="btn btn-lg btn-info mr-2" styles={{margin: "5%" , color: "#000000"}}>
                      Sign Up
                    </Link>
                  </div>
                  <div class="inner">
                    Existing User ? Login Now &nbsp;&nbsp;
                    <Link to="/login" className="btn btn-lg btn-light">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
