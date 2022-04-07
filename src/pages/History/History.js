import { Link } from 'react-router-dom';

import HistoryItems from "../../components/HistoryItems/HistoryItems";
import HistoryDate from '../../components/HistoryDate/HistoryDate';

import './History.css';

function History(props) {

    return (
        <div className="history-container">
            {   props.isLogin &&
                ( 
                    <div className="history-container-blog">
                        <div className="history-container-blog-top">
                            <h1>Monday, 14</h1>
                            {!props.isMobile && <Link to='/add-activity'><button className="add-activity-btn btn" >Add activity</button></Link>}
                            {props.isMobile &&
                                <Link to='/add-activity'>
                                    <svg class="add-activity-btn-mobile"><svg width="100%" viewBox="0 0 24 24" height="100%"> <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path> </svg> </svg>
                                </Link>
                            }
                        </div>
                        <HistoryDate isMobile={props.isMobile} />
                        <HistoryItems histories={props.histories} />
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