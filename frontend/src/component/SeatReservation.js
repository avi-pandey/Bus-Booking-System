
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import * as seatsApi from '../api/seat-reserve'
import { useDispatch } from 'react-redux'

const SeatReservation = (props) => {


    let selectedSeats = useSelector(state => state.seats.selectedSeats) || []
    let rsrvInfo = [];
    const [busNumber, setBusnumber] = useState(props.busNum)
    const fare = useSelector(state => state.seats.fare)
    const dispatch = useDispatch()
    const [info, setInfo] = useState({
        name: '',
        age: '',
    })

    const [message, setMessage] = useState({})
    const [disab, setDisab] = useState(true)

    console.log(info, "hello info")






    const validate = (e) => {
        console.log('onchange')
        if (info.name.length === 0) {
            setMessage({ ...message, name: "name is required" })
        } else if (info.age.length === 0) {
            setMessage({ ...message, age: "Age required" })
        }
    }

    const handleChangeEvent = (e, field) => {
        let fieldValue = e.target.value
        setInfo({ ...info, [field]: fieldValue })
        if (info.name.length > 0 && info.age.length) {
            setDisab(false)
        } else {
            setDisab(true)
        }
    }
    const handleSeats = (item) => {
        rsrvInfo.push({
            'name': info,
            'seats': item
        })

    }
    console.log(rsrvInfo, "heloo reser")


    console.log(info)

    const seatData = {
        busNumber: busNumber,
        seats: selectedSeats
    }
    console.log(seatData)

    let total = fare * selectedSeats.length + 60
    dispatch({ type: 'RESERVATION_TOTAL_FARE', total })
    dispatch({ type: 'RESERVATION_INFO', rsrvInfo })



    const renderTotalFare = (fare, total) => {
        if (selectedSeats.length > 0) {
            return (
                <table>
                    <tbody>
                        <tr>
                            <td className="text-white font-weight-bold p-3">Seat Fare:<br></br>
                                <span class="WebRupee">&#x20B9;</span> {fare}</td>
                            <td className="text-white font-weight-bold p-3">Service tax:<br></br>
                                <span class="WebRupee">&#x20B9;</span> 60</td>
                            <td className="text-white font-weight-bold p-3">Total Fare:<br></br>
                                <span class="WebRupee">&#x20B9;</span> {total}</td>
                        </tr>
                    </tbody>
                </table>
            )
        }
        return
    }



    const handleSubmitEvent = (seatData) => {
        seatsApi.seatReserve(seatData)
            .then(response => response.data)
            .then(data => {
                console.log(data)
            })
        props.tab(3)
    }

    const renderHeading = () => {
        if (selectedSeats.length > 0) {
            return (
                <h4 className="text-white font-weight-bold">
                    Selected seats : {selectedSeats.join(",")}
                </h4>
            )
        }
        return
    }
    const renderButton = () => {
        if (selectedSeats.length > 0) {
            return (
                <button onClick={e => handleSubmitEvent(seatData)}
                    disabled={disab} className="btn btn-dark">Checkout</button>
            )
        }
        return
    }


    const renderNameAgeFields = () => {
        return selectedSeats.map(item => {
            return (

                <li className="list-group-item card-op card card-body" key={item}>
                    <span className="badge badge-dark card-op" >{handleSeats(item)}{item}</span>
                    <div className="row">
                        <div className="col-9 ">
                            <input className="form-control card-op" placeholder="Name"
                                onBlur={e => validate(e)} onChange={e => handleChangeEvent(e, 'name')} />
                            <div id="name-feedback" className="text-danger">{message.name}</div>
                        </div>
                        <div className="col-3 ">
                            <input className="form-control card-op" placeholder="Age"
                                onChange={e => handleChangeEvent(e, 'age', info)}
                                onBlur={e => validate(e)} />
                            <div id="age-feedback" className="text-danger">{message.age}</div>
                        </div>
                    </div>
                </li>
            )
        })
        return
    }

    return (
        <div>
            {renderHeading()}
            <ul>
                {renderNameAgeFields()}
            </ul>
            <ul>
                {renderTotalFare(fare, total)}
            </ul>
            {renderButton()}
        </div>
    );
};

export default SeatReservation;