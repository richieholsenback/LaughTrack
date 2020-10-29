import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { Input } from "semantic-ui-react"
import { IdeaContext } from "./IdeaProvider"

export const IdeaSearch = () => {
    const { setSearchTerms } = useContext(IdeaContext)

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
            Idea search:
            <Input icon='search' placeholder='Search...' type="text"
                className="input--wide"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }
                placeholder="Search for an idea... " />
        </>
    )
}