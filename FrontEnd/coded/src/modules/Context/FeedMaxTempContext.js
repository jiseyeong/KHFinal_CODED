import { createContext, useState } from "react";

const FeedMaxTempContext = createContext({
    maxTemp:0,
    setMaxTemp:()=>{},
    tempRange:0,
    setTempRange:()=>{},
});

function FeedMaxTempProvider({children}){
    const [maxTemp, setMaxTemp] = useState(0);
    const [tempRange, setTempRange] = useState(0);

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