import AddActivityForm from "../../components/AddActivityForm/AddActivityForm";

import './AddActivity.css';

function AddActivity(props) {
    return (
        <div className="add-activity-container">
            <div className="add-activity-container-blog">
                <div className="add-activity-container-blog-top">
                    <h1>Add activity</h1>
                </div>
                <AddActivityForm isMobile={props.isMobile} />
            </div>
        </div>
    );
}

export default AddActivity;