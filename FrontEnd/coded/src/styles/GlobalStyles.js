import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	* {
		margin : 0px;
		padding : 0px;
		box-sizing : border-box;
	}
 
 	a {
        text-decoration : none;
        color : inherit;
  	}
	/* body {
		font-family : apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell , 'Helvetica Neue', sans-serif;
		font-size : 12px;
		background-color : rgba(20,20,20,1);
		color : white;
		padding-top: 50px ;
		overflow-x : hidden;
	} */

	html,
    body {
        width: 100%;
    }

	div{
		border : 1px solid black;
	}
	`;
export default GlobalStyles;
