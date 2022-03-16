import {useState} from 'react'
import { toast } from 'react-toastify';

const Register = () => {
    // fields for register
    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:"",
        password2:""

    });
    // destructure formData
    const {username,email,password,password2} = formData;

    // setup input data
    const onChange=(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }));
    }
    // send data to server
    const onSubmit=(e)=>{
        e.preventDefault();
        //  check password match
        if(password !== password2){
            toast.error("Passwords do not match");
        }else{
            const userData = {
                username,
                email,
                password,
            }
            // send data
            console.log(userData);
        }
    }

  return (
    <>
        <section className="heading">
            <h2>Register</h2>
            <p>Please create an account</p>
        </section>
        <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="text" 
                name="username" 
                id="username" 
                className='form-control'
                onChange={onChange}
                value={username}
                required
                placeholder='Enter your name' />
            </div>
            <div className="form-group">
                <input 
                type="email" 
                className='form-control'
                name="email" 
                id="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your email"
                required />
            </div>
            <div className="form-group">
                <input 
                type="password" 
                className='form-control'
                name="password" 
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Enter your password"
                required />
            </div>
            <div className="form-group">
                <input 
                type="password" 
                className='form-control'
                name="password2" 
                id="password2"
                value={password2}
                onChange={onChange}
                placeholder="Confirme your password"
                required />
            </div>
            <div className="form-group">
                <button className='btn btn-block' type="submit">Submit</button>
            </div>
            </form>
        </section>
    </>
  )
}

export default Register