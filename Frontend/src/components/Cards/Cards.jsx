import './Cards.css'
import Card from './Card'
const Cards = (props) => {
    var details = {
        // user:'Olaí Monteiro',
        title: 'Required B+ve',
        req: 'AB',
        type: 'request',

    }
    if (props.details.type == 'availability') {
        details = {
            title: 'Donars Available',
            req: null,
            type: 'availability',
        }
        return (
            <div className="user-list no-animation">
                <Card details={details}>12200+</Card>
                <Card details={details}>2000+</Card>
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