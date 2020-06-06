import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {


    return (

        <nav className="navbar navbar-expand-lg fixed-top navbar-light shadow-sm p-1 mb-5">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* {<div className="collapse navbar-collapse " id="navbarText">
                <ul className="navbar-nav ml-auto " >
                    <li className="nav-item">
                        <Link className="nav-link font-weight-bold text-dark margin-right-2em"
                            to="/login"
                            id="login"
                        >
                            Log in
                        </Link>
                    </li>
                    <li className="nav-item">

                        <Link className="nav-link font-weight-bold text-dark margin-right-2em"
                            id="signin"
                            to="/">
                            Sign in</Link>

                    </li>
                </ul>
            </div>} */}
        </nav>
    )
}

export default Navbar;