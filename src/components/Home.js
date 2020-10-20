import React from "react";
import "../App"
import "./Home.css"
import photo from "../images/loginbg2.jpg"



export const Home = () => (
    <>
        <section className="mainTitle">
            <h1 id="headline">LAUGH TRACK</h1>
            <p id="subtitle">So you'll never need one</p>
            <img id="imageBG" src={photo} alt="Dave Chappelle doing standup" />
        </section>
    </>
)