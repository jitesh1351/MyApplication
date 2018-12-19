import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: null,
      studentName: '',
      passportNo: '',
      favourite: false
    }
  }
  componentDidMount() {
    const routeParams = this.props.routeParams;
    const studentId = routeParams.studentId.split("=")[1];
    const studentName = routeParams.studentName.split("=")[1];
    const passportNo = routeParams.passportNo.split("=")[1];
    const favourite = routeParams.favourite.split("=")[1];
    if (favourite.toUpperCase() === 'YES') {
      this.setState({
        favourite: true
      })
    }
    this.setState({
      studentId: studentId,
      studentName: studentName,
      passportNo: passportNo
    })
  }
  /**
   * @desc handleCloseWindow, This function close the window
   * @returns {null} null
  */
  handleCloseWindow() {
    window.close();
  }
  render() {
    return (
      <div className="form">
        <div>
          <h1>Student Details</h1>
        </div>
        <form className="form-inline form-group">
          <div className=" form-group col-md-4">
            <label className="col-md-3">Student ID Is</label>
            <input className="form-control col-md-6"
              type="text"
              value={this.state.studentId}
              readOnly
            />

          </div>
          <div className=" form-group col-md-4">
            <label className="col-md-3">Student Name Is</label>
            <input className="form-control col-md-6"
              type="text"
              value={this.state.studentName}
              readOnly
            />
          </div>
        </form>
        <form className="form-inline form-group">
          <div className=" form-group col-md-4">
            <label className="col-md-3">Passport No</label>
            <input className="form-control col-md-6"
              type="text"
              value={this.state.passportNo}
              readOnly
            />
          </div>
          <div className=" form-group col-md-4">

            <label className="col-md-3">Favourite Student?</label>
            <input type="radio" className="radio" name="radioGroup" checked={this.state.favourite} readOnly />
            <label className="col-md-1">Yes</label>
            <input type="radio" className="radio" name="radioGroup" checked={!this.state.favourite} readOnly />
            <label className="col-md-1">No</label>
          </div>
          <div className="col-md-6 form-inline">
            <button className="col-md-2" onClick={() => this.handleCloseWindow()}> Close Screen</button>
          </div>
        </form>
      </div>
    );
  }
}

export default DetailScreen;