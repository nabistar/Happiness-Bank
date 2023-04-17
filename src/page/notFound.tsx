import React, { memo } from 'react';
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	p {
		color: #fde368;
		font-size: 40px;
	}
`;

const notFound = memo(() => {
	return (
		<Container>
			<p>존재하지 않는 페이지입니다.</p>
		</Container>
	);
});

export default notFound;