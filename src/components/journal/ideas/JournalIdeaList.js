import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
// import "./JournalIdea.css"
import { JournalIdeaCard } from "./JournalIdeaCard"
import { JournalIdeaContext } from "./JournalIdeaProvider"

export const JournalIdeaList = () => {
    // This state changes when `getAnimals()` is invoked below
    const { journalIdeas, getJournalIdeas } = useContext(JournalIdeaContext)

    //useEffect - reach out to the world for something
    useEffect(() => {
        getJournalIdeas()

    }, [])

    const history = useHistory()

    return (
        <div className="journalIdeas">
            {/* {console.log("JournalIdeaList: Render")} */}
            <p>
                <Link to={"/journals"}>
                    Back
                </Link>
            </p>
            <button type="button" onClick={() => history.push("/journals/ideas/create")}>New Entry</button>
            {
                journalIdeas.map(journalIdea => {
                    return <JournalIdeaCard key={journalIdea.id} journalIdea={journalIdea}  />
                })
            }
        </div>
    )
}