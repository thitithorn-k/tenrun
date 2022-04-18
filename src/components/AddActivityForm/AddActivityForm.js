import { useEffect, useState } from 'react';
import { addActivity, updateActivity } from '../../connecter/connecter.js';

import './AddActivityForm.css'
import Logo from '../../resources/Logo';

function AddActivityForm(props) {
    
    const [ activityName, setActivityName ] = useState('');
    const [ activityDetail, setActivityDetail ] = useState('');
    const [ activityDuration, setActivityDuration ] = useState('00:05');
    const today = new Date().toISOString().split('T')[0];
    const [ activityDate, setActivityDate ] = useState(today);
    const [ activityType, setActivityType ] = useState('run');

    const [ errorMessage, setErrorMessage ] = useState('');
    const [ addSuccess, setAddSuccess ] = useState(false);

    const handdleChange = (e, select) => {
        const value = e.target.value;
        switch(select){
            case 'name':
                setActivityName(value);
                break;
            case 'detail':
                setActivityDetail(value);
                break;
            case 'duration':
                setActivityDuration(value);
                break;
            case 'date':
                setActivityDate(value);
                break;
            case 'type':
                setActivityType(value);
                break;
            default:
                break;
        }
    }

    const validateData = (data) => {
        setAddSuccess(false);
        if(!data.name || /^\s*$/.test(data.name)){
            setErrorMessage('activity name must not empty');
            return false;
        } else if(typeof(data.duration) !== 'number' || data.duration <= 0){
            setErrorMessage('invalid duration');
            return false;
        } else if(!data.date || /^\s*$/.test(data.date)) {
            setErrorMessage('invalid date');
            return false;
        } else if(new Date(data.date) > new Date()){
            setErrorMessage('date must not be greater than the current date.');
            return false;
        }
        return true;
    }

    const handdleSubmit = async (e) => {
        e.preventDefault();
        const newAddData = {
            'name': activityName,
            'detail': activityDetail,
            'duration': activityDuration.split(':').reduce((acc,time) => (60 * acc) + Number(time)),
            'date': activityDate,
            'activity_type': activityType,
            'userId': ''
        }
        if(validateData(newAddData)){
            setErrorMessage('');
            let submitRes;
            if(props.updateActivity){
                submitRes = await updateActivity(props.loginData.id, props.loginData.token, props.updateActivity._id, newAddData);
            } else {
                submitRes = await addActivity(props.loginData.id, props.loginData.token, newAddData);
            }
            if(submitRes.error){
                setAddSuccess(false);
                setErrorMessage('fail to add activity to server');
            } else {
                setErrorMessage('');
                setAddSuccess(true);
                props.loadActivities();
                setActivityName('');
                setActivityDetail('');
            }
        }
    }

    useEffect(() => {
        if(props.updateActivity){
            setActivityName(props.updateActivity.name);
            setActivityDetail(props.updateActivity.detail);
            const durationMin = Math.floor(props.updateActivity.duration/60);
            const durationSec = props.updateActivity.duration%60
            setActivityDuration((durationMin>9? durationMin: '0'+ durationMin) + ':' + (durationSec>9? durationSec: '0'+ durationSec));
            setActivityDate(new Date(props.updateActivity.date).toISOString().split('T')[0]);
            setActivityType(props.updateActivity.activity_type);
            console.log(props.updateActivity.duration);
        }
    }, [props.updateActivity])

    return (
        <div className="add-activity-form">
            <form className="activity-details" onSubmit={handdleSubmit}>
                <div className="activity-detail">
                    <span>Activity</span>
                    <input placeholder="Name" value={activityName} onChange={(e) => handdleChange(e, 'name')} />
                </div>
                <div className="activity-detail">
                    <span>Description</span>
                    <textarea placeholder="Description" value={activityDetail} onChange={(e) => handdleChange(e, 'detail')} ></textarea>
                </div>
                <div className="activity-detail">
                    <span>Duration</span>
                    <input type="time" value={activityDuration} onChange={(e) => handdleChange(e, 'duration')} />
                </div>
                <div className="activity-detail">
                    <span>Date</span>
                    <input type="date" value={activityDate} onChange={(e) => handdleChange(e, 'date')} />
                </div>
                <div className="activity-detail">
                    <span>Type</span>
                    <select value={activityType} onChange={(e) => handdleChange(e, 'type')} >
                        <option value='run'>🏃 Running</option>
                        <option value='walk'>🚶 Walking</option>
                        <option value='swim'>🏊 Swiming</option>
                        <option value='bike'>🚴 Biking</option>
                    </select>
                </div>
                {
                    (errorMessage !== '' || addSuccess) &&
                    <div className='activity-status'>
                        {
                            errorMessage !== '' &&
                            <div className='activity-status-error'>
                                {errorMessage}
                            </div>
                        }
                        {
                            addSuccess &&
                            <div className='activity-status-success'>
                                {props.updateActivity? 'Update activity successfuly': 'Add activity successfuly'}
                            </div>
                        }
                    </div>
                }
                <div className="activity-detail-submit">
                    <button type='submit' className='btn' >{props.updateActivity? 'Update': 'Add'}</button>
                </div>
            </form>
        </div>
    );
}

export default AddActivityForm;