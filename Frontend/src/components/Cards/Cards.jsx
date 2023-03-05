import './Cards.css'
import Card from './Card'
const Cards = (props) => {
    const details = {
        // user:'Olaí Monteiro',
        title:'Required B+ve',
        req:'AB',
        type:'request',

    }
    return (
        <>
            <div class="container">
                <div class={"user-list "+props.dir}>
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