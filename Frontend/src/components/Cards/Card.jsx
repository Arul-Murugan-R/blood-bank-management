import './Cards.css'
import { Link } from 'react-router-dom'
const Cards = (props) =>{
    const { title, user, req , img , type } = props.details
    return (
        <>
        <div className="user-item">
                        <div className="user-item-card">
                            <div className="content">
                                <label>{title?title:'Request For Blood'}</label>
                                {/* <span>
                                    Username:<span className="content-title">blueleopard527 </span>
                                </span> */}
                                {user&&<span
                                >Email:
                                    <span className="content-title"
                                    >{user}</span>
                                </span>}
                                <span><small>{props.children}</small></span>
                            </div>
                            <div className="user-item-media">
                                <div className="media-top">
                                    {img&&<img
                                        src="https://tinypic.host/images/2023/02/21/pikrepo.com-2.jpg"
                                        alt="Image"
                                    />}
                                    <label ><b>{req?req:'B'}</b></label>
                                </div>
                                {/* <div className="media-name">
                                    <p>Olaí Monteiro</p>
                                </div> */}
                            </div>
                        </div>
                        {type=='request'&&<div className="user-item-request">
                                <Link to="/more" className="link">
                                    Accept
                                </Link>
                                <Link to="/more" className="link">
                                    View Details
                                </Link>
                        </div>}
                    </div>
        </>
    )
}

export default Cards