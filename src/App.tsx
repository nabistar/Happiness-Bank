import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';

// page
import Info from './page/info';
import Join from './page/join';
import Login from './page/login';

const App = memo(() => {
	return (
		<Routes>
			<Route path="/" element={<Info />} />
			<Route path="/join" element={<Join />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
});

export default App;