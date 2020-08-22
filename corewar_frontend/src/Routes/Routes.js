import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from "../components/Home"
import LoadingCreate from '../components/LoadingCreate'
import Lobby from '../components/Room'
import LoadingJoin from '../components/Loadingjoin'


export default function Routes(props) {
    return (
        <>
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/create_room" exact component={LoadingCreate}/>
            <Route path="/lobby" exact component={Lobby}/>
            <Route path="/join_room" exact component={LoadingJoin}/>
        </Switch>
        </BrowserRouter>
        </>
)}    