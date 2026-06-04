import {useEffect,useState} from "react";
import "./ChatPage.css"
import { createChat,sendMessage,getMessages ,getAllChats} from "../services/chatService";


function ChatPage(){

    let [chatId,setChatId] = useState(null);
    let [input,setInput] = useState("");
    let [message,setMessage] = useState([]);
    let [chats,setChats] = useState([]);

    useEffect(()=>{
        
        loadChats();
    },[]);

    let createNewChat = async()=>{
        setMessage([]);
        try{
            let response = await createChat();
            setChatId(response.id);
            setChats((prev)=>[response,...(prev || [])]);
            loadMessages(response.id);
            
        }
        catch(error){
            console.log(error);
        }
    };

    let loadMessages = async(id) =>{

    try{

        let data = await getMessages(id);

        let formatted = data.map((msg)=>({

            sender :
                msg.sender === "USER"
                    ? "user"
                    : "ai",

            text : msg.message,

        }));
        console.log("Formatted" ,formatted);
        setMessage(formatted);

    }

    catch(error){

        console.log(error);
    }
};

    let handlesend = async() => {
        if(!input.trim())
            return;

        if(!chatId)
            return;

        let userMessage = {
            sender:"user",
            text :input,
        };
        setMessage((prev)=>[...prev,userMessage]);

        let currentMessage = input;
        setInput("");
        try{
            let response = await sendMessage(
                chatId,
                currentMessage
            );
            let aiMessage = {
                sender:"ai",
                text : response.reply,
            };

            setMessage((prev)=>[
                ...prev,aiMessage,
            ]);
        }
        catch(error){
            console.log(error);
        }
    }

    let loadChats = async () => {
    try {
        let data = await getAllChats();
        setChats(data);

        if(data.length > 0){
            setChatId(data[0].id);
            await loadMessages(data[0].id);
        }

    } catch (error) {
        console.log(error);
    }
};

    return (
        <div className="chat-container">
            <div className="sidebar">

                <h1 className="logo">AI Support</h1>
                <button className="new-chat-btn" onClick={createNewChat}>
                    + New Chat
                </button>
                 <div className="chat-list">

        {
            chats?.map((chat)=>(

                <div
                    key={chat.id}
                    className="chat-item"

                    onClick={()=>{
                        setChatId(chat.id);
                        loadMessages(chat.id);
                    }}
                >

                    Chat #{chat.id}

                </div>
            ))
        }

    </div>
            </div>
            <div className="chat-area" >
                <div className="chat-header" >
                    <h2>
                        Customer support Chat
                    </h2>
                </div>
                <div className="messages" > {
                    message?.map((msg,index) =>
                    (
                        <div key={index}
                        className={msg.sender === "user" ? "user-message" :"ai-message"
                        }>
                            {msg.text}
                            </div>
                    ))
                    }
                    </div>
                    <div className="chat-input-area">
                        <input type="text" placeholder="Type Your message..." className="chat-input" value={input} onChange={(e)=>setInput(e.target.value)} />
                        <button className="send-btn" onClick={handlesend} >Send</button>
                    </div>
                </div>
            </div>
       
    )
}

export default ChatPage;