import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import generateStore from '../src/redux/store';
import { CssBaseline } from '@material-ui/core';

const { store } = generateStore();
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<CssBaseline />
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);
