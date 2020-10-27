import React from "react";
import "../App"
import "./Home.css"
import photo from "../images/loginbg2.jpg"



export const Home = () => (
    <>
        <section className="mainTitle" id="parent">
            <h1 id="headline">LAUGH TRACK</h1>
            <p id="subtitle">So you'll never need one</p>
            <img id="child" src={photo} alt="The Marvelous Ms. Maisel" />
        </section>
    </>
)