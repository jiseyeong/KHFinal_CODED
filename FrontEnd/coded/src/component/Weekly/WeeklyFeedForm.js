import { useContext } from "react";
import { FeedMaxTempContext } from "../../modules/Context/FeedMaxTempContext";


function WeeklyFeedForm(){
    const {maxTemp} = useContext(FeedMaxTempContext); 
    return (
        <div>

        </div>
    )
}

export default WeeklyFeedForm;