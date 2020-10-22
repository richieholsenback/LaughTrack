import React, { useState, createContext, useContext } from "react"
// import { MatchContext } from "../matches/MatchProvider"

export const UserContext = createContext()


export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    // const {matches} = useContext(MatchContext)

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)

            // .then((response) => {
            //     let relevant = []
            //     const friendIds = matches.map(friend => {
            //         return friend.sessionStorage.getItem("lizard_user")
            //     })
            //     response.map(user => {
            //         if(!friendIds.includes(user.id) && user.id !== parseInt(sessionStorage.getItem("lizard_user"))){
            //             return relevant.push(user)
            //         }
            //     })
            //     setUsers(relevant)})

    }

    const getUserById = (id) => {
        return fetch(`http://localhost:8088/users/${id}`)
            .then(res => res.json())
    }

    const editUser = user => {
        return fetch(`http://localhost:8088/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(getUsers)
    }
    
    return (
        <UserContext.Provider value={{
            users, getUsers, getUserById, editUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}