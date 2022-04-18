import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSummary } from '../../connecter/connecter';

import './Profile.css';

function Profile(props) {
    let loaded = false;
    const [ summaryData, setSummaryData ] = useState();
    const [ loadingText, setLoadingText ] = useState('Loading.');

    const durationToString = (second) => {
        const duration_h = Math.floor(second/60);
        const duration_m = Math.floor(second%60);
        return ((duration_h>0)? duration_h+(duration_h > 1?' hours ':' hour '):'') + ((duration_h<=0)||duration_m>0? duration_m+(duration_m > 1? ' minutes': ' minute'): '');
    }

    const getActivityName = (activity_type) => {
        switch(activity_type){
            case 'run':
                return 'Running';
            case 'walk':
                return 'Walking';
            case 'swim':
                return 'Swimming';
            case 'bike':
                return 'Biking';
        }
    }

    useEffect(async() => {
        if(props.loginData.token){
            const getSummaryRes = await getSummary(props.loginData.id, props.loginData.token)
            const newData = {
                'today': {
                    duration: getSummaryRes.data.today.reduce((add, each) => add + each.duration, 0),
                    count: getSummaryRes.data.today.reduce((add, each) => add + each.count, 0),
                    activities: getSummaryRes.data.today.sort((a, b) => {return b.duration - a.duration})
                },
                'seven': {
                    duration: getSummaryRes.data.seven.reduce((add, each) => add + each.duration, 0),
                    count: getSummaryRes.data.seven.reduce((add, each) => add + each.count, 0),
                    activities: getSummaryRes.data.seven.sort((a, b) => {return b.duration - a.duration})
                },
                'month': {
                    duration: getSummaryRes.data.month.reduce((add, each) => add + each.duration, 0),
                    count: getSummaryRes.data.month.reduce((add, each) => add + each.count, 0),
                    activities: getSummaryRes.data.month.sort((a, b) => {return b.duration - a.duration})
                }
            }
            setSummaryData(newData);
        }
    }, [props.loginData.token])

    useEffect(() => {
        let timeup = 20;
        const loading = setInterval(() => {
            if(timeup > 0){
                setLoadingText((prev) => prev.length < 11? prev + '.': 'Loading.');
                timeup -= 1;
            } else {
                setLoadingText('Timeout error. Something went wrong.');
                clearInterval(loading);
            }
        }, 500);
        return (() => {
            clearInterval(loading);
        })
    }, []);

    return (
        <div className="profile-container">
            <div className="profile-container-blog">
                {
                    props.isLogin?
                    (
                        <div className='profile-container-blog-content'>
                            <div className='profile-hi'>Hi, {props.loginData.user}</div>
                            <div>
                                {
                                    !summaryData?
                                    (
                                        <div>{loadingText}</div>
                                    ):
                                    (
                                        <div>
                                            <div>
                                                {
                                                    summaryData.today.count === 0?
                                                    <div>You didn't do any activity today</div>
                                                    : 
                                                    <div>
                                                        <div>Today you spent <span className='highlight'>{durationToString(summaryData.today.duration)}</span> on <span className='highlight'>{summaryData.today.count} {summaryData.today.count > 1? 'activities': 'activity'}</span></div>
                                                        <ul className='profile-activities-list'>
                                                            {summaryData.today.activities.map((activity, index) => {
                                                                return <li key={'today'+index}>{getActivityName(activity._id)} {activity.count} {activity.count > 1? 'times': 'time'} ({durationToString(activity.duration)})</li>
                                                            })}
                                                        </ul>
                                                    </div>
                                                }
                                            </div>
                                            <div>
                                                {
                                                    summaryData.seven.count === 0?
                                                    <div>You didn't do any activity in last 7 days</div>
                                                    : 
                                                    <div>
                                                        <div>In last 7 days you spent <span className='highlight'>{durationToString(summaryData.seven.duration)}</span> on <span className='highlight'>{summaryData.seven.count} {summaryData.seven.count > 1? 'activities': 'activity'}</span></div>
                                                        <ul className='profile-activities-list'>
                                                            {summaryData.seven.activities.map((activity, index) => {
                                                                return <li key={'seven'+index}>{getActivityName(activity._id)} {activity.count} {activity.count > 1? 'times': 'time'} ({durationToString(activity.duration)})</li>
                                                            })}
                                                        </ul>
                                                    </div>
                                                }
                                            </div>
                                            <div>
                                                {
                                                    summaryData.month.count === 0?
                                                    <div>You didn't do any activity in this month</div>
                                                    : 
                                                    <div>
                                                        <div>In this month you spent <span className='highlight'>{durationToString(summaryData.month.duration)}</span> on <span className='highlight'>{summaryData.month.count} {summaryData.month.count > 1? 'activities': 'activity'}</span></div>
                                                        <ul className='profile-activities-list'>
                                                            {summaryData.month.activities.map((activity, index) => {
                                                                return <li key={'month'+index}>{getActivityName(activity._id)} {activity.count} {activity.count > 1? 'times': 'time'} ({durationToString(activity.duration)})</li>
                                                            })}
                                                        </ul>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className='profile-welcome'>
                            Welcome to Tenrun!
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Profile;