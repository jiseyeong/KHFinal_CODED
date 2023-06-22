import { createContext, useState } from "react";

const FeedMaxTempContext = createContext({
    maxTemp:-9999,
    setMaxTemp:()=>{},
    tempRange:-9999,
    setTempRange:()=>{},
});

function FeedMaxTempProvider({children}){
    const [maxTemp, setMaxTemp] = useState(-9999);
    const [tempRange, setTempRange] = useState(-9999);

    return(
        <FeedMaxTempContext.Provider value={{
            maxTemp,
            setMaxTemp,
            tempRange,
            setTempRange,
        }}>
            {children}
        </FeedMaxTempContext.Provider>
    );
};

export {FeedMaxTempContext, FeedMaxTempProvider};