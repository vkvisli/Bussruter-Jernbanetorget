import React from 'react';
import ITimeTableEntry from '../../interfaces/ITimeTableEntry';
import {Collapse} from 'react-collapse';
import DownArrow from "../../assets/images/down-arrow.png";
import UpArrow from "../../assets/images/up-arrow.png";
import './TimeTableEntry.css';

type TimeTableEntryProps = {
  entry: ITimeTableEntry
}

type TimeTableEntryState = {
  isCollapseOpen: boolean,
  isMouseHovering: boolean
}

class TimeTableEntry extends React.Component<TimeTableEntryProps, TimeTableEntryState> {

  constructor(props: TimeTableEntryProps) {
    super(props);

    this.state = { 
      isCollapseOpen: false,
      isMouseHovering: false
    };
  }

  /**
   * Determines whether the bus for this timetable entry is delayed or not.
   * A bus is considered delayed if its expected arrival time is one minute or more after its aimed arrival time. 
   */
  private isDelayed(): boolean {
    let expected = new Date(this.props.entry.expectedArrivalTime).getTime();
    let aimed = new Date(this.props.entry.aimedArrivalTime).getTime();
    let difference = Math.abs(expected - aimed);
    return difference > 60000;
  }

  /**
   * Formats a given date string into a local time string suitable for displaying arrival times.
   * @param dateString The date string to format 
   * @returns The formatted date string
   */
  private formatArrivalTime(dateString: string): string {
    let date = new Date(dateString);
    return date.toLocaleTimeString();
  }

  /**
   * Open or close the collapse panel
   */
  private toggleCollapse = () => {
    this.setState({ isCollapseOpen: !this.state.isCollapseOpen });
  }

  /**
   * Toggle whether the user is hovering their mouse over the timetable entry
   * @param isHovering whether or not the user is hovering their mouse over the timetable entry
   */
  private toggleHovering = (isHovering: boolean) => {
    this.setState({ isMouseHovering: isHovering });
  }

  render() {
    return (
      <div 
        className="timetable-entry-container" 
        onClick={this.toggleCollapse} 
        onMouseEnter={() => this.toggleHovering(true)}
        onMouseLeave={() => this.toggleHovering(false)}>

        <div className="timetable-entry-main-content">
          <span className="timetable-entry-name">{this.props.entry.destinationDisplay.frontText}</span>
          <div className="timetable-entry-arrival-time">
            <span className="timetable-entry-expected-arrival-time">
              {this.formatArrivalTime(this.props.entry.expectedArrivalTime)}
              </span>
            {
              this.isDelayed() ? 
                <span className="timetable-entry-aimed-arrival-time">
                  {this.formatArrivalTime(this.props.entry.aimedArrivalTime)}
                </span> : 
                ""
            }
          </div>
          <span className="timetable-entry-date">{this.props.entry.date}</span>
        </div>

        <Collapse isOpened={this.state.isCollapseOpen}>
          <div className="timetable-entry-collapse-content">
            <p>
              This bus was scheduled to arrive {this.formatArrivalTime(this.props.entry.aimedArrivalTime)}
              &nbsp;and is expected to arrive {this.formatArrivalTime(this.props.entry.expectedArrivalTime)}
            </p>
          </div>
        </Collapse>

        <div style={{visibility: this.state.isMouseHovering ? "visible" : "hidden"}} className="timetable-entry-collapse-icon">
          <img src={this.state.isCollapseOpen ? UpArrow : DownArrow} alt="down arrow"/>
        </div>

      </div>
    );
  }
}

export default TimeTableEntry;