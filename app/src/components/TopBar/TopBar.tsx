import React from 'react';
import './TopBar.css';
import logo from "../../assets/images/bus.png";

class TopBar extends React.Component {
  render() {
    return (
      <div className="top-bar">
        <img className="top-bar-logo" src={logo} alt="Bus logo" width="48" height="48"/>
        <span className="top-bar-header">Timetable - Jernbanetorget Bus Stop</span>
      </div>
    );
  }
}

export default TopBar;
