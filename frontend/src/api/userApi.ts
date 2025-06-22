import axios from "axios"

 const getUserProfile=async (userId:string)=>{

  console.log("user id is ",userId);
    try{
      const user= await  axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/profile`,{
        params:{userId}
      });

      if(!user){
        
        console.log("User Not Found");
        return null;
      }

      console.log("user data is ",user.data);
      return user.data.user;

    }catch(error){
        console.log("Error fetching user profile",error);
        return null;

    }

}

export  {getUserProfile}
