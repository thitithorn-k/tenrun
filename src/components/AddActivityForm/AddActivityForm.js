import './AddActivityForm.css'

import Logo from '../../resources/Logo';

function AddActivityForm(props) {
    return (
        <div className="add-activity-form">
            <div className="activity-details">
                <div className="activity-detail">
                    <span>Activity</span>
                    <input placeholder="Name" />
                </div>
                <div className="activity-detail">
                    <span>Description</span>
                    <textarea placeholder="Description" ></textarea>
                </div>
                <div className="activity-detail">
                    <span>Duration</span>
                    <input type="time" />
                </div>
                <div className="activity-detail">
                    <span>Date</span>
                    <input type="date" />
                </div>
                {!props.isMobile && (
                    <div className="activity-detail-submit">
                        <button class='btn' >Save</button>
                    </div>
                )}
            </div>
            <div className="activity-type">
                <div className="activity-type-row">
                    <div className="activity-type-btn">
                        <Logo logo='run' class='add-activity-icon'/>
                    </div>
                    <div className="activity-type-btn">
                        <Logo logo='walk' class='add-activity-icon' />
                    </div>
                </div>
                <div className="activity-type-row">
                    <div className="activity-type-btn">
                        <Logo logo='swim' class='add-activity-icon' />
                    </div>
                    <div className="activity-type-btn">
                        <Logo logo='bike' class='add-activity-icon' />
                    </div>
                </div>
            </div>
            {props.isMobile && (
                <div className="activity-detail-submit-mobile">
                    <button class='btn'>Save</button>
                </div>
            )}
        </div>
    );
}

export default AddActivityForm;