import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from 'AppRouter';


const Root = ({ store }) => {
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
};

export default Root;
