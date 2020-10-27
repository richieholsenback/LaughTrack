import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
// import "./JournalIdea.css"
import { JournalIdeaCard } from "./JournalIdeaCard"
import { JournalIdeaContext } from "./JournalIdeaProvider"

export const JournalIdeaList = () => {
    // This state changes when `getAnimals()` is invoked below
    const { journalIdeas, getJournalIdeas, searchTerms } = useContext(JournalIdeaContext)
    const [ filteredJournalIdeas, setFiltered ] = useState([])

    //useEffect - reach out to the world for something
    useEffect(() => {
        getJournalIdeas()

    }, [])

    const history = useHistory()

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching journalIdeas
            const subset = journalIdeas.filter(journalIdea => journalIdea.concept.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            // If the search field is blank, display all journalIdeas
            setFiltered(journalIdeas)
        }
    }, [searchTerms, journalIdeas])

    return (
        <div className="journalIdeas">
            {/* {console.log("JournalIdeaList: Render")} */}
            
            <button type="button" onClick={() => history.push("/journals/ideas/create")}>New Entry</button>
            {
                filteredJournalIdeas.map(journalIdea => {
                    return <JournalIdeaCard key={journalIdea.id} journalIdea={journalIdea}  />
                })
            }
        </div>
    )
}