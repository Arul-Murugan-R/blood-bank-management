import './CircularDesc.css'

const CircularDesc = () => {
    return (
        <div className="wrapper-desc">
            <div className="circ-cont">
                <div className='bloods' style={{ "--angle": " 0deg" }}>
                    <label>A+</label>
                </div>
                <div className='bloods' style={{ "--angle": " 45deg" }}>
                    <label>B+</label>
                </div>
                <div className='bloods' style={{ "--angle": " 90deg" }}>
                    <label>AB+</label>
                </div>
                <div className='bloods' style={{ "--angle": " 135deg" }}>
                    <label>O+</label>
                </div>
                <div className='bloods' style={{ "--angle": " 180deg" }}>
                    <label>B-</label>
                </div>
                <div className='bloods' style={{ "--angle": " 225deg" }}>
                    <label>A-</label>
                </div>
                <div className='bloods' style={{ "--angle": " 270deg" }}>
                    <label>O-</label>
                </div>
                <div className='bloods' style={{ "--angle": " 315deg" }}>
                    <label>M</label>
                </div>
                <div className="inner-circle">
                    <label>B+ve Donor<br />
                        <b>1200+</b></label>
                </div>
            </div>
            <div className="catchy">
                <label className='heading'><b>B</b>eautiful<br />
                    <b>L</b>ife<br />
                    <b>O</b>nly<br />
                    <b>O</b>n<br />
                    <b>D</b>onating.
                </label>
            </div>
        </div>
    )
}

export default CircularDesc