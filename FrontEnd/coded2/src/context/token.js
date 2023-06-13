import { createContext, useState } from "react";

const TokenContext = createContext({
    state: { accessToken : ''},
    actions : {
        setAccessToken : () => {}
    }
});

const TokenProvider =({ children }) =>{
    const [accessToken, setAccessToken] = useState('');

    const value = {
        state : {accessToken},
        actions : {setAccessToken}
    };
    return(
        <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
    );
};

const TokenConsumer = TokenContext.Consumer;

export { TokenProvider, TokenConsumer }

export default TokenContext;