import React, { useContext, useEffect } from "react"
import { UserContext } from "./UserProvider"

export const UserSearch = () => {
    const { setSearchTerms } = useContext(UserContext)

    useEffect(() => {
        setSearchTerms("")
    }, [])

    return (
        <>
        <h2>Search for a follower</h2>
            User search:
            <input type="text"
                className="input--wide"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }
                placeholder="Search for a user... " />
                <h3>You should follow...</h3>
        </>
    )
}