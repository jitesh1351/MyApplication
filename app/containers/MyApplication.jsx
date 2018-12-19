import React from 'react';
import { fetchStudentGridData } from '../actions/myApplicationAction';
import { connect } from 'react-redux';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
// import CSS
import 'app_assets/css/grid/ag-grid.css';
import 'app_assets/css/grid/theme-fresh.css';
import 'app_assets/css/grid/style.css';
import 'app_assets/css/tempStyle.css';
class MyApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridData: [],
      stateVal: 0,
      detailScreenFlag: false,
      updateRecordFlag: false,
      message: "Please Selecte a Row to open detail Screen",
      fav: [{ val: 'Yes' }, { val: 'No' }],
      columnDefs: [
        {
          headerName: "Row",
          checkboxSelection: true,
          width: 80,
          cellClass: ['ellipses']
        },
        {
          headerName: "Student ID",
          field: "id",
          width: 130,
          unSortIcon: true,
          editable: false,
          cellClass: ['ellipses']
        },
        {
          headerName: "Student Name",
          field: "name",
          width: 180,
          unSortIcon: true,
          editable: false,
          cellClass: 'ellipses'
        },
        {
          headerName: "PassportNo",
          field: "passportNumber",
          width: 185,
          unSortIcon: true,
          editable: false,
          cellClass: 'ellipses'
        },
        {
          headerName: "Favourite",
          field: "fullTime",
          width: 169,
          editable: true,
          cellRenderer: (item) => this.favouriteValue(item),
          cellEditor: 'agRichSelectCellEditor',
          cellEditorParams: {
            cellHeight: 50,
            options: ['Yes', 'No']
          }
        }
      ],
      gridOptions: {
        columnDefs: [],
        enableSorting: true,
        rowHeight: 30,
        rowSelection: 'single',
        onGridReady: this.onStudentGridReady.bind(this),
        onSelectionChanged: () => this.onGridRowSelection()
      }
    }
  }
  componentDidMount() {
    this.props.dispatch(fetchStudentGridData());
  }

  componentWillReceiveProps(nextProps) {
    const studentData = nextProps.studentData ? nextProps.studentData : undefined;
    for (let i = 0; i < studentData.length; i++) {
      if (studentData[i].fullTime) {
        studentData[i].fullTime = 'Yes';
      }
      else {
        studentData[i].fullTime = 'No'
      }
    }
    this.setState({
      gridData: studentData
    }, function () { })
  }
  /**
   * @desc favouriteValue, return favourite Value in the grid
   * @param {object} params params
   * @returns {string} string
  */
  favouriteValue(params) {
    return this.state.gridData[params.rowIndex].fullTime

  }
  /**
 * @desc onGridRowSelection, function to be called when student grid data is selected
 * @returns {null} null
*/
  onGridRowSelection() {
    let selectedRow = this.gridApi.getSelectedRows();
    if (selectedRow.length === 1) {
      this.setState({
        detailScreenFlag: true,
        updateRecordFlag: true
      })
    }
    else {
      this.setState({
        detailScreenFlag: false,
        updateRecordFlag: false
      })
    }
  }
  /**
 * @desc onStudentGridReady, function to be called when grid is ready
 * @param {string} gridOptions gridOptions
 * @returns {null} null
*/
  onStudentGridReady(gridOptions) {
    this.gridApi = gridOptions.api;
  }
  /**
 * @desc handleDetailScreenValidation, function to open new window for Detail Screen
 * @param {null} null
 * @returns {null} null
*/
  handleDetailScreenValidation() {
    let selectedRow = this.gridApi.getSelectedRows();
    let studentId = selectedRow[0].id;
    let studentName = selectedRow[0].name;
    let passportNo = selectedRow[0].passportNumber;
    let favourite = selectedRow[0].fullTime;
    let url = 'http://localhost:4444/#/DetailScreen' + '/studentId=' + studentId + '&studentName=' + studentName + '&passportNo=' + passportNo + '&favourite=' + favourite;
    window.open(url);
  }
  /**
 * @desc handleUpdatedData, function to update data of the grid row
 * @param {null} null
 * @returns {null} null
*/
  handleUpdatedData() {
    let selectedRow = this.gridApi.getSelectedRows();
    let fullTimeFlag = false;
    if ((selectedRow[0].fullTime).toUpperCase() === 'YES') {
      fullTimeFlag = true;
    }
    let payload = {
      "id": selectedRow[0].id,
      "name": selectedRow[0].name,
      "passportNumber": selectedRow[0].passportNumber,
      "fullTime": fullTimeFlag
    }
    let url = 'http://localhost:5056/school/v1/students';
    axios({ method: "PUT", url, data: payload }).
      then(() => {
        alert("Data Saved Sucessfully");
      }).
      catch(function (error) {
        console.log("There is an error while saving the data");
      });

  }
  render() {
    let self = this;
    return (
      <div id="container">
        <div>
          <h1>Student Records</h1>
        </div>
        <div id="myGrid" className="gridStyle ag-fresh">
          <AgGridReact
            gridOptions={self.state.gridOptions}
            columnDefs={self.state.columnDefs}
            rowData={self.state.gridData}
          />
        </div>
        <div className="col-md-6 form-inline">
          <button className="col-md-2" onClick={() => this.handleDetailScreenValidation()} disabled={!this.state.detailScreenFlag}> Detail Screen</button>
          <button className="col-md-2" onClick={() => this.handleUpdatedData()} disabled={!this.state.updateRecordFlag}> Update Data</button>
        </div>

      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    studentData: state.myApplicationReducer.studentData
  }
}
export default connect(mapStateToProps)(MyApplication);
