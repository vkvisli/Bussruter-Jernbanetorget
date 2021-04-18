import React from 'react';
import ITimeTable from '../../interfaces/ITimeTable';
import TimeTableDataService from '../../services/TimeTableDataService';
import TimeTableEntry from '../TimeTableEntry/TimeTableEntry';
import { v4 as uuidv4 } from 'uuid';
import './TimeTable.css';

type TimeTableProps = {
  
}

type TimeTableState = {
  timeTable: ITimeTable
}

class TimeTable extends React.Component<TimeTableProps, TimeTableState> {

  private timeTableDataService: TimeTableDataService;

  constructor(props: TimeTableProps) {
    super(props);

    this.timeTableDataService = new TimeTableDataService();

    this.state = {
      timeTable: null
    };
  }

  componentDidMount() {
    this.retrieveTimeTable();
  }

  private retrieveTimeTable() {
    this.timeTableDataService.getTimeTableData().then((timeTable) => {
      console.log("timetable retrieved:", timeTable);
      this.setState({ timeTable: timeTable });
    })
  }

  render() {
    
    if (!this.state.timeTable)
      return <span>No timetable available</span>;

    return (
      <div className="timetable-container">
        {this.state.timeTable.stopPlace.estimatedCalls.map((entry) =>
          <TimeTableEntry entry={entry} key={uuidv4()} />
        )}
      </div>
    );
  }
}

export default TimeTable;
