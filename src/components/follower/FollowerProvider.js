import React, { useState, createContext } from "react"

export const FollowerContext = createContext()

export const FollowerProvider = props => {
    const [followers, setFollower] = useState([])
    const activeUser = +localStorage.getItem("active_user")

    const getFollowers = activeUser => {
        const parsedActiveUser = +activeUser
        return fetch (`http://localhost:8088/followers/?myUserId=${parsedActiveUser}&_expand=user`)
        .then(response => response.json())
        .then(setFollower)
    }

    const addFollower = followerObj => {
        fetch("http://localhost:8088/followers/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(followerObj)
        })
        .then(setFollower)
    }

    return (
        <FollowerContext.Provider value={{
            followers, getFollowers, addFollower
        }}>
            {props.children}
        </FollowerContext.Provider>
    )
}