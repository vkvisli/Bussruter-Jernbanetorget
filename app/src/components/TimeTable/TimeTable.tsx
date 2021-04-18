import React from 'react';
import TimeTableDataService from '../../services/TimeTableDataService';
import './TimeTable.css';

class TimeTable extends React.Component {

  constructor(props: object) {
    super(props);
    let timeTableData = TimeTableDataService.getTimeTableData();
  }

  render() {
    return <h1>Timetable</h1>
  }
}

export default TimeTable;
