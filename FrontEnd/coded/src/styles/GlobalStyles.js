import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	* {
		margin : 0px;
		padding : 0px;
		box-sizing : border-box;
	}
 
	html,
    body {
        width: 100%;
    }

	div{
		border : 1px solid black;
	}
	`;
export default GlobalStyles;
