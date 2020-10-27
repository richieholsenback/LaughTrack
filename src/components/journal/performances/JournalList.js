import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { JournalCard } from "./JournalCard"
import "./Journal.css"
import { JournalContext } from "./JournalProvider"

export const JournalList = () => {
    // This state changes when `getJournals()` is invoked below
    const { journals, getJournals, searchTerms } = useContext(JournalContext)

    const [ filteredJournals, setFiltered ] = useState([])
    

    //useEffect - reach out to the world for something
    useEffect(() => {
        getJournals()

    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching journals
            const subset = journals.filter(journal => journal.concept.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            // If the search field is blank, display all journals
            setFiltered(journals)
        }
    }, [searchTerms, journals])

    const history = useHistory()

    

    

    return (
        <div className="journals">
            {/* {console.log("JournalList: Render")} */}
            <button type="button" onClick={() => history.push("/journals/create")}>New Entry</button>
            {
            filteredJournals.map(journal => {
        return <JournalCard key={journal.id} journal={journal}/>
    }
    )
}
    </div>
    )
}