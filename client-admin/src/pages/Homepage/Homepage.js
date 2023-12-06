import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import '../Login/login.style.css'

const Homepage = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    
    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useDispatch()


    useEffect(()=>{
        setErrMsg('')
    },[email, password])

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const userData = await login({email, password}).unwrap()
            dispatch(setCredentials({...userData, email}))
            setEmail('')
            setPassword('')
            navigate('/account-list')
        } catch (error) {
            if(!error?.response){
                setErrMsg('No server response')
            }else if (error.response?.status === 400){
                setErrMsg('Missing Email or password')
            }else if(error.response?.status === 401){
                setErrMsg('Unauthorization')
            }else{
                setErrMsg('Login failed')
            }
        }
    }

    const content = isLoading ? <h1>Loading...</h1> :(
        <section className='page'>
             <div className="borderBox">
                <form className='login-form' onSubmit={handleLogin}>
                    <h1 className="headerText">Admin Login</h1>
                    <input 
                        type="email" 
                        placeholder="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                        />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="buttonContainer">
                        <button className="button" type='submit'>
                            login
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
    return content
}

export default Homepage