import React, { useState } from 'react'
import * as userApi from '../api/user'
import { Link } from 'react-router-dom'

const Login = ({ history }) => {

    const [cred, setCred] = useState({
        email: '',
        password: ''

    })
    const [message, setMessage] = useState({})

    const handleChangeEvent = (e, field) => {
        let fieldValue = e.target.value
        setCred({ ...cred, [field]: fieldValue })
    }

    const validateEmail = (e) => {
        if (cred.email.length === 0) {
            setMessage({ ...message, email: "Email Required" })
        }
    }
    const validate = (e) => {
        if (cred.email.length === 0) {
            setMessage({ ...message, email: "Email Required" })
        } else if (cred.password.length === 0) {
            setMessage({ ...message, password: "Password Required" })
        } else if (cred.password.length < 7) {
            setMessage({ ...message, passwordLength: "Password length should be > 7" })
        }
    }

    const handleSubmitEvent = e => {
        e.preventDefault()
        userApi.login(cred)
            .then(response => response.data)
            .then(data => {
                let { token } = data
                sessionStorage.setItem('authToken', token)
                history.push('/search/bus')
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
                            id="signin"
                            to="/">
                            Sign in</Link>
                    </li>
                </ul>
            </nav>

        <div className="row ">
            <div className="col-6 offset-md-3">
                <div className="card row col-6 offset-md-3 card-op margin-top-6em">
                    <div className="card-body">
                        <form noValidate onSubmit={e => handleSubmitEvent(e)}>
                            <div className="form-group">
                                <label className="text-dark">Email</label>
                                <input className="form-control card-op" onChange={e => handleChangeEvent(e, 'email')} />
                                <div id="email-feedback" className="text-danger">{message.email}</div>

                            </div>
                            <div className="form-group">
                                <label className="text-dark">Password</label>
                                <input type="password" className="form-control card-op" onClick={e => validateEmail(e)} onChange={e => handleChangeEvent(e, 'password')} />
                                <div id="password-feedback" className="text-danger">{message.password}</div>
                                <div id="pass-feedback" className="text-danger">{message.passwordLength}</div>

                            </div>
                            <div className="text-center">
                                <button className="btn btn-dark" onClick={e => validate(e)} >Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div >
    )
}

export default Login;