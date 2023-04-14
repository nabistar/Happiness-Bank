import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

// 폰트
import dream3 from "./assets/font/SCDream3.otf";
import dream5 from "./assets/font/SCDream5.otf";

// 배경
import back from "./assets/img/back.png";

const GlobalStyles = createGlobalStyle`
    ${reset}

	@font-face {
		font-family: 'dream';
		font-style: normal;
		font-weight: 300;
		src: url(${dream3}) format('opentype');
	}

	@font-face {
		font-family: 'dream';
		font-style: normal;
		font-weight: 500;
		src: url(${dream5}) format('opentype');
	}

	html {
		width: 100%;
		height: 100%;
			body {
			width: 100%;
			height: 100%;

			div {
				width: 100%;
				height: 100%;

				div {
					width: 100%;
					height: 100%;
					background: url(${back});
					
					div {
						background: none;
					}

					p, input, textarea, a, label, button {
						font-family: 'dream', 'sans-serif';
						font-weight: 300;
					}
				}
			}
		}
	}
`;

export default GlobalStyles;
