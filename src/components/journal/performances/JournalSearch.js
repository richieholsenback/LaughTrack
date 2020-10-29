import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { Input } from "semantic-ui-react"
import { JournalContext } from "./JournalProvider"

export const JournalSearch = () => {
    const { setSearchTerms } = useContext(JournalContext)

    useEffect(() => {
        setSearchTerms("")
    }, [])

    return (
        <>
        <p>
                <Link to={"/journals"}>
                    Back
                </Link>
            </p>
            Journal search:
            <Input icon='search' placeholder='Search...' type="text"
                className="input--wide"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }/>
        </>
    )
}