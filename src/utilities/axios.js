import axios from "axios";

export const sendOtp = (email) =>
  axios.post("https://afternoon-harbor-92754.herokuapp.com/Auth/sendOtp", {
    email,
  });

export const setUser = (data) =>
  axios.post("https://afternoon-harbor-92754.herokuapp.com/Auth/signUp", data);

export const signInUser = (data) =>
  axios.post("https://afternoon-harbor-92754.herokuapp.com/Auth/signIn", data);

export const updatePassword = (data) =>
  axios.post(
    "https://afternoon-harbor-92754.herokuapp.com/Auth/updatePassword",
    data
  );
