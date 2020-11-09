import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import "./NavBar.css";
import photo from "../../images/laughtrackHeader.png"


export const NavBar = props => {
    const userId = parseInt(sessionStorage.getItem("active_user"))
    return (
        <>
        
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">
                    <h2 className="navtext">Laugh Track</h2>
                </Link>
                </li>
                <div className="navSpacer"></div>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/messages">
                        <h4 className="navtext">Messages</h4>
                 </Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/journals">
                       <h4 className="navtext">Journal</h4>
                </Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/events">
                    <h4 className="navtext">Events</h4>
                </Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/followers">
                    <h4 className="navtext">Followers</h4>
                </Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to={`/followers/detail/${userId}`}>
                    <h4 className="navtext">My Profile</h4>
                </Link>
                </li>
                <div className="navSpacer"></div>
                <li className="navbar__item">
                    <Link onClick={() => {
                        sessionStorage.clear()
                    }}
                        to="/login">
                        <h4 className="navtext">Logout</h4>
                </Link>
                </li>
            </ul>

            <img id="headerBG" src={photo} width="100%" alt="header art"/>
        </>
    );
};
