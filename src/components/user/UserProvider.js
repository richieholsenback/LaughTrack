import React, { useState, createContext, useContext } from "react"

export const UserContext = createContext()


export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [followers, setFollowers] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)

    }

    const getUserById = (id) => {
        return fetch(`http://localhost:8088/users/${id}`)
            .then(res => res.json())
    }

    const addFollower = followerObj => {
        fetch("http://localhost:8088/followers/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(followerObj)
        })
        .then(setFollowers)
    }

    return (
        <UserContext.Provider value={{
            users, getUsers, getUserById
        }}>
            {props.children}
        </UserContext.Provider>
    )
}