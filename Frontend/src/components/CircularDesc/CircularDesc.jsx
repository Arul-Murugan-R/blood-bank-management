import './CircularDesc.css'
import { useEffect, useState } from 'react'
import descData from './descData'
import { color } from '@mui/system'

const CircularDesc = () => {
    const [desc, setDesc] = useState(
        {
            label: 'A+',
            count: '5000',
            color: '#00bfa5'
        }
    )
    const counter = (minimum, maximum) => {
		for (let i = minimum; i <= maximum; i++) {
			setTimeout(() => {
				setDesc((prev) => {
						return {
							...prev,
							count: i,
						};
				});
			}, 30);
		}
	};
    const layerHandler = (e) => {
        console.log(e.target.innerText)
        descData.filter((item) => {
            if (item.label === e.target.innerText) {
                counter(0, item.count)
                setDesc(item)
            }
        })
    }
    return (
        <div className="wrapper-desc">
            <div className="circ-cont">
                <div className='bloods' style={{ "--angle": " 0deg" }} onClick={layerHandler}>
                    <label>A+</label>
                </div>
                <div className='bloods' style={{ "--angle": " 45deg" }} onClick={layerHandler}>
                    <label>B+</label>
                </div>
                <div className='bloods' style={{ "--angle": " 90deg" }} onClick={layerHandler}>
                    <label>AB+</label>
                </div>
                <div className='bloods' style={{ "--angle": " 135deg" }} onClick={layerHandler}>
                    <label>O+</label>
                </div>
                <div className='bloods' style={{ "--angle": " 180deg" }} onClick={layerHandler}>
                    <label>B-</label>
                </div>
                <div className='bloods' style={{ "--angle": " 225deg" }} onClick={layerHandler}>
                    <label>A-</label>
                </div>
                <div className='bloods' style={{ "--angle": " 270deg" }} onClick={layerHandler}>
                    <label>O-</label>
                </div>
                <div className='bloods' style={{ "--angle": " 315deg" }} onClick={layerHandler}>
                    <label>M</label>
                </div>
                <div className="inner-circle" style={{"background":"rgb(181, 30, 35)"}}>
                    <label>{desc.label}ve Donor<br />
                        <b>{desc.count}+</b></label>
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