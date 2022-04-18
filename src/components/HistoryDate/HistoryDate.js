
import './HistoryDate.css';

import { useState, useEffect, useRef } from 'react';

function HistoryDate(props) {

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterday2 = new Date();
    yesterday2.setDate(yesterday2.getDate() - 2);

    const [ day1, setDay1 ] = useState(yesterday2);
    const [ day2, setDay2 ] = useState(yesterday);
    const [ day3, setDay3 ] = useState(today);
    const [ selectedFilter, setSelectedFilter ] = useState(0);
    const [ datePicker, setDatePicker ] = useState(today.toISOString().split('T')[0]);

    useEffect(() => {
        if(props.activitiesFilter !== ''){
            const new_today = new Date(props.activitiesFilter);
            const new_yesterday = new Date(new_today);
            new_yesterday.setDate(new_yesterday.getDate() - 1);
            const new_tomorrow = new Date(new_today);
            new_tomorrow.setDate(new_tomorrow.getDate() + 1);
            setDay2(new_today);
            setDay1(new_yesterday);
            setDay3(new_tomorrow);
            setDatePicker(new_today.toISOString().split('T')[0]);
            setSelectedFilter(1);
        }
    }, [props.activitiesFilter]);

    const handleClick = (filter, select) => {
        props.setLoading(true);
        props.setActivitiesFilter(filter);
        setSelectedFilter(select);
    }

    return(
        <div className="date">
            <div className="date-each" >
                <input className='datepicker' type='date' required value={datePicker} onChange={(e) => { handleClick(new Date(e.target.value), 1)}} />
            </div>
            <div className='date-each noselect' onClick={() => { handleClick(day1, 1)}}>
                <div>{props.dayToDayName(day1.getUTCDay())}</div>
                <div>{day1.getUTCDate()}</div>
            </div>
            <div className={selectedFilter===1?'date-each date-selected noselect':'date-each noselect'} onClick={() => { handleClick(day2, 1)}}>
                <div>{props.dayToDayName(day2.getUTCDay())}</div>
                <div>{day2.getUTCDate()}</div>
            </div>
            <div className='date-each noselect' onClick={() => { handleClick(day3, 1)}}>
                <div>{props.dayToDayName(day3.getUTCDay())}</div>
                <div>{day3.getUTCDate()}</div>
            </div>
            <div className={selectedFilter===0?'date-each date-selected noselect':'date-each noselect'} onClick={() => {handleClick('', 0)}}><div>All</div></div>
        </div>
    );
}

export default HistoryDate;