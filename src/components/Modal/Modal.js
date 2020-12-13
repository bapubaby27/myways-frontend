import React, { useState } from "react";
import Button from "../Button/Button";
import "./Modal.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { sendOtp, setUser } from "../../utilities/axios";
import Loader from "react-loader-spinner";
import Backdrop from "../Backdrop/Backdrop";

const Modal = ({ type, changeType, changeUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [recievedOtp, setRecievedOtp] = useState(0);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Backdrop />
      <div className="modal">
        {type === "signup" ? (
          <>
            <p className="modal__close">
              <span onClick={() => changeType("")}>&#10005;</span>
            </p>
            <div className="modal__form">
              <h1 style={{ textAlign: "center" }}>Sign Up</h1>
              <p style={{ textAlign: "center" }}>It's quick and easy</p>
              <div className="modal__inputs">
                <input
                  className="modal__input"
                  type="text"
                  value={formData.firstName}
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                />
                <input
                  className="modal__input"
                  type="text"
                  value={formData.lastName}
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </div>
              <input
                className="login__input"
                type="email"
                value={formData.email}
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <input
                className="login__input"
                type="password"
                value={formData.password}
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              {error.length !== 0 ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : null}
              <Button
                onClick={async () => {
                  changeType("loading");
                  const res = await sendOtp(formData.email);
                  setRecievedOtp(res.data.otp);
                  changeType("otp");
                }}
                versions={["green", "border3"]}
              >
                <span style={{ fontSize: "1.5rem" }}>Sign Up</span>
              </Button>
            </div>
          </>
        ) : type === "otp" ? (
          <>
            <p onClick={() => changeType("signup")} className="modal__arrow">
              <ArrowLeftOutlined />
            </p>
            <div className="otp">
              <p>OTP sent!</p>
              {error.length > 0 && <p style={{ color: "red" }}>{error}</p>}
              <input
                className="modal__input modal__input--round"
                type="text"
                value={enteredOtp}
                name="otp"
                placeholder="Enter OTP"
                onChange={(e) => setEnteredOtp(e.target.value)}
              />
              <p style={{ fontSize: "1rem", textAlign: "left" }}>
                One time Passcode sent to your email ID - {formData.email}
              </p>
              <Button
                onClick={async () => {
                  if (parseInt(enteredOtp) === recievedOtp) {
                    changeType("loading");
                    const user = await setUser(formData);
                    if (user.data.status) {
                      changeUser(user.data.data);
                      changeType("success");
                      setTimeout(() => changeType(""), 2000);
                    } else {
                      setError(user.data.message);
                    }
                  } else {
                    setError("Please Enter a valid OTP");
                  }
                }}
                versions={["green", "border2", "large"]}
              >
                <span style={{ fontSize: "1.5rem" }}>Enter</span>
              </Button>
            </div>
          </>
        ) : type === "success" ? (
          <div className="modal__success">
            <img src="/images/icon-awesome.svg" alt="text" />
            <p>Thanks, Sign up was Successful!</p>
          </div>
        ) : (
          <div className="modal__loader">
            <Loader type="Circles" color="#00BFFF" height={80} width={80} />
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;
