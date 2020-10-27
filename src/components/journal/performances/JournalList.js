import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { JournalCard } from "./JournalCard"
import "./Journal.css"
import { JournalContext } from "./JournalProvider"

export const JournalList = () => {
    // This state changes when `getAnimals()` is invoked below
    const { journals, getJournals } = useContext(JournalContext)
    const [journal, setJournal] = useState({})

    //useEffect - reach out to the world for something
    useEffect(() => {
        getJournals()

    }, [])

    const history = useHistory()

    const journalShow = ((entry) => {
        if (journal.hidden === true && journal.userId === parseInt(localStorage.getItem("active_user"))){
            return entry
        } else if (journal.hidden === true && journal.userId !== parseInt(localStorage.getItem("active_user"))){
            return ("")
        } else {
            return entry
        }
            
    })

    const journalList = journals.map(journal => {
        return <JournalCard key={journal.id} journal={journal}/>
    })

    return (
        <div className="journals">
            {/* {console.log("JournalList: Render")} */}
            <p>
                <Link to={"/journals"}>
                    Back
                </Link>
            </p>
            <button type="button" onClick={() => history.push("/journals/create")}>New Entry</button>
            {journalShow(journalList)}
        </div>
    )
}