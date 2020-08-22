import React from 'react'
import {useHistory} from 'react-router-dom'
import './TextInput.css'

export default function TextInput (props) {
    
    const history = useHistory()

    const handleKey = (target) => {
        if(target.charCode==13){
          history.push(`/${props.li}`, {data: props.value})
       }
    }

    return (
        <>
    <div className="win-wrapper">
    <div className="fakeMenu">
        <div className="fakeButtons fakeClose"></div>
        <div className="fakeButtons fakeMinimize"></    div>
        <div className="fakeButtons fakeZoom"></div>
    </div>
    <div className="fakeScreen">
    <p className="line1">$> {props.placeholder}</p>
    <p className="line2">
    <a class="cool-link"><input className="input" type="text" placeholder={props.placeholder} value={props.value} onChange={props.change} onKeyPress={(tar) => handleKey(tar)}></input></a>
    </p>
    </div>
    </div>  
    </>
    )
}
