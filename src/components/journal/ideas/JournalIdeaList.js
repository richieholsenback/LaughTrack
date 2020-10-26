import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
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
            <button type="button" onClick={() => history.push("/journalIdeas/create")}>New Entry</button>
            {
                journalIdeas.map(journalIdea => {
                    return <JournalIdeaCard key={journalIdea.id} journalIdea={journalIdea}  />
                })
            }
        </div>
    )
}