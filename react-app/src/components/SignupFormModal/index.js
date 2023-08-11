import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const MIN_USERNAME_LENGTH = 4;
	const MIN_PASSWORD_LENGTH = 6;

	const validUsername = username.length >= MIN_USERNAME_LENGTH;
	const validPassword = password.length >= MIN_PASSWORD_LENGTH;
	const passwordsMatch = password === confirmPassword;

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);

		const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
		const isEmailValid = emailRegex.test(email);

		if (validUsername && validPassword && passwordsMatch && isEmailValid) {
			const data = await dispatch(signUp(username, email, password));
			if (data && data.errors) {
				setErrors(data.errors);
			} else if (data) {
				closeModal();
			} else {
				setErrors(["Sign up failed. Please try again."]);
			}
		} else {
			const newErrors = [];
			if (!email || !isEmailValid) newErrors.push("Please enter a valid email address.");
			if (!validUsername) newErrors.push(`Username must be at least ${MIN_USERNAME_LENGTH} characters long.`);
			if (!validPassword) newErrors.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
			if (!passwordsMatch) newErrors.push("Confirm Password field must be the same as the Password field");
			setErrors(newErrors);
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				{/* Email */}
				<div className="form-field">
				{errors.map((error, idx) => (
					<div key={idx} className="error-message">
					{error}
					</div>
				))}
				<label>
					Email
					<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				</div>

				{/* Username */}
				<div className="form-field">
				<label>
					Username
					<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				</div>

				{/* Password */}
				<div className="form-field">
				<label>
					Password
					<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				</div>

				{/* Confirm Password */}
				<div className="form-field">
				<label>
					Confirm Password
					<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</label>
				</div>

				<button type="submit">Sign Up</button>
			</form>
			</>
		);
}

export default SignupFormModal;
