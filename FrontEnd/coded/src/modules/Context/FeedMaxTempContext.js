import { createContext, useState } from "react";

const FeedMaxTempContext = createContext({
    maxTemp:0,
    setMaxTemp:()=>{},
});

function FeedMaxTempProvider({children}){
    const [maxTemp, setMaxTemp] = useState(0);

    return(
        <FeedMaxTempContext.Provider value={{
            maxTemp,
            setMaxTemp,
        }}>
            {children}
        </FeedMaxTempContext.Provider>
    );
};

export {FeedMaxTempContext, FeedMaxTempProvider};