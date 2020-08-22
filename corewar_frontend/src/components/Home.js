import React, { useState } from 'react'
import TextInput from './common/TextInput'
import './Home.scss'
import Particles from 'react-particles-js'
import './Home.css'

export default function Home () {

    const [roomId, setRoomId] = useState("");
    const [userName, setUserName] = useState("");

    const changeUserName = (event) => {
            const value = event.target.value;
            setUserName(value)
    }
    const changeRoomId = (event) => {
        if (userName == "") {
            const value = event.target.value;
            setRoomId(value)
        }
    }

    return (
        <>
        <Particles canvasClassName="canvasp"
            height="70%"
            params={{
                "fps_limit": 30,
                "particles": {
                    "number": {
                        "value": 200,
                        "density": {
                            "enable": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 30,
                        "opacity": 0.4
                    },
                    "move": {
                        "speed": 1
                    },
                    "opacity": {
                        "anim": {
                            "enable": true,
                            "opacity_min": 0.05,
                            "speed": 2,
                            "sync": false
                        },
                        "value": 0.4
                    }
                },
                "polygon": {
                    "enable": true,
                    "scale": 0.5,
                    "type": "inline",
                    "move": {
                        "radius": 10
                    },
                    "url": "small-deer.2a0425af.svg",
                    "inline": {
                        "arrangement": "equidistant"
                    },
                    "draw": {
                        "enable": true,
                        "stroke": {
                            "color": "rgba(255, 255, 255, .2)"
                        }
                    }
                },
                "retina_detect": false,
                "interactivity": {
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "bubble"
                        }
                    },
                    "modes": {
                        "bubble": {
                            "size": 6,
                            "distance": 40
                        }
                    }
                }
            }} />
        <div id="box">
        <div id="wrap">
            <span>root@corewar:~$ </span>
        </div>
        <div id="options">
        <div id="wrap_l">
            <div id="inputbox">
            <span>create-room</span>
            <TextInput placeholder="username" value={userName} change={changeUserName} li="create_room"/>
            </div>
        </div>
        <div id="wrap_r">
            <div id="inputbox">
            <span>join-room</span>
            <TextInput placeholder="room-id" value={roomId} change={changeRoomId} li="join_room"/>
            </div>
        </div>
        </div>
        </div>
        <h4 id="footer">@Corewar Théo Fourcat / Loris Briere / Maxime Same-Kotto / Clément Guichard</h4>
        </>
    )
}
