import React, { useState } from 'react'
import * as busApi from '../api/bus-search'
import { Link, useHistory } from 'react-router-dom'
import SeatLayout from './SeatLayout'
import SeatReservation from './SeatReservation'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Confirmation from './Confirmation'
import moment from 'moment'

import Payment from './Payment'
const SearchBus = () => {

    const [searchResult, setSearchReasult] = useState([])
    const [travelPlan, setTravelPlan] = useState({})
    const [tab, setTab] = useState(1)
    const [busNum, setBusNumber] = useState({})
    const history = useHistory()


    const handleSubmitEvent = e => {
        e.preventDefault()
        busApi.busSearch(travelPlan)
            .then(response => response.data)
            .then(data => {
                setSearchReasult(data.result)
            })
    }


    const logOut = (e) => {
        sessionStorage.clear();
        history.push('/login')
    }

    const handleChange = (date, field) => {
        let fieldValue = date
        setTravelPlan({ ...travelPlan, [field]: fieldValue })
    }


    const changeTab = (tab) => {
        setTab(tab)
    }

    const viwSeats = (e, busNumber, tab) => {
        e.preventDefault()
        setTab(tab)
        setBusNumber(busNumber)

        renderTabPanel(tab)

    }

    const renderTabPanel = (tab) => {
        switch (tab) {
            case 1: return (
                <div>
                    <div>
                        <div className="card card-body card-op tab-pane fade show active " id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div>
                                <form className="form-inline" noValidate onSubmit={e => handleSubmitEvent(e)}>
                                    <div className="form-group mr-5">
                                        <label className="sr-only">From</label>
                                        <datalist id="cities">
                                            <option>AGRA</option>
                                            <option>LUCKNOW</option>
                                            <option>KOLKATA</option>
                                            <option>KANPUR</option>
                                            <option>BENGALORE</option>
                                            <option>CHENNAI</option>
                                        </datalist>
                                        <input type="text"
                                            list="cities"
                                            onChange={e => handleChangeEvent(e, 'from')}
                                            className="form-control " placeholder="From" />
                                    </div>
                                    <div className="form-group mr-5">
                                        <label className="sr-only">To</label>
                                        <datalist id="cities">
                                        </datalist>
                                        <input type="text"
                                            list="cities"
                                            onChange={e => handleChangeEvent(e, 'to')}
                                            className="form-control" placeholder="To" />
                                    </div>
                                    <div className="form-group">
                                        <label className="sr-only">Travel Date</label>
                                        <DatePicker type="text"
                                            name="trvDate"
                                            selected={travelPlan.trvDate}
                                            onChange={date => handleChange(date, 'trvDate')}
                                            placeholderText='Date'
                                            className="form-control" placeholder="Travel Date" />
                                    </div>
                                    <button className="ml-5 btn btn-primary">search</button>
                                </form>
                            </div>
                        </div>
                        <div className="card-op mt-5">{renderItems(searchResult)}</div>
                        <h1 className="text-danger">{searchResult.message}</h1>
                    </div>
                </div>
            )
            case 2: return (
                <div className="row">
                    <div className="col-6">
                        <SeatLayout busNumber={busNum} />

                    </div>
                    <div className="col-6 ">
                        <SeatReservation tab={val => changeTab(val)} busNum={busNum} />
                    </div>
                </div>
            )

            case 3: return (
                <Payment tab={val => changeTab(val)} />
            )

            case 4: return (
                <div>
                    <Confirmation />
                </div>
            )
            default: return null


        }
    }

    const renderItems = (searchResult) => {
        return searchResult.map((result => {
            return (
                <table class="table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Bus Type</th>
                            <th scope="col">Departure</th>
                            <th scope="col">Arrival</th>
                            <th scope="col">Travel Date</th>
                            <th scope="col">Total Seats</th>
                            <th scope="col">Fare</th>
                            <th scope="col">View Seats</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope="col">{result.busType}</td>
                            <td scope="col">{result.service.dep}</td>
                            <td scope="col">{result.service.arr}</td>
                            <td scope="col">{moment(result.service.trvDate).format('MMM Do YY')}</td>
                            <td scope="col">{result.totalSeats}</td>
                            <td scope="col">{result.service.fare}</td>
                            <td scope="col"><button type="button" onClick={e => viwSeats(e, result.busNumber, 2)} className="btn btn-primary">View Seats</button></td>
                        </tr>
                    </tbody>
                </table>
            )

        }))

    }


    const handleChangeEvent = (e, field) => {
        const fieldValue = e.target.value
        setTravelPlan({ ...travelPlan, [field]: fieldValue })
        console.log(travelPlan)
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg fixed-top navbar-light shadow-sm p-1 mb-5">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <ul className="navbar-nav ml-auto " >
                    <li className="nav-item">
                        <button className="bg-danger m-4" onClick={e => logOut(e)} >Logout</button>
                    </li>
                </ul>
            </nav>

            <ul className="nav nav-tabs row col-9 offset-md-3 " id="myTab" >
                <li className="nav-item margin-top-6em">
                    <Link className={tab === 1 ? "nav-link active" : 'text-dark bg-secondary nav-link'} id="home-tab" data-toggle="tab" to="/search/bus" role="tab" aria-controls="home" aria-selected="true">Plan Your Trip</Link>
                </li>
                <li className="nav-item margin-top-6em">
                    <a className={tab === 2 ? "nav-link active" : 'text-dark bg-secondary nav-link'} id="profile-tab" data-toggle="tab" href="#seat/layout" role="tab" aria-controls="profile" aria-selected="false">Select Your Seats</a>
                </li>
                <li className="nav-item margin-top-6em">
                    <a className={tab === 3 ? "nav-link active" : 'text-dark bg-secondary nav-link'} id="contact-tab" data-toggle="tab" href="#payment" role="tab" aria-controls="contact" aria-selected="false">Payments</a>
                </li>
                <li className="nav-item margin-top-6em">
                    <a className={tab === 4 ? "nav-link active" : 'text-dark bg-secondary nav-link'} id="confirmation-tab" data-toggle="tab" href="#ticket-confirmation" role="tab" aria-controls="confirmation" aria-selected="false">Ticket Confirmation</a>
                </li>
            </ul>

            <div className="tab-content mt-5 container" id="myTabContent">
                {renderTabPanel(tab)}
            </div>

        </div>

    )
}


export default SearchBus;