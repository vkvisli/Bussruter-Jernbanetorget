import React from 'react';
import ITimeTable from '../../interfaces/ITimeTable';
import TimeTableDataService from '../../services/TimeTableDataService';
import TimeTableEntry from '../TimeTableEntry/TimeTableEntry';
import { v4 as uuidv4 } from 'uuid';
import './TimeTable.css';

type TimeTableProps = {
  
}

type TimeTableState = {
  timeTable: ITimeTable,
  isLoading: boolean
}

class TimeTable extends React.Component<TimeTableProps, TimeTableState> {

  private timeTableDataService: TimeTableDataService;

  constructor(props: TimeTableProps) {
    super(props);

    this.timeTableDataService = new TimeTableDataService();

    this.state = {
      timeTable: null,
      isLoading: false
    };
  }

  componentDidMount() {
    this.retrieveTimeTable();
  }

  /** 
   * Retrieves timetable data from the timeTableDataService 
   * and sets the component's isLoading property to true while doing so.
   */
  private retrieveTimeTable() {
    this.setState({ isLoading: true });

    this.timeTableDataService.getTimeTableData()
      .then((timeTable) => {
        this.setState({ timeTable: timeTable });
      })
      .catch((e) => {
        alert("Timetable data could not be retrieved");
      })
      .finally(() => {
        this.setState({ isLoading: false });
      })
  }

  render() {

    if (this.state.isLoading)
      return <span>Retrieving timetable data...</span>;
    
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
