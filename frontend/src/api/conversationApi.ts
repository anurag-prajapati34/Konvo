import axios from "axios";

const startConversation=async (participants:string[])=>{

    try{
        const res= await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/conversation/start`,{participants});

        if(!res.data.success){
            console.log("Error starting conversation",res.data.error);
            return null;
        }

        return res.data.conversation;
        
    }
    catch(error){

        console.log("Error starting conversation",error);
        return null;

    }

}

const getConversations=async (conversationId:string)=>{

    const res=await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/conversation/all`,{
        params:{conversationId}
    });
    if(!res.data.success){
        return null;

    }
    return res.data.conversations;
}

export {startConversation,getConversations};