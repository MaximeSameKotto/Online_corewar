import React, { useState, useEffect } from 'react'
import { Eclipse } from "react-loading-io";
import "./LoadingCreate.css"
import { useHistory } from 'react-router-dom';
import {AppContext} from "../App";

const LoadingJoin = (props) => {

    const [roomId, setRoomId] = useState("");
    const [champion, setChampion] = useState(null)
    const history = useHistory();
    const context = React.useContext(AppContext);

    useEffect(() => {
        console.log(context)
        context.socket.emit("joinLobby", props.location.state.data, "test")
        context.socket.on("isLobbyJoined", data => {
            console.log(data);
        })
    })

    const getRoomId = () => {
        setTimeout(() => {history.push("/game")}, 3000)
    }

    const handleFileUpload = (file) => {
        setChampion(file);
        console.log(file.target.value)
    }

    return (
      <div className="wrap-load">
      <Eclipse className="test" size={200} color="white"/>
      <div class="upload-btn-wrapper">
        <button class="btn">Upload a champion</button>
        <input type="file" name="myfile" onChange={(file) => handleFileUpload(file)}/>
        </div>
      </div>
)}

export default LoadingJoin