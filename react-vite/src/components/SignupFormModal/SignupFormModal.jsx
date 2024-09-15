import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup, thunkLogin } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = {}
    if (!email) {
      error.email = "Email is required"}
    if (username.length < 4) {
      error.username = "Username must be at least 4 characters"}
    if (password.length < 6) {
      error.password = "Password must be at least 6 characters"}

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Passwords do not match",
      });
    }

    if (Object.keys(error).length > 0) {
      setErrors(error)
      return;
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const demoUser = (e) => {
    e.preventDefault();
    setErrors({})
    dispatch(thunkLogin({ email: 'demo@aa.io', password: "password" }))
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data?.errors) setErrors(data.errors)
        })
  }

  return (
    <div className="signup-form-wrapper">
      <h1>Sign Up</h1>
      {errors.server && <p className="error">{errors.server}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <label className="signup-form-label">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
        <label className="signup-form-label">
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="error">{errors.username}</p>}
        <label className="signup-form-label">
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        <label className="signup-form-label">
          <input
            type="password"
            value={confirmPassword}
            placeholder="Conform Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        <button className="signup-form-submit" type="submit">Sign Up</button>
      </form>

      <div>

        <p className="demo-user-txt">Not ready to sign up yet?
          <button className="demo-user-btn" onClick={demoUser}>Try Demo</button>
        </p>

      </div>
    </div>
  );
}

export default SignupFormModal;
