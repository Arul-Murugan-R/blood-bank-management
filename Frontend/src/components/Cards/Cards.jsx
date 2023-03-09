import {useState,useRef,useEffect} from 'react'
import './Cards.css'
import Card from './Card'
import { useSelector } from 'react-redux'
const Cards = (props) => {
    const myRef = useRef();
    const store = useSelector(state => state.requestData.slice(0,16));
    const [count,setCount] = useState({donor:0,req:0});
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
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                counter(0, 12000,setCount,'donor');
                counter(0, 2000,setCount,'req');
            }else{
                setCount({donor:0,req:0});
            }
        });
        observer.observe(document.querySelector('.user-list'));
        console.log(myRef.current)
    },[])
    var details = {}
    if (props.avail == '1') {
        details = {
            title: 'Donors Available',
            req: null,
            type: 'availability',
        }
        return (
            <div className="user-list no-animation">
                <Card details={details} >{count.donor}+</Card>
                <Card details={details}>{count.req}+</Card>
            </div>
        )
    }
    var i = 0 
    var calWid = store.length*24+'vw'
    var trans = (((store.length-3)*24)-15)+'vw'
    const keyframe = {
        '@keyframes move-around': {
          '0%': {
            transform: `translateX(-${trans})`,
          },
          '100%': {
            transform: `translateX(${trans})`,
          },
        },
        animation: 'move-around 60s linear infinite',
        // animationDirection: `${props.rev?'reverse':''}`,
      };
    return (
        <>
            <div className="container">
                <div className={`user-list${props.rev?' reverse':''}${store.length<6?' less-req':''}`} width={calWid} 
                    style={{'--transWid':trans}}
                >
                    {store.map((item) => {
                        i++
                        //const { title, user, req , img , type } = props.details
                        details = {req:item.bloodGroup,title:`Required ${item.bloodGroup}ve`,
                        type:'request',units:item.numberOfUnits,hospital:item.hospitalName,
                        location:item.location,hosAddr:item.hospitalAddress,date:item.requestDeadline,};
                        return <Card details={details} i={i} key={item._id} ref={myRef} ></Card>
                    })}
                </div>
            </div>


        </>
    )
}

export default Cards