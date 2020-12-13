import React from "react";
import { Menu, Dropdown } from "antd";
import "antd/dist/antd.css";
import "./Navbar.scss";
import Button from "../Button/Button";
import { CaretDownOutlined } from "@ant-design/icons";

const Navbar = ({ changeType, toggleDrawer, user, changeUser }) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="#">Find matching internships</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">Hire right talent</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">Work from Home</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar">
      <img src="/images/navbarLogo2x.png" alt="Text" />
      <ul className="navbar__items">
        <li className="navbar__item">
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <div className="navbar__dropdown">
              <span style={{ marginRight: "10px" }}>For You</span>
              <span>
                <CaretDownOutlined />
              </span>
            </div>
          </Dropdown>
        </li>
        <li className="navbar__item">
          <img src="/images/instant logo.png" alt="text" />
          <span>Instant Apply</span>
        </li>
        <li className="navbar__item">Pricing</li>
        <li className="navbar__item">About us</li>
        {user ? (
          <li className="navbar__item">
            <Button onClick={() => changeUser(null)}>LOGOUT</Button>
          </li>
        ) : (
          <>
            <li className="navbar__item">
              <Button onClick={() => changeType("signup")}>SIGN UP</Button>
            </li>
            <li className="navbar__item">
              <Button
                onClick={() => toggleDrawer(true)}
                versions={["green", "border1"]}
                className="navbar__button"
              >
                LOGIN
              </Button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
