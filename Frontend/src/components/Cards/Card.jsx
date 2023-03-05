import './Cards.css'
import { Link } from 'react-router-dom'
const Cards = (props) =>{
    const { title, user, req , img , type } = props.details
    return (
        <>
        <div class="user-item">
                        <div class="user-item-card">
                            <div class="content">
                                <label>{title?title:'Request For Blood'}</label>
                                {/* <span>
                                    Username:<span class="content-title">blueleopard527 </span>
                                </span> */}
                                {user&&<span
                                >Email:
                                    <span class="content-title"
                                    >{user}</span>
                                </span>}
                                <span><small>{props.children}</small></span>
                            </div>
                            <div class="user-item-media">
                                <div class="media-top">
                                    {img&&<img
                                        src="https://tinypic.host/images/2023/02/21/pikrepo.com-2.jpg"
                                        alt="Image"
                                    />}
                                    <label ><b>{req?req:'B'}</b></label>
                                </div>
                                {/* <div class="media-name">
                                    <p>Olaí Monteiro</p>
                                </div> */}
                            </div>
                        </div>
                        {type=='request'&&<div class="user-item-request">
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