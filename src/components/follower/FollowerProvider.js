import React, { useState, createContext } from "react"

export const FollowerContext = createContext()

export const FollowerProvider = props => {
    const [followers, setFollower] = useState([])

    const getFollowers = activeUser => {
        const parsedActiveUser = +localStorage.getItem("active_user")
        return fetch (`http://localhost:8088/followers/?myUserId=${parsedActiveUser}&_expand=user`)
        // http://localhost:8088/comments?_expand=journal&_expand=user
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