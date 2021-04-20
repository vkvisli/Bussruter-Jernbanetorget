import React from 'react';
import ReactDOM from 'react-dom';
import TimeTable from './TimeTable';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimeTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});