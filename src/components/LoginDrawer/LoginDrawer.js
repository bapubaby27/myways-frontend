import React, { useState } from "react";
import "./LoginDrawer.scss";
import Button from "../Button/Button";
import { signInUser } from "../../utilities/axios";
import Loader from "react-loader-spinner";
import Backdrop from "../Backdrop/Backdrop";
import { sendOtp, updatePassword } from "../../utilities/axios";

const LoginDrawer = ({ changeType, toggleDrawer, changeUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recievedOtp, setRecievedOtp] = useState(0);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [showEmailAndPassword, setShowEmailAndPassword] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showEmailAndPassword) {
      if (
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          formData.email
        )
      ) {
        setLoading(true);
        let user = await signInUser(formData);
        setLoading(false);
        if (!user.data.status) {
          setError(user.data.message);
        } else {
          changeUser(user.data.data);
          toggleDrawer(false);
        }
      } else {
        setError("Enter a valid Email");
      }
    } else if (showEmail) {
      if (
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          formData.email
        )
      ) {
        setLoading(true);
        const res = await sendOtp(formData.email);
        setLoading(false);
        setRecievedOtp(res.data.otp);
        setShowOtp(true);
        setShowEmail(false);
      } else {
        setError("Enter a valid Email");
      }
    } else if (showOtp) {
      if (parseInt(enteredOtp) === recievedOtp) {
        setShowOtp(false);
        setShowPassword(true);
      } else {
        setError("Please Enter a valid OTP");
      }
    } else {
      setLoading(true);
      let res = await updatePassword(formData);
      setLoading(false);
      setShowPassword(false);
      setSuccessMessage(res.data.message);
      setFormData({
        email: "",
        password: "",
      });
      setEnteredOtp("");
      setShowEmailAndPassword(true);
      setTimeout(() => setSuccessMessage(""), 2000);
    }
  };

  return (
    <>
      <Backdrop />
      <div className={loading ? "login login--loader" : "login"}>
        <div className="login__mainHeader">
          {!showEmailAndPassword ? null : <h1>Login</h1>}
          <span onClick={() => toggleDrawer(false)}>&#10005;</span>
        </div>
        {!loading ? (
          <>
            <div className="login__form">
              <div className="login__header">
                {showEmail ? (
                  <h2>Enter Email</h2>
                ) : showPassword ? (
                  <h2>Enter New Password</h2>
                ) : showOtp ? (
                  <h2>Enter OTP</h2>
                ) : (
                  <h2>Student</h2>
                )}
              </div>
              <form onSubmit={handleSubmit}>
                {(showEmailAndPassword || showEmail) && (
                  <input
                    className="login__input"
                    type="email"
                    value={formData.email}
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  />
                )}
                {(showEmailAndPassword || showPassword) && (
                  <input
                    className="login__input"
                    type="password"
                    value={formData.password}
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                )}
                {showOtp && (
                  <input
                    className="login__input"
                    type="text"
                    value={enteredOtp}
                    name="OTP"
                    placeholder="Enter OTP"
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    required
                  />
                )}
                {showEmailAndPassword && (
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowEmail(true);
                      setShowEmailAndPassword(false);
                    }}
                  >
                    Forgot Password?
                  </p>
                )}
                {error.length > 0 && (
                  <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                )}
                {successMessage.length > 0 && (
                  <p style={{ color: "green", textAlign: "center" }}>
                    {successMessage}
                  </p>
                )}
                <Button
                  type="submit"
                  versions={["green", "border3", "fullWidth"]}
                >
                  <span style={{ fontSize: "1.5rem" }}>
                    {showEmailAndPassword
                      ? "Login"
                      : showEmail
                      ? "Send OTP"
                      : showOtp
                      ? "Submit OTP"
                      : showPassword
                      ? "Submit Password"
                      : null}
                  </span>
                </Button>
              </form>
              {showEmailAndPassword && (
                <a
                  onClick={() => {
                    toggleDrawer(false);
                    changeType("signup");
                  }}
                >
                  New to MyWays? Sign Up here
                </a>
              )}
            </div>
          </>
        ) : (
          <div className="login__loader">
            <Loader type="Circles" color="#00BFFF" height={80} width={80} />
          </div>
        )}
      </div>
    </>
  );
};

export default LoginDrawer;
