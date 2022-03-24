
import './HistoryDate.css';

function HistoryDate(props) {
    return(
        <div className="date">
            <div className="date-each"><div>{props.isMobile? 'Sa': 'Sunday'}</div><div>12</div></div>
            <div className="date-each"><div>Su</div><div>13</div></div>
            <div className="date-each today"><div>Mo</div><div>14</div></div>
            <div className="date-each"><div>Tu</div><div>15</div></div>
            <div className="date-each"><div>We</div><div>16</div></div>
        </div>
    );
}

export default HistoryDate;