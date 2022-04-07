import './Login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../connecter/user';

function Login(props) {

    const [ formEmail, setFormEmail ] = useState('');
    const [ formPassword, setFormPassword ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');


    const handdleChange = (e, formSection) => {
        const value = e.target.value;
        switch(formSection){
            case 'email':
                setFormEmail(value);
                break;
            case 'password':
                setFormPassword(value);
                break;
        }
    }

    const handdleSubmit = async (e) => {
        e.preventDefault();
        const data = await login(formEmail, formPassword)
        if(data.error){
            setErrorMessage(data.error);
        } else {
            if(data._id && data.session){
                props.setId(data._id);
                props.setSession(data.session);
                setErrorMessage('');
            }
        }
    }

    return (
        <div className='login-container'>
            <div className='login-container-blog'>
                <div className='login-top'><h1>Login</h1></div>
                {
                    !props.isLogin &&
                    <form className='login-form' onSubmit={handdleSubmit}>
                        <div className='login-form-row'>
                            <div className='login-form-left'>Email</div>
                            <div className='login-form-right'><input type='email' value={formEmail} onChange={(e) => handdleChange(e, 'email')}/></div>
                        </div>
                        <div className='login-form-row'>
                            <div className='login-form-left'>Password</div>
                            <div className='login-form-right'><input type='password' value={formPassword} onChange={(e) => handdleChange(e, 'password')}/></div>
                        </div>
                        <div className='error-message'>
                            {errorMessage}
                        </div>
                        <div className='login-btn-div'>
                            <button className='register-btn btn'><Link to='/register'>Register</Link></button>
                            <button type='submit' className='login-btn btn'>Login</button>
                        </div>
                    </form>
                }
                {
                    props.isLogin &&
                    <div>
                        You are already login.
                    </div>
                }
            </div>
        </div>
    );
}

export default Login;