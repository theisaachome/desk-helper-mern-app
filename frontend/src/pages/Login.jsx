import {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { reset,login } from '../features/auth/authSlice';

const Login = () => {
    
    // formData
    const [formData, setFormData] = useState({
        email:"",
        password:""
    });
    // destructure formData
    const {email,password} = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isLoading, isError, isSuccess, message}=useSelector((state)=>state.auth);
    // setup input data
    const onChange = (e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    useEffect(() => {
      if(isError){
          toast.error(message);
      }
    //   if sucess or user redirect to home page
    if(isSuccess || user){
        navigate('/');
    }
    dispatch(reset());
    }, [user,isSuccess,isError,isLoading,message,navigate,dispatch]);
    

    const onSubmit=(e)=>{
        e.preventDefault();
        const userData = {
            email,
            password
        }
        dispatch(login(userData));
    }
    if(isLoading){
        return <Spinner/>
    }
  return (
    <>
        <section className="heading">
            <h2>Login</h2>
            <p>Please log in to get support</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                    type="email"
                    name="email" 
                    id="email"
                    value={email} 
                    onChange={onChange}
                    required
                    placeholder='Enter your email'
                    className="form-control" />
                </div>
                <div className="form-group">
                    <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={password} 
                    onChange={onChange}
                    className="form-control"
                    required
                    placeholder='Enter your password' />
                </div>
                <div className="form-group">
                    <button className='btn btn-block'>Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login