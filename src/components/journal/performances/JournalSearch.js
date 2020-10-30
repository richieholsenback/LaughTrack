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
            <div className="journSearch">
                <Link to={"/journals"}>
                    <h3>Back</h3>
                </Link>
                <Input icon='search' placeholder='Search...' type="text"
                    className="input--wide"
                    onKeyUp={
                        (keyEvent) => setSearchTerms(keyEvent.target.value)
                    } />
            </div>
        </>
    )
}