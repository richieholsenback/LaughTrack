import React, { useState, createContext } from "react"

export const FollowerContext = createContext()

export const FollowerProvider = (props) => {
    const [ followers, setFollowers ] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")

    const getFollowers = () => {
        return fetch("http://localhost:8088/followers?_expand=user")
            .then(res => res.json())
            .then(setFollowers)
    }

    const getFollowersById = id => {
        return fetch(`http://localhost:8088/followers?activeUserId=${id}&_expand=user`)
            .then(res => res.json())
    }

    const addFollower = follower => {
        return fetch("http://localhost:8088/followers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(follower)
        })
        .then(getFollowers)
    }

    const removeFollower = id => {
        return fetch(`http://localhost:8088/followers/${id}`, {
            method: "DELETE"
        })
    }

    const updateFollower = follower => {
        return fetch(`http://localhost:8088/followers/${follower.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(follower)
        })
    }

    return (
        <FollowerContext.Provider value={{
            followers, getFollowers, addFollower, removeFollower, getFollowersById, searchTerms, setSearchTerms, updateFollower
        }}>
            {props.children}
        </FollowerContext.Provider>
    )
}