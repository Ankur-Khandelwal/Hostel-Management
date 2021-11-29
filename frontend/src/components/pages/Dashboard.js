import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/authActions";


const student = require("../../img/student.jpg");
const staff = require("../../img/staff.jpg");
const bedRoom = require("../../img/bedroom.jpeg");
class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      // this.props.history.push("/");
    }
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div className="mid container">
        <div className="text-center" style={{ fontSize: "25px" }}>
          <h3>Welcome {user.name}!</h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>

          <div className="card hoverable" style={{ width: "30rem", hover: '', height: 'auto', border: '2px solid'}}>
            <img src={student} className="card-img-top" alt="student" />
            <div className="card-body" style={{ height: '10rem' }}>
              <center><h5 className="card-title">Student</h5>
              <p>Click below to Add new Student and alot Room or Check Info</p>
              <a href="/student"  className="btn btn-primary">
                Add
              </a></center>
            </div>
          </div>


          <div className="card" style={{ width: "30rem", hover: '', height: 'auto',border: '2px solid' }}>
            <img src={staff} className="card-img-top" alt="staff" />
            <div className="card-body">
              <center><h5 className="card-title">Staff Info</h5>
              <p>Click below to Add more Staff or Check their info</p>
              <a href="/staff" className=" btn btn-primary">
                Add 
              </a>
              </center>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  // getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
  ,
  { getCurrentUser }
)(Dashboard);
