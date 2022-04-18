import HistoryItem from "./HistoryItem/HistoryItem";
import { useState } from "react";

import './HistoryItems.css';

function HistoryItems(props) {

    const [ currentEdit, setCurrentEdit ] = useState(false);

    const activitiesElement = props.activities.map((activity, index) => {
        return (
            <HistoryItem 
                key={index}
                index={index} 
                activity={activity} 
                currentEdit={currentEdit} 
                setCurrentEdit={setCurrentEdit} 
                loginData={props.loginData} 
                loadActivities={props.loadActivities} 
                activityToUpdate={props.activityToUpdate}
                setActivityToUpdate={props.setActivityToUpdate}
            />
        );
    })

    return(
        <div className="history-items">
            {props.activities.length > 0 && activitiesElement}
            {props.activities.length <= 0 && <div className="no-act-div">You didn't have any activities on this day</div>}
        </div>
    );
}

export default HistoryItems;