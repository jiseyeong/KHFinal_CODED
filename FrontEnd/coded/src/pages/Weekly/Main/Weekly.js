import WeeklyFeedForm from "../../../component/Weekly/WeeklyFeedForm";
import WeeklySideForm from "../../../component/Weekly/WeeklySideForm";


function WeeklyPage(){
    return (
        <div>
            <div>
                <WeeklySideForm />
            </div>
            <div>
                <WeeklyFeedForm />
            </div>
        </div>
    );
}

export default WeeklyPage;