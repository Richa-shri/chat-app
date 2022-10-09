import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import MessageBox from "./MessageBox";

const socket = io.connect("http://localhost:4001");

function App() {
  const [showmsg, setShowmsg] = useState(false);
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join", room);
      setShowmsg(true);
    }
  };
  return (
    <div className="App">
      {!showmsg ? (
        <div className="container">
          <div className="form_container">
            <input
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Room Id"
              onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      ) : (
        <MessageBox socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
}

export default App;
