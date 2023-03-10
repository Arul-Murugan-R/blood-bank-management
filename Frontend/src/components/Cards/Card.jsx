import classes from './Cards.module.css'
import { Link } from 'react-router-dom'
import { useRef , useEffect } from 'react'
const Cards = (props) =>{
    const myRef = useRef();
    useEffect(() => {
        console.log(myRef.current.offsetWidth)
    },[])
    const { title, user, req , img , type,hospital,location,date,hosAddr,units } = props.details
    return (
        <>
        <div className={classes.userItem} ref={myRef}>
                        <div className={classes.userItemCard}>
                            <div className={classes.content}>
                                <label><b>{title?title:'Request For Blood'}</b></label>
                                {user&&<span
                                >Email:
                                    <span className={classes.contentTitle}
                                    >{user}</span>
                                </span>}
                                {hospital&&<span
                                >Hospital:
                                    <span className={classes.contentTitle}
                                    >{" ".concat(...hospital.split(" ",2))}</span>
                                </span>}
                                {date&&<span
                                >Deadline:
                                    <span className={classes.contentTitle}
                                    >{" "+date.split('T')[0]}</span>
                                </span>}
                                {units&&<span
                                >Units:
                                    <span className={classes.contentTitle}
                                    >{' '+units}</span>
                                </span>}
                                <span><small>{props.children}</small></span>
                            </div>
                            <div className={classes.userItemMedia}>
                                <div className={classes.mediaTop}>
                                    {img&&<img
                                        src="https://tinypic.host/images/2023/02/21/pikrepo.com-2.jpg"
                                        alt="Image"
                                    />}
                                    <label ><b>{req?req:'B'}</b></label>
                                </div>
                            </div>
                        </div>
                        {type=='request'&&<div className={classes.userItemRequest}>
                                {/* <Link to="/more" className="link">
                                    Accept
                                </Link> */}
                                <Link onClick={()=>{props.openHandler(props.details)}} className={classes.link}>
                                    View Details
                                </Link>
                        </div>}
                    </div>
        </>
    )
}

export default Cards