import { createContext, useContext, useState } from "react";
import WeeklyFeedForm from "../../../component/Weekly/WeeklyFeedForm";
import WeeklySideForm from "../../../component/Weekly/WeeklySideForm";
import { FeedMaxTempProvider } from "../../../modules/Context/FeedMaxTempContext";


function WeeklyPage(){
    return (
        <FeedMaxTempProvider>
            <div>
                <div>
                    <WeeklySideForm />
                </div>
                <div>
                    <WeeklyFeedForm/>
                </div>
            </div>
        </FeedMaxTempProvider>
    );
}

export default WeeklyPage;