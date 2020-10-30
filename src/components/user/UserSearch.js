import React, { useContext, useEffect } from "react"
import { Input } from "semantic-ui-react"
import { UserContext } from "./UserProvider"

export const UserSearch = () => {
    const { setSearchTerms } = useContext(UserContext)

    useEffect(() => {
        setSearchTerms("")
    }, [])

    return (
        <>
            <div className="userSearch">
                <h2>Search for a user</h2>
            <Input type="text"
                    className="input--wide"
                    onKeyUp={
                        (keyEvent) => setSearchTerms(keyEvent.target.value)
                    }
                    placeholder="Search for a user... " />
                <h3>You should follow...</h3>
            </div>
        </>
    )
}