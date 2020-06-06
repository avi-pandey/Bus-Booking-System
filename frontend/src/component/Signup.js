import React, { useState } from 'react'
import * as userApi from '../api/user'
import * as emailApi from '../api/user-email'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { Link } from 'react-router-dom'


const Signup = ({ history }) => {

    let [user, setUser] = useState({
        name: '',
        email: '',
        mobileno: '',
        password: '',
        dob: '',
        gender: ''
    })
    let [message, setMessage] = useState({})
    let [emailAuth, setEmailAuth] = useState({})


    const handleChangeEvent = (e, field) => {
        let fieldValue = e.target.value

        setUser({ ...user, [field]: fieldValue })
        console.log(user)
    }
    const handleChange = (date, field) => {
        let fieldValue = date
        setUser({ ...user, [field]: fieldValue })
    }
    const validateName = () => {
        if (user.name.length === 0) {
            setMessage({ ...message, name: "Name Required" })
        }
        return
    }
    const validateEmail = () => {
        if (user.name.length === 0) {
            setMessage({ ...message, name: "Name Required" })
        }
        else if (user.email.length === 0) {
            setMessage({ ...message, email: "Email Required" })
        }
        emailApi.emailAuth(user.email)
            .then(response => response.data)
            .then(user => {
                console.log(user)
                setEmailAuth(user)
            })
    }
    const validateMobile = () => {
        if (user.name.length === 0) {
            setMessage({ ...message, name: "Name Required" })
        }
        else if (user.email.length === 0) {
            setMessage({ ...message, email: "Email Required" })

        } else if (user.mobileno.length === 0) {
            setMessage({ ...message, mobileno: "Mobile No Required" })
        }


    }

    const validatePassword = () => {
        if (user.name.length === 0) {
            setMessage({ ...message, name: "Name Required" })
        }
        else if (user.email.length === 0) {
            setMessage({ ...message, email: "Email Required" })

        } else if (user.mobileno.length === 0) {
            setMessage({ ...message, mobileno: "Mobile No Required" })
        } else if (user.password.length === 0) {
            setMessage({ ...message, password: "Password Required" })
        }
    }
    const validateDob = () => {
        if (user.name.length === 0) {
            setMessage({ ...message, name: "Name Required" })
        }
        else if (user.email.length === 0) {
            setMessage({ ...message, email: "Email Required" })

        } else if (user.mobileno.length === 0) {
            setMessage({ ...message, mobileno: "Mobile No Required" })
        } else if (user.password.length === 0) {
            setMessage({ ...message, password: "Password Required" })
        } else if (user.dob.length === 0) {
            setMessage({ ...message, dob: "DOB Required" })
        }
    }
    const validateGender = () => {
        if (user.name.length === 0) {
            setMessage({ ...message, name: "Name Required" })
        }
        else if (user.email.length === 0) {
            setMessage({ ...message, email: "Email Required" })

        } else if (user.mobileno.length === 0) {
            setMessage({ ...message, mobileno: "Mobile No Required" })
        } else if (user.password.length === 0) {
            setMessage({ ...message, password: "Password Required" })
        } else if (user.dob.length === 0) {
            setMessage({ ...message, dob: "DOB Required" })
        } else if (user.gender.length === 0) {
            setMessage({ ...message, gender: "Gender Required" })
        }
        return
    }

    const handleSubmitEvent = e => {
        e.preventDefault()
        validateGender()
        userApi.signup(user)
            .then(response => response.data)
            .then(user => {
                history.push('/login')
            })

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
                        <Link className="nav-link font-weight-bold text-dark margin-right-2em"
                            to="/login"
                            id="login">
                            Log in</Link>
                    </li>
                </ul>
            </nav>



            <div className="row ">
                <div className="col-6 offset-md-3">
                    <div className="card row col-6 offset-md-3 card-op margin-top-6em">
                        <div className="card-body">
                            <form  noValidate onSubmit={e => handleSubmitEvent(e)}>
                                <div className="form-group">
                                    <label className="text-dark">Name</label>
                                    <input className="form-control card-op" onBlur={validateName} onChange={e => handleChangeEvent(e, 'name')} />
                                    <div id="name-feedback" className="text-danger">{message.name}</div>
                                </div>
                                <div className="form-group">
                                    <label className="text-dark">Email</label>
                                    <input className="form-control card-op" onBlur={validateEmail} onFocus={validateName} onChange={e => handleChangeEvent(e, 'email')} />
                                    <div id="email-feedback" className="text-danger">{message.email}</div>
                                    <div id="email-auth" className="text-danger">{emailAuth.message}</div>


                                </div>
                                <div className="form-group">
                                    <label className="text-dark">Mobile No.</label>
                                    <input className="form-control card-op" onBlur={validateMobile} onFocus={validateEmail} onChange={e => handleChangeEvent(e, 'mobileno')} />
                                    <div id="mobile-feedback" className="text-danger">{message.mobileno}</div>

                                </div>
                                <div className="form-group">
                                    <label className="text-dark">Password</label>
                                    <input type="password" className="form-control card-op" onBlur={validatePassword} onFocus={validateMobile} onChange={e => handleChangeEvent(e, 'password')} />
                                    <div id="password-feedback" className="text-danger">{message.password}</div>

                                </div>
                                <div className="form-group">
                                    <label className="text-dark">DOB</label><br />
                                    <DatePicker name='dob' className="form-control card-op padding-right"
                                        selected={user.dob} onFocus={validatePassword} onBlur={validateDob}
                                        onChange={date => handleChange(date, 'dob')} />
                                    <div id="dob-feedback" className="text-danger">{message.dob}</div>

                                </div>
                                <div className="form-group">
                                    <label className="text-dark">Gender</label> <br />
                                    <input type="radio" className="card-op mr-2" value="male" onBlur={validateGender}
                                        onFocus={validateDob} name="gender" onChange={e => handleChangeEvent(e, 'gender')} /> Male 
                                <input type="radio" className="card-op" value="female" onBlur={validateGender}
                                        onFocus={validateDob} name="gender" onChange={e => handleChangeEvent(e, 'gender')} /> Female
                            <div id="gender-feedback" className="text-danger">{message.gender}</div>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-dark p-2">Create Account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Signup;