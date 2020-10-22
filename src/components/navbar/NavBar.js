import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import "./NavBar.css";


export const NavBar = props => {
    return (
        <>
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">
                        Laugh Track
                </Link>
                </li>
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
            
            <li className="navbar__item">
                <Link onClick={() => { 
                    localStorage.clear()}}
                    to="/login">
                    Logout
                </Link>
            </li>
            </ul>
        </>
    );
};
