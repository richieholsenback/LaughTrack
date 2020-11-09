import React, { useState, createContext } from "react"

export const FollowerContext = createContext()

export const FollowerProvider = props => {
    const [followers, setFollower] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")

    const getFollowers = () => {
        const parsedActiveUser = parseInt(sessionStorage.getItem("active_user"))
        return fetch (`http://localhost:8088/followers/?followedById=${parsedActiveUser}&_expand=user`)
        // http://localhost:8088/comments?_expand=journal&_expand=user
        .then(response => response.json())
        .then(setFollower)
    }

    const getAllFollowers = () => {
        return fetch (`http://localhost:8088/followers?_expand=user`)
        // http://localhost:8088/comments?_expand=journal&_expand=user
        .then(response => response.json())
        .then(setFollower)
    }

    const getFollowersForList = () => {
        const parsedActiveUser = parseInt(sessionStorage.getItem("active_user"))
        return fetch (`http://localhost:8088/followers?_expand=user`)
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

    const getFollowerById = (id)=> {
        return fetch(`http://localhost:8088/followers/${id}?_expand=user`)
            .then(res => res.json())
    }

    const unfollow = id => {
        return fetch(`http://localhost:8088/followers/${id}?_expand=user`, {
            method: "DELETE"
        })
            .then(getFollowers)
    }

    return (
        <FollowerContext.Provider value={{
            followers, searchTerms, getFollowers, addFollower, getFollowerById, getFollowersForList, getAllFollowers, setSearchTerms, unfollow
        }}>
            {props.children}
        </FollowerContext.Provider>
    )
}