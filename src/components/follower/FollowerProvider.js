import React, { useState, createContext } from "react"

export const FollowerContext = createContext()

export const FollowerProvider = (props) => {
    const [followers, setFollowers] = useState([])
    const userId = sessionStorage.getItem("active_user")

    const getFollowers = () => {
        return fetch(`http://localhost:8088/followers?followingId=${userId}&_expand=user`)
            .then(res => res.json())
            .then(setFollowers)
    }

    
    const addFollower = followerObj => {
        return fetch("http://localhost:8088/followers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(followerObj)
        })
            .then(getFollowers)
    }

    const getFollowerById = (id) => {
        return fetch(`http://localhost:8088/followers?followingId=${userId}&userId=${id}&_expand=user`)
            .then(res => res.json())
    }

    const getReptiles = () => {
        return fetch(`http://localhost:8088/users`)
            .then(res => res.json())
    }

    const getAlternateRelationship = (followerId) => {
        return fetch(`http://localhost:8088/followers?followingId=${followerId}&userId=${userId}`)
        .then(res => res.json())
    }

    return (
        <FollowerContext.Provider value={{
            followers, getFollowers, addFollower, getFollowerById, getReptiles, getAlternateRelationship
        }}>
            {props.children}
        </FollowerContext.Provider>
    )
}