import React,{useState,useEffect, useRef} from 'react';
import './App.css';

export default function MessageBox({socket, userName, room}) {
  const [message, setmessage] = useState('');
  const[msgList, setMsgList] =useState([]);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if (message!== '') {
      const msgData ={
        room: room,
        userName: userName,
        message: message,
        time: new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      }
    
    await socket.emit("send_msg",msgData);
    setMsgList((list)=>[...list, msgData]);
    setmessage('')
    }

  }
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  

  useEffect(() => {
   socket.on("recieve_msg",(data)=>{
    setMsgList((list)=>[...list, data]);
   })
  }, [socket])
  
  return (
    <div className='msg_container'>
    <div className='msg_root'>
       {msgList.map((item) => {
            return (
              
      <div className='msg_card'  id={userName ===item.userName ? "you" : "other"}>
        <div className='msg_div'>
        <p>{item.message}</p>
        <small>{item.userName}</small>
        <small>{item.time}</small>
        </div>
      </div>)}
      )}
      <AlwaysScrollToBottom />
      
     
    </div>
     <div className='msg_box'>
        <form onSubmit={handleSubmit}>
          <input type={'text'} placeholder="Type Here" value={message} onChange={(e)=>setmessage(e.target.value)}/>
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}
