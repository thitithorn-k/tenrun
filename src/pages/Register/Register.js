import './Register.css';
import { useEffect, useState } from 'react';
import { register } from '../../connecter/connecter.js';

function Register(props) {

    const [ formComplete, setFormComplete ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ formChange, setFormChange ] = useState(0);

    const [ formEmail, setFormEmail ] = useState('');
    const [ formPassword, setFormPassword] = useState('');
    const [ formPasswordConfirm, setFormPasswordConfirm ] = useState('');
    const [ formGender, setFormGender ] = useState('');
    const [ formWeight, setFormWeight ] = useState('');
    const [ formHeight, setFormHeight ] = useState('');
    const [ formDateOfBirth, setFormDateOfBirth ] = useState('');

    const validateEmail = (email) => {
        // credit https://stackoverflow.com/a/46181/17971976
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handdleSubmit = async (e) => {
        e.preventDefault();
        if(validateData(false)){
            const newDate = new Date(formDateOfBirth);
            newDate.setUTCHours(0, 0, 0, 0);
            const newUser = {
                'email': formEmail,
                'password': formPassword,
                'gender': formGender,
                'weight': formWeight,
                'height': formHeight,
                'dob': Date(newDate),
            }
            const registerRes = await register(newUser);
            if(registerRes.error){
                setSuccessMessage('')
                setErrorMessage(registerRes.error);
            } else {
                setErrorMessage('');
                setSuccessMessage(registerRes.status);
            }
        }
    }

    const handleChange = (e, formSection) => {
        const value = e.target.value;
        switch(formSection){
            case 'email':
                setFormEmail(value);
                break;
            case 'password':
                setFormPassword(value);
                break;
            case 'passwordConfirm':
                setFormPasswordConfirm(value);
                break;
            case 'gender':
                setFormGender(value);
                break;
            case 'weight':
                setFormWeight(value);
                break;
            case 'height':
                setFormHeight(value);
                break;
            case 'dob':
                setFormDateOfBirth(value);
                break;
            default:
                break;
        }
        setFormChange((prev) => prev+1);
    }

    const validateData = (realtime=true) => {
        // if realtime is true, this function will validate all <input> that not empty string while typing
        if(!validateEmail(String(formEmail)) && (!realtime || formEmail !== '')){
            setErrorMessage('invalid email');
        } else if(formPassword.length < 8 && (!realtime || formPassword !== '')){
            setErrorMessage('password should contain 8 characters or more')
        } else if(formPassword !== formPasswordConfirm && (!realtime || formPasswordConfirm !== '')){
            setErrorMessage('password and confirmation password doesn\'t match')
        } else if(formDateOfBirth === '' && (!realtime || formDateOfBirth !== '')){
            console.log(realtime);
            console.log(formDateOfBirth === '');
            setErrorMessage('enter your date of birth');
        } else if(new Date(formDateOfBirth) > new Date() && (!realtime || formDateOfBirth !== '')){
            setErrorMessage('date of birth can not be in the future')
        } else {
            setErrorMessage('');
            return true;
        }
        return false;
    }

    useEffect(() => {
        // validateData if the user typing in any <input>
        validateData();
    }, [formChange]);

    return (
        <div className='register-container'>
            <div className='register-container-blog'>
                <div className='register-top'><h1>Register</h1></div>
                { 
                    !props.isLogin &&
                    <form className='register-form'>
                        <div className='register-form-row'>
                            <div className='register-form-left'>Email</div>
                            <div className='register-form-right'><input type='email' value={formEmail} onChange={(e) => handleChange(e, 'email')}/></div>
                        </div>
                        <div className='register-form-row'>
                            <div className='register-form-left'>Password</div>
                            <div className='register-form-right'><input type='password' value={formPassword} onChange={(e) => handleChange(e, 'password')}/></div>
                        </div>
                        <div className='register-form-row'>
                            <div className='register-form-left'>Confirm Password</div>
                            <div className='register-form-right'><input type='password' value={formPasswordConfirm} onChange={(e) => handleChange(e, 'passwordConfirm')}/></div>
                        </div>
                        <div className='register-form-row'>
                            <div className='register-form-left'>Gender</div>
                            <div className='register-form-right'>
                                <select name="gender" id="gender" value={formGender} onChange={(e) => handleChange(e, 'gender')}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div className='register-form-row'>
                            <div className='register-form-left'>Weight</div>
                            <div className='register-form-right'><input type='number' value={formWeight} onChange={(e) => handleChange(e, 'weight')}/></div>
                        </div>
                        <div className='register-form-row'>
                            <div className='register-form-left'>Height</div>
                            <div className='register-form-right'><input type='number' value={formHeight} onChange={(e) => handleChange(e, 'height')}/></div>
                            </div>
                        <div className='register-form-row'>
                            <div className='register-form-left'>Date of Birth</div>
                            <div className='register-form-right'><input type='date' value={formDateOfBirth} onChange={(e) => handleChange(e, 'dob')}/></div>
                        </div>
                        <div className='error-message'>
                            {errorMessage}
                        </div>
                        <div className='success-message'>
                            {successMessage}
                        </div>
                        <div>
                            <button className='register-btn btn' onClick={handdleSubmit}>Register</button>
                        </div>
                    </form>
                }
                {
                    props.isLogin &&
                    <div>You already have an account.</div>
                }
            </div>
        </div>
    );
}

export default Register;