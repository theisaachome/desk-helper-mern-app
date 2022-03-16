import {useState} from 'react'

const Login = () => {
    
    // formData
    const [formData, setFormData] = useState({
        email:"",
        password:""
    });
    // destructure formData
    const {email,password} = formData;

    // setup input data
    const onChange = (e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        const userData = {
            email,
            password
        }
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