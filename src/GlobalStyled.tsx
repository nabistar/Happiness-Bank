import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

// 폰트
import mapleLight from "./assets/font/Maplestory-Light.ttf";
import mapleBold from "./assets/font/Maplestory-Bold.ttf";
import bingBold from "./assets/font/Binggrae-Bold.ttf";
import bing from "./assets/font/Binggrae.ttf";

const GlobalStyles = createGlobalStyle`
    ${reset}

	@font-face {
		font-family: 'maple';
		font-style: normal;
		font-weight: normal;
		src: url(${mapleLight}) format('truetype');
	}

	@font-face {
		font-family: 'maple';
		font-style: normal;
		font-weight: 700;
		src: url(${mapleBold}) format('truetype');
	}

	@font-face {
		font-family: 'bing';
		font-style: normal;
		font-weight: normal;
		src: url(${bing}) format('truetype');
	}

	@font-face {
		font-family: 'bing';
		font-style: normal;
		font-weight: 700;
		src: url(${bingBold}) format('truetype');
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
					background-color: #abdff1;
					
					div {
						background-color: transparent;
					}

					p, input, textarea, a, label, button {
						font-family: 'bing', 'sans-serif';
						color: #0C4A60;
					}
				}
			}
		}
	}
`;

export default GlobalStyles;
