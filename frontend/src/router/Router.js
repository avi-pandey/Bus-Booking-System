import React from 'react'
import { BrowserRouter as Router, List, Route, Switch } from 'react-router-dom'
import Signup from '../component/Signup';
import Navbar from '../component/Navbar';
import SearchBus from '../component/SearchBus'
import Login from '../component/Login'

const Routers = () => {
    return (
        <div>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" render={props => <Signup {...props} />} />
                    <Route exact path="/login" render={props => <Login {...props} />} />
                    <Route exact path="/search/bus" render={props => <SearchBus {...props} />} />
                </Switch>
            </Router>
        </div>
    )
}

export default Routers;