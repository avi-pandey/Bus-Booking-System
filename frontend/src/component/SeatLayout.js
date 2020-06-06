import React, { useEffect, useState } from 'react'
import * as seatApi from '../api/bus-seat'
import { useSelector, useDispatch } from 'react-redux'

const SeatLayout = (props) => {


    const dispatch = useDispatch()
    const [busNumber, setBusNumber] = useState(props.busNumber)

    const reservedSeats = useSelector(state => state.seats.reservedSeats)
    const selectedSeats = useSelector(state => state.seats.selectedSeats) || []

    const handleEvent = (e, seatNumber) => {
        if (!reservedSeats.includes(seatNumber))
            dispatch({ type: 'SELECT_SEATS', seatNumber })
    }
    let seats = []
    for (let i = 1; i <= 40; i++) {
        seats.push(i);
    }


    useEffect(() => {
        seatApi.getResevedSeats(busNumber)
            .then(response => response.data)
            .then(data => {
                if (data.result > 0) {
                    let reservedSeats = data.result.reservation.reservedSeats
                    dispatch({ type: 'LOAD_RESERVED_SEATS', reservedSeats })

                }
                let fare = data.result.service.fare
                dispatch({ type: 'FARE', fare })

            })

    }, [])

    const changeBgColor = (item) => {
        if (reservedSeats.includes(item))
            return 'black'
        if (selectedSeats.includes(item))
            return 'white'
        else
            return 'grey'
    }

    const renderSeats = () => {
        return seats.map(item => {
            return (

                <span scope="col" style={{
                    margin: '5px', fontSize: '15px',
                    cursor: 'pointer',
                    backgroundColor: changeBgColor(item)
                }}
                    onClick={e => handleEvent(e, item)}
                    className="badge" key={item} >
                    {item}
                </span>
            )
        })
    }
    return (
        <div className="" style={{ width: '200px', height: '400px' }}>
            {renderSeats()}
        </div>
    );
}

export default SeatLayout;
