import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import "./NavBar.css";
import photo from "../../images/Logo.png"


export const NavBar = props => {
    const userId = parseInt(localStorage.getItem("active_user"))
    return (
        <>
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">
                    Laugh Track
                </Link>
                </li>
                <div className="navSpacer"></div>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/messages">
                        Messages
                 </Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/journals">
                        Journal
                </Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/events">
                        Events
                </Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/followers">
                        Followers
                </Link>
                </li>
                <div className="navSpacer"></div>
                <li className="navbar__item">
                    <Link className="navbar__link" to={`/followers/detail/${userId}`}>
                        My Profile
                </Link>
                </li>
                <li className="navbar__item">
                    <Link onClick={() => {
                        localStorage.clear()
                    }}
                        to="/login">
                        Logout
                </Link>
                </li>
            </ul>
        </>
    );
};
