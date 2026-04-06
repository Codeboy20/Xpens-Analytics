import React from 'react';
import ReactDOM from 'react-dom';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';

import App from './App';
import './index.css';

import { Provider } from './context/context';

ChartJS.register(ArcElement, Tooltip, Legend);

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
