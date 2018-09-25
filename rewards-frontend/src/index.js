import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Start from './startPage'

ReactDOM.render(<Start />, document.getElementById('root'));
registerServiceWorker();
