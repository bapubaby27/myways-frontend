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
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(showEmail);

  return (
    <>
      <Backdrop />
      <div className={loading ? "login login--loader" : "login"}>
        <div className="login__mainHeader">
          {showEmail || showPassword || showOtp || success || loading ? null : (
            <h1>Login</h1>
          )}
          <span onClick={() => toggleDrawer(false)}>&#10005;</span>
        </div>
        {!loading && !success ? (
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
              {(showEmail || !showPassword) && !showOtp && (
                <input
                  className="login__input"
                  type="email"
                  value={formData.email}
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              )}
              {(!showEmail || showPassword) && !showOtp && (
                <input
                  className="login__input"
                  type="password"
                  value={formData.password}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
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
                />
              )}
              {!showEmail && !showPassword && !showOtp && (
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowEmail(true)}
                >
                  Forgot Password?
                </p>
              )}
              {error.length > 0 && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}
              {!showEmail && !showPassword && !showOtp && (
                <Button
                  onClick={async () => {
                    setLoading(true);
                    let user = await signInUser(formData);
                    setLoading(false);
                    if (!user.data.status) {
                      setError(user.data.message);
                    } else {
                      changeUser(user.data.data);
                      toggleDrawer(false);
                    }
                  }}
                  versions={["green", "border3"]}
                >
                  <span style={{ fontSize: "1.5rem" }}>Login</span>
                </Button>
              )}
              {showEmail && (
                <Button
                  onClick={async () => {
                    setLoading(true);
                    const user = await sendOtp(formData.email);
                    setRecievedOtp(user.data.otp);
                    setLoading(false);
                    if (!user.data.status) {
                      setError(user.data.message);
                    } else {
                      setShowEmail(false);
                      setShowOtp(true);
                    }
                  }}
                  versions={["green", "border3"]}
                >
                  <span style={{ fontSize: "1.5rem" }}>Send OTP</span>
                </Button>
              )}
              {showOtp && (
                <Button
                  onClick={async () => {
                    if (parseInt(enteredOtp) === recievedOtp) {
                      setShowOtp(false);
                      setShowPassword(true);
                    } else {
                      setError("Please Enter a valid OTP");
                    }
                  }}
                  versions={["green", "border3"]}
                >
                  <span style={{ fontSize: "1.5rem" }}>Submit OTP</span>
                </Button>
              )}
              {showPassword && (
                <Button
                  onClick={async () => {
                    setLoading(true);
                    let user = await updatePassword(formData);
                    setLoading(false);
                    setShowPassword(false);
                    if (user.data.status) {
                      setSuccess(true);
                      setSuccessMessage(user.data.message);
                    }
                  }}
                  versions={["green", "border3"]}
                >
                  <span style={{ fontSize: "1.5rem" }}>Submit Password</span>
                </Button>
              )}
              {!showEmail && !showPassword && !showOtp && (
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
        ) : !success ? (
          <div className="login__loader">
            <Loader type="Circles" color="#00BFFF" height={80} width={80} />
          </div>
        ) : (
          <p className="login__loader">{successMessage}</p>
        )}
      </div>
    </>
  );
};

export default LoginDrawer;
