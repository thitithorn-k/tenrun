
import Logo from "../../resources/Logo";

import './HistoryItems.css';

function HistoryItems(props) {
    const historiesElement = props.histories.map((history) => {
        const duration = history.duration;
        const duration_h = Math.floor(duration/3600);
        const duration_m = Math.floor((duration%3600)/60);
        const duration_s = Math.floor(duration%60);
        const duration_text = (duration_h>0? duration_h+'h ':' ') + ((duration_h>0||duration_m>0)? duration_m+'m ':' ') + ((duration_h<=0&&duration_m<=0)||duration_s>0? duration_s+'s': '');
        return (
            <div className="history-item">
                <div>
                    <Logo logo={history.type} class='history-icon' />
                </div>
                <div className="history-item-info">
                    <div id="history-item-info-name">{history.name}</div><div id="history-item-info-description">{history.description}</div><div id="history-item-info-date">{history.date}</div><div id="history-item-info-duration">{duration_text}</div>
                </div>
            </div>
        );
    })

    return(
        <div className="history-items">
            {historiesElement}
        </div>
    );
}

export default HistoryItems;