import {useState,useRef,useEffect} from 'react'
import classes from './Cards.module.css'
import Card from './Card'
import { useSelector } from 'react-redux'
import Modal from '../UI/Modals/Modal'
const Cards = (props) => {
    const myRef = useRef();
    const store = useSelector(state => state.requestData.slice(0,30));
    const [modalDet,setModalDet] = useState({});
    const [modal, setModal] = useState(false);
    const [count,setCount] = useState({donor:0,req:0});
    const modalHandler = (desc) => {
        setModal(true);
        if(desc)
        setModalDet(desc);
    }
    const closeHandler = () => {
        setModal(false);
        setModalDet({});
    }

    const counter = (minimum, maximum,set,title) => {
        for (let i = minimum; i <= maximum; i++) {
            setTimeout(() => {
                set((prev) => {
                    if(title=='donor')
                    return {
                        ...prev,
                        donor: i
                    }
                    else{
                        return {
                            ...prev,
                            req: i
                        }
                    }
                })
            }, 100);
        }
    }
    // useEffect(() => {
    //     const observer = new IntersectionObserver((entries) => {
    //         if (entries[0].isIntersecting) {
    //             counter(0, 12000,setCount,'donor');
    //             counter(0, 2000,setCount,'req');
    //         }else{
    //             setCount({donor:0,req:0});
    //         }
    //     });
    //     observer.observe(document.querySelector('.userList'));
    //     console.log(myRef.current)
    // },[])
    var details = {}
    if (props.avail == '1') {
        details = {
            title: 'Donors Available',
            req: null,
            type: 'availability',
        }
        return (
            <div className={`${classes.userList} ${classes.noAnimation}`}>
                <Card details={details} >{count.donor}+</Card>
                <Card details={details}>{count.req}+</Card>
            </div>
        )
    }
    var calWid = store.length*22+'vw'
    var trans = (((store.length)*22)-100)+'vw'

    return (
        <>
            <div className={classes.container}>
                <div className={`${classes.userList} ${props.rev?classes.reverse:''} ${store.length<5?classes.lessReq:''}`} width={calWid} 
                    style={{'--transWid':trans,'--transDur':(store.length*4)+'s',animationPlayState:modal?'paused':'',
                }}
                >
                    {store.map((item) => {
                        //const { title, user, req , img , type } = props.details
                        details = {req:item.bloodGroup,title:`Required ${item.bloodGroup}ve`,
                        type:'request',units:item.numberOfUnits,hospital:item.hospitalName,
                        location:item.location,hosAddr:item.hospitalAddress,date:item.requestDeadline,};
                        return <Card details={details}  key={item._id} ref={myRef} 
                            openHandler={modalHandler}
                            >
                            </Card>
                    })}
                    {modal&&<Modal closeModal={closeHandler} data={modalDet} />}
                </div>
            </div>


        </>
    )
}

export default Cards