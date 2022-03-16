import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux';

const useAuthStatus = () => {
    const [loggedIn, setloggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

   const {user}= useSelector((state)=>state.user);
    useEffect(() => {
      if(user){
        setloggedIn(true)
      }else{
        setloggedIn(false);
      }
      setCheckingStatus(false);
    }, [user])
    
  return {loggedIn,checkingStatus}
}

export default useAuthStatus