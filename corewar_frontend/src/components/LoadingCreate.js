import React, { useState, useEffect } from 'react'
import { Eclipse } from "react-loading-io";
import "./LoadingCreate.css"
import { useHistory } from 'react-router-dom';
import {AppContext} from "../App";

const LoadingCreate = (props) => {

    const [roomId, setRoomId] = useState("");
    const [champion, setChampion] = useState(null);
    const [champname, setChampname] = useState("Upload a champion")
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [code, setCode] = useState("")
    const context = React.useContext(AppContext);

    useEffect(() => {
        if (roomId == "") {
            context.socket.emit("createLobby", props.location.state.data)
            console.log('emit')
        }
        context.socket.on("isLobbyCreated", data => {
            setRoomId(data);
        }, [])
    })

    useEffect(() => {
        if (code !== "") {
            console.log("code = ", code);
        }
    })

    // useEffect(() => {
    //     context.socket.emit("UploadChampion", code, props.location.state.data);
    //     console.log(code);
    // }, code)

    const onJoin = () => {
        var reader = new FileReader();
        reader.onload = function(event) {
            setCode(event.target.result);
        };
        reader.readAsText(champion);
        var text = reader.result

        context.socket.emit("UploadChampion", " ��Bill                                                                                                                                   Equilibre                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              TT�    	��", props.location.state.data);
    }

    const handleFileUpload = (event) => {
        setChampion(event.target.files[0])
        setChampname(event.target.files[0].name)
    };

    return (
      <div className="wrap-load">
      <Eclipse className="test" size={200} color="white"/>
      <div class="upload-btn-wrapper">
        <button className="btn">{champname}</button>
        <input type="file" name="myfile" onChange={handleFileUpload}/>
        </div>
        <button className="btnplay" onClick={() => onJoin()}>Join !</button>
      </div>
)}

export default LoadingCreate