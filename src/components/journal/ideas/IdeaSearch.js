import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
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
            <input type="text"
                className="input--wide"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }
                placeholder="Search for an idea... " />
        </>
    )
}