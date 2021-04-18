import React from 'react';
import ReactDOM from 'react-dom';
import TimeTableEntry from './TimeTableEntry';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimeTableEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});