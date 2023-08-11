import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showDisabledMessage, setShowDisabledMessage] = useState(false);
  const { closeModal } = useModal();

  const MIN_USERNAME_LENGTH = 4;
  const MIN_PASSWORD_LENGTH = 6;

  const validCredential = email.length >= MIN_USERNAME_LENGTH;
  const validPassword = password.length >= MIN_PASSWORD_LENGTH;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validCredential || !validPassword) {
      setShowDisabledMessage(true);
      return;
    }
    const data = await dispatch(login(email, password));
    if (data && data.errors) {
      setErrors(data.errors);
    } else if (data === null) {
      closeModal()
    } else {
      setErrors(["The provided credentials are invalid"]);
    }
};

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    setShowDisabledMessage(false);
    await dispatch(login("demo@aa.io", "password"));
    closeModal()
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        {showDisabledMessage && (
          <div className="disabled-message">Please provide an email and a password~</div>
        )}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Log In</button>
        <button onClick={handleDemoLogin}>Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
