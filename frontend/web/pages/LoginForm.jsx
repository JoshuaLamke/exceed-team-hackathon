import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './LoginForm.css';

export default function Form() {

	// States for registration
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');

	// States for checking the errors
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	// Handling the name change
	const handleName = (e) => {
		setName(e.target.value);
		setSubmitted(false);
	};

	// Handling the email change
	const handleEmail = (e) => {
		setEmail(e.target.value);
		setSubmitted(false);
	};

	// Handling the password change
	const handlePassword = (e) => {
		setPassword(e.target.value);
		setSubmitted(false);
	};

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `home`; 
        navigate(path);
    }

	// Handling the form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		if (name === '' || password === '') {
			setError(true);
		} else {
            // TODO AUTHENTICATION ERROR CHECKING
            axios.post("http://localhost:3000/login", {
                username: name, 
                password: password
            }).then((resp) => {
                if(resp.status === 200){
                    setSubmitted(true);
			        setError(false);
                    routeChange();
                } else {
                    setError(true);
                }
            })
			
		}
	};

    const routeChangeSignup = () =>{ 
        let path = `signup`; 
        navigate(path);
    }

    const doSignUp = () => {
        // Add your sign-up logic here
        // TODO user sign up
        console.log("User signed up!");
        routeChangeSignup();
      };

	// Showing success message
	const successMessage = () => {
		return (
			<div
				className="success"
				style={{
					display: submitted ? '' : 'none',
				}}>
				<h1>User {name} successfully registered!!</h1>
			</div>
		);
	};

	// Showing error message if error is true
	const errorMessage = () => {
		return (
			<div
				className="error"
				style={{
					display: error ? '' : 'none',
				}}>
				<h1>Please enter all the fields</h1>
			</div>
		);
	};

	return (
		<div className="d-flex flex-column align-items-center justify-content-center" style={{height:"100vh"}}>
<><div className="form">
            <div>
                <h1>Login</h1>
            </div>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <form>
                {/* Labels and inputs for form data */}
                <label className="label">Name</label>
                <input onChange={handleName} className="input"
                    value={name} type="text" />

                <label className="label">Password</label>
                <input onChange={handlePassword} className="input"
                    value={password} type="password" />

                <button onClick={handleSubmit} className="btn"
                    type="submit">
                    Submit
                </button>
            </form>
        </div><div>
                <button onClick={doSignUp} className="btn" type="submit">Sign Up</button>
            </div></>
		</div>
	);
}
