import {useState,useRef,useEffect} from 'react'
import './Cards.css'
import Card from './Card'
const Cards = (props) => {
    const donRef = useRef();
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
    },[])
    var details = {
        // user:'Olaí Monteiro',
        title: 'Required B+ve',
        req: 'AB',
        type: 'request',

    }
    if (props.details.type == 'availability') {
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
    return (
        <>
            <div className="container">

                <div className={"user-list " + props.details.dir}>
                    <Card details={details}>We are waiting for your call</Card>
                    <Card details={details}>We are waiting for your call</Card>
                    <Card details={details}>We are waiting for your call</Card>
                    <Card details={details}>We are waiting for your call</Card>
                    <Card details={details}>We are waiting for your call</Card>
                    <Card details={details}>We are waiting for your call</Card>
                    <Card details={details}>We are waiting for your call</Card>
                    <Card details={details}>We are waiting for your call</Card>
                    <Card details={details}>We are waiting for your call</Card>
                    <Card details={details}>We are waiting for your call</Card>
                    <Card details={details}>We are waiting for your call</Card>
                    <Card details={details}>We are waiting for your call</Card>
                    <Card details={details}>We are waiting for your call</Card>
                    <Card details={details}>We are waiting for your call</Card>
                    <Card details={details}>We are waiting for your call</Card>
                    <Card details={details}>We are waiting for your call</Card>
                </div>
            </div>


        </>
    )
}

export default Cards