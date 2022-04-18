import './HistoryItem.css';
import Logo from "../../../resources/Logo";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeActivity } from '../../../connecter/connecter.js';

function HistoryItem(props) {

    const navigate = useNavigate();
    const [ editor, setEditor ] = useState(false);
    const handdleClick = (e) => {
        if(editor){
            setEditor(false);
            props.setCurrentEdit(-1);
        } else {
            setEditor(true);
            props.setCurrentEdit(props.index);
        }
    }
    const handdleEdit = (e) => {
        props.setActivityToUpdate(props.activity);
        navigate('/add-activity', {replace: true});
    }

    const handdleRemove = async (e) => {
        console.log(props.loginData.id);
        const res = await removeActivity(props.loginData.id, props.loginData.token, props.activity._id);
        if(!res.error){
            props.loadActivities();
        }
    }
    
    useEffect(() => {
        if(props.currentEdit !== props.index){
            setEditor(false);
        }
    }, [props.currentEdit])

    const duration = props.activity.duration;
    // const duration_h = Math.floor(duration/3600);
    const duration_h = Math.floor(duration/60);
    const duration_m = Math.floor(duration%60);
    const duration_text = ((duration_h>0)? duration_h+'h ':' ') + ((duration_h<=0)||duration_m>0? duration_m+'m': '');

    return (
        <div className="history-item" key={props.activity._id} onClick={handdleClick} >
                <div className="history-item-info">
                    <div className='history-item-info-logo'>
                        <Logo logo={props.activity.activity_type} class='history-icon' />
                    </div>
                    <div id="history-item-info-name">{props.activity.name}</div>
                    <div id="history-item-info-description">{props.activity.detail}</div>
                    <div id="history-item-info-date">{new Date(props.activity.date).toLocaleDateString()}</div>
                    <div id="history-item-info-duration">{duration_text}</div>
                </div>
                {
                    editor &&
                    <div className="history-edit">
                        <div className="history-edit-btn" onClick={handdleEdit}>
                            <Logo logo='edit' class='edit-icon' />
                        </div>
                        <div className="history-edit-btn" onClick={handdleRemove} >
                            <Logo logo='trash' class='edit-icon' /> 
                        </div>
                    </div>
                }
            </div>
    );
}

export default HistoryItem;