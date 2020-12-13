import Navbar from "./components/Navbar/Navbar";
import "./App.scss";
import Button from "./components/Button/Button";
import LoginDrawer from "./components/LoginDrawer/LoginDrawer";
import Modal from "./components/Modal/Modal";
import { useState } from "react";

const App = () => {
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const changeType = (type) => setType(type);
  const changeUser = (user) => setUser(user);
  const toggleDrawer = (value) => setOpen(value);

  return (
    <div className="app">
      {type !== "" && (
        <Modal changeUser={changeUser} changeType={changeType} type={type} />
      )}
      <Navbar
        user={user}
        changeUser={changeUser}
        changeType={changeType}
        toggleDrawer={toggleDrawer}
      />
      {open && (
        <LoginDrawer
          changeUser={changeUser}
          changeType={changeType}
          toggleDrawer={toggleDrawer}
        />
      )}
      <div className="app__body">
        <h3 style={{ fontSize: "2.25rem" }}>Apply and hear back every time</h3>
        <p style={{ fontSize: "1.75rem" }}>
          Exploring internships or jobs? Say good-bye to the typical job portals
          and use the power of Artificial Intelligence to become successful,
          faster.
        </p>
        <Button
          onClick={() => setType("signup")}
          versions={["green", "large", "border2"]}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default App;
