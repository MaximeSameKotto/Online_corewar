import React, { useState } from 'react'

export default function Lobby () {

    const [canvasArray, setCanvasArray] = useState([0, 1, 2, 3, 4, 5])

    return (
        <>
        <canvas ref={canvasArray} width={640} height={425} ></canvas>
        <h1>Game</h1>
        </>
    )
}