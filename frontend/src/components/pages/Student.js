import React, { Component } from 'react';
import classnames from 'classnames';
import axios from 'axios';
import ReactLoading from 'react-loading';
import BatchCard from '../UI/BatchCard/BatchCard';
import './css/Student.css';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findBy: '',
      val: '',
      data: {},
      loading: false,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onFtechDetails = this.onFtechDetails.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.onBatchSelect = this.onBatchSelect.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async onDelete(id) {
    await axios
      .delete(`/api/student`, { data: { id } })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    await this.onFtechDetails();
  }
  async onStatusChange(id, isAvailable) {
    await axios
      .put(`/api/student/availability`, { id, isAvailable: !isAvailable })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    await this.onFtechDetails();
  }
  async onFtechDetails() {
    this.setState({ loading: true });
    if (this.state.findBy === 'id') {
      await axios
        .get(`/api/student/id/${this.state.val}`)
        .then((res) => {
          this.setState({ data: res, loading: false });
          console.log(res);
          if (!res.data.length) {
            alert('Not Found');
          }
        })
        .catch((err) => console.log(err));
    } else if (this.state.findBy === 'room') {
      await axios
        .get(`/api/student/room/${this.state.val}`)
        .then((res) => {
          this.setState({ data: res, loading: false });
          console.log(res);
          if (!res.data.length) {
            alert('Not Found');
          }
        })
        .catch((err) => console.log(err));
    } else if (this.state.findBy === 'isAvailable') {
      await axios
        .get(`/api/student/all`)
        .then((res) => {
          let tempVal = this.state.val;
          tempVal = tempVal.trim().toLowerCase();
          if (tempVal === 'absent') {
            tempVal = false;
          } else if (tempVal === 'present') {
            tempVal = true;
          } else {
            this.setState({ loading: false });
            return alert("Input can be 'absent' or 'present' only!");
          }
          const filteredData = res.data
            ? res.data.filter((el) => el.isAvailable === tempVal)
            : [];
          const data = {
            data: filteredData,
          };
          this.setState({ data: data, loading: false });
          if (!filteredData.length) {
            alert('Not Found');
          }
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({ loading: false });
      return alert('Select Room number or Student Id?');
    }
  }
  onBatchSelect(batch) {
    this.props.history.push(`/studentdetails/${batch}`);
  }
  render() {
    const { errors, data, loading } = this.state;
    let tableContent;
    !data
      ? (tableContent = null)
      : (tableContent = data.data
          ? data.data.map((el) => (
              <tr key={el._id}>
                <th scope="row">{data.data.indexOf(el) + 1}</th>
                <td>{el.name ? el.name : '-'}</td>
                <td>{el.email ? el.email : '-'}</td>
                <td>{el.id ? el.id : '-'}</td>
                <td>{el.block ? el.block : '-'}</td>
                <td>{el.room ? el.room : '-'}</td>
                <td>{el.gender ? el.gender : '-'}</td>
                <td>
                  {el.isAvailable ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Click to Mark Absent"
                      onClick={() => this.onStatusChange(el.id, el.isAvailable)}
                    >
                      Present
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Click to Mark Present"
                      onClick={() => this.onStatusChange(el.id, el.isAvailable)}
                    >
                      Absent
                    </button>
                  )}
                </td>
                <td
                  style={{ cursor: 'pointer', color: '#00a4eb' }}
                  onClick={() => this.onDelete(el.id)}
                >
                  Click Me
                </td>
              </tr>
            ))
          : null);

    return (
      <div className="mid container">
        <div className="batch-list">
          <BatchCard year="2018" function={this.onBatchSelect}/>
          <BatchCard year="2019" function={this.onBatchSelect}/>
          <BatchCard year="2020" function={this.onBatchSelect}/>
          <BatchCard year="2021" function={this.onBatchSelect}/>
        </div>
        <div className="find-students">
          <div className="search">
            <label htmlFor="find" style={{ marginLeft: '14px' }}>
              <h5>Search Students</h5>
            </label>
            <div className="col-8 input-group-prepend">
              <select
                className={classnames('form-control', {
                  'is-invalid': errors.room,
                })}
                id="find"
                onChange={this.onChange}
                value={this.state.findBy}
                name="findBy"
              >
                {' '}
                <option value="" defaultValue disabled>
                  Select
                </option>
                <option value="id">Student Id</option>
                <option value="room">Room No.</option>
                <option value="isAvailable">Absent/Present</option>
              </select>
              <input
                type="text"
                id="val"
                placeholder="Value"
                className={classnames('form-control', {
                  'is-invalid': errors.room,
                })}
                onChange={this.onChange}
                name="val"
                value={this.state.val}
                required={true}
              />
              {errors.room && (
                <div className="invalid-tooltip">{errors.room}</div>
              )}
              <button
                className="btn btn-primary"
                style={{ fontSize: '12px', width: '200px' }}
                onClick={this.onFtechDetails}
              >
                Find Details
              </button>
            </div>
          </div>
          <div className="results">
            <div
              style={{ marginTop: '50px', maxHeight: 800}}
            >
              {!loading ? (
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">ID</th>
                      <th scope="col">Block</th>
                      <th scope="col">Room No.</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Leave Status</th>
                      <th scope="col">Delete?</th>
                    </tr>
                  </thead>
                  <tbody>{tableContent}</tbody>
                </table>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <ReactLoading type="balls" color="blue" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Student;
