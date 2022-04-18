import AddActivityForm from "../../components/AddActivityForm/AddActivityForm";
import { useEffect, useState } from "react";

import './AddActivity.css';

function AddActivity(props) {

    const [ updateActivity, setUpdateActivity ] = useState();
    useEffect(() => {
        if(props.activityToUpdate){
            setUpdateActivity(props.activityToUpdate);
        }
        props.setActivityToUpdate();
    }, []);

    return (
        <div className="add-activity-container">
            <div className="add-activity-container-blog">
                <div className="add-activity-container-blog-top">
                    <h1>{updateActivity!==undefined? 'Update activity': 'Add activity'}</h1>
                </div>
                <AddActivityForm loginData={props.loginData} loadActivities={props.loadActivities} updateActivity={updateActivity}/>
            </div>
        </div>
    );
}

export default AddActivity;