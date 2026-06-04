import API from "./api";

export const createChat = async () => {

    const token = localStorage.getItem("token");

    const response = await API.post(
        "/chat/create",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const sendMessage = async (
    chatId,
    message
) => {

    const token = localStorage.getItem("token");

    const response = await API.post(
        "/chat/send",
        {
            chatId,
            message,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const getMessages = async(id)=>{

    let token = localStorage.getItem("token");

    let response = await API.get(`/chat/${id}/messages`,{
        headers: {
            Authorization :`Bearer ${token}`,
        },
    }
);
     return response.data;
}

export const getAllChats = async()=> {
    let token = localStorage.getItem("token");

    let response = await API.get("/chat/all",
        {
        headers : 
        {
            Authorization : `Bearer ${token}`,
        },
    }
)
   return response.data;
}