import { Link } from 'react-router-dom';

import HistoryItems from "../../components/HistoryItems/HistoryItems";
import HistoryDate from '../../components/HistoryDate/HistoryDate';

import './History.css';

function History(props) {

    const dayToDayName = (dayNumber) => {
        switch(dayNumber){
            case 0:
                return props.isMobile? 'SU': 'Sunday';
            case 1:
                return props.isMobile? 'MO': 'Monday';
            case 2:
                return props.isMobile? 'TU': 'Tuesday';
            case 3:
                return props.isMobile? 'WE': 'Wednesday';
            case 4:
                return props.isMobile? 'TH': 'Thursday';
            case 5:
                return props.isMobile? 'FR': 'Friday';
            case 6:
                return props.isMobile? 'SA': 'Saturday';
        }
    }

    return (
        <div className="history-container">
            {   props.isLogin &&
                ( 
                    <div className="history-container-blog">
                        <div className="history-container-blog-top">
                            <h1>{props.activitiesFilter? `${dayToDayName(props.activitiesFilter.getUTCDay())}, ${props.activitiesFilter.getDate()}/${props.activitiesFilter.getMonth()}/${props.activitiesFilter.getFullYear()}`:'All activities'}</h1>
                            {!props.isMobile && <Link to='/add-activity'><button className="add-activity-btn btn" >Add activity</button></Link>}
                            {props.isMobile &&
                                <Link to='/add-activity'>
                                    <svg className="add-activity-btn-mobile"><svg width="100%" viewBox="0 0 24 24" height="100%"> <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path> </svg> </svg>
                                </Link>
                            }
                        </div>
                        <HistoryDate isMobile={props.isMobile} activitiesFilter={props.activitiesFilter} setActivitiesFilter={props.setActivitiesFilter} dayToDayName={dayToDayName}/>
                        <HistoryItems 
                            activities={props.activities} 
                            loginData={props.loginData} 
                            loadActivities={props.loadActivities} 
                            activityToUpdate={props.activityToUpdate}
                            setActivityToUpdate={props.setActivityToUpdate}
                        />
                        {
                            props.activitiesCount > 5 &&
                            <div className='history-page-controller'>
                                <div>
                                    <div>{props.pageNow > 0 && <button onClick={() => {props.loadActivities(props.pageNow-1)}}>{'<'}</button>}</div>
                                    <div>{props.pageNow+1}/{Math.ceil(props.activitiesCount/5)}</div>
                                    <div>{(props.pageNow+1)*5 < props.activitiesCount && <button onClick={() => {props.loadActivities(props.pageNow+1)}}>{'>'}</button>}</div>
                                </div>
                            </div>
                        }
                    </div>
                )
            }
            {
                !props.isLogin &&
                <div className="history-container-blog">Please login or register first to add or view your activities</div>
            }
        </div>
    );
}

export default History;