import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';

// page
import Info from './page/info';
import Join from './page/join';
import Login from './page/login';
import Main from './page/main';
import Write from './page/write';
import Edit from './page/edit';
import View from './page/view';

const App = memo(() => {
	return (
		<Routes>
			<Route path="/" element={<Info />} />
			<Route path="/join" element={<Join />} />
			<Route path="/login" element={<Login />} />
			<Route path="/main" element={<Main />} />
			<Route path="/write" element={<Write />} />
			<Route path="/edit" element={<Edit />} />
			<Route path="/view" element={<View />} />
		</Routes>
	);
});

export default App;