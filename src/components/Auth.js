import React, { useState } from 'react'
import styled from 'styled-components'
import { auth } from '../Firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {NavLink, useNavigate} from "react-router-dom"



function Auth() {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(true)

  const toggleForm = () => {
    setShowLoginForm(prevState => !prevState)
  }


  const [loginEmail,setLoginEmail] = useState('')
  const [ loginPassword, setPassword] = useState('')
  const [ name, setName] = useState('')
  const [ signUpEmail,setSignUpEmail] = useState('')
  const [ signUpPassword, setSignUpPassword] = useState('')

  const onSignIn= (e)=>{

    
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential)=>{
      const user = userCredential.user;
      navigate("/Home")
      console.log(user);
    })
    .catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    })
   
  }

  const onSignUp=async(e)=>{
    e.preventDefault()

    await createUserWithEmailAndPassword(auth, signUpEmail,signUpPassword)
    .then((userCredential)=>{
      const user = userCredential.user
      console.log(user)
      navigate("/Home")
    })
    .catch((error)=>{
      const errorCode=error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })

  }


  return (
    <Page>
      <Container>
        {showLoginForm ? (
          <LoginForm>
            <h2>Login</h2>
            <InputContainer>
              <label>Email:</label>
              <input 
              type="login" 
              label="Email address"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
              placeholder="Email address"
              />
            </InputContainer>
            <InputContainer>
              <label>Password:</label>
              <input 
              type="password" 
              label="Enter Password"
              value={loginPassword}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"

              />
            </InputContainer>
            <LoginButton onClick = {onSignIn}>Login</LoginButton>
            <SignUpText>
              Don't have an account?{' '}
              <SignUpButton onClick={toggleForm}>Sign Up</SignUpButton>
            </SignUpText>
          </LoginForm>
        ) : (
          <SignUpForm>
            <h2>Sign Up</h2>
            <InputContainer>
              <label>Name:</label>
              <input 
              type="text" 
              label="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter name"
              
               />
            </InputContainer>
            <InputContainer>
              <label>Email:</label>
              <input 
              type="email" 
              label="Email address"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              required
              placeholder="Email address"
               />
            </InputContainer>
            <InputContainer>
              <label>Password:</label>
              <input 
              type="password" 
              label="Enter password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              required
              placeholder="Enter password"

              />
            </InputContainer>
            <SignUpButton onClick = {onSignUp}>Sign Up</SignUpButton>
            <SignUpText>
              Already have an account?{' '}
              <LoginButton onClick={toggleForm}>Login</LoginButton>
            </SignUpText>
          </SignUpForm>
        )}
      </Container>
      
    </Page>
  )
}

export default Auth

const Page = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('./ni.jpg');
  background-size: cover;
  background-position: center;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const Form = styled.div`
  color: #fff;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`

const LoginForm = styled(Form)``

const SignUpForm = styled(Form)``

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
  }

  input {
    border-radius: 5px;
    border: none;
    padding: 8px;
  }
`

const Button = styled.button`
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`

const LoginButton = styled(Button)`
  background-color: #fff;
  color: #000;
  border: none;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`

const SignUpButton = styled(Button)`
  background-color: transparent;
  border: none;
  color: #fff;
`

const SignUpText = styled.p`
  color: #fff;
`
