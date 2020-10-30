import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import "./NavBar.css";
import photo from "../../images/laughtrackHeader.png"


export const NavBar = props => {
    const userId = parseInt(localStorage.getItem("active_user"))
    return (
        <>
        
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">
                    <h2>Laugh Track</h2>
                </Link>
                </li>
                <div className="navSpacer"></div>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/messages">
                        <h4>Messages</h4>
                 </Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/journals">
                       <h4>Journal</h4>
                </Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/events">
                    <h4>Events</h4>
                </Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/followers">
                    <h4>Followers</h4>
                </Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to={`/followers/detail/${userId}`}>
                    <h4>My Profile</h4>
                </Link>
                </li>
                <div className="navSpacer"></div>
                <li className="navbar__item">
                    <Link onClick={() => {
                        localStorage.clear()
                    }}
                        to="/login">
                        <h4>Logout</h4>
                </Link>
                </li>
            </ul>

            <img id="headerBG" src={photo} width="100%" />
        </>
    );
};
