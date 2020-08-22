import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Routes from './Routes/Routes'
import socketIOClient from 'socket.io-client'

const ENDPOINT = 'http://localhost:8000'

export const AppContext = React.createContext(undefined);


function App() {

  const [socket, setSocket] = useState()

  useEffect(() => {
    console.log("connect")
    setSocket(socketIOClient(ENDPOINT))
  }, [])

  return (
    <AppContext.Provider value={{
      socket: socket
    }}>
    <Routes></Routes>
    </AppContext.Provider>
  );
}

export default App;
