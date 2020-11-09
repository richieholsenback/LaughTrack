import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { JournalCard } from "./JournalCard"
import "./Journal.css"
import { JournalContext } from "./JournalProvider"
import { Button } from "semantic-ui-react"

export const JournalList = () => {
    // This state changes when `getMyJournals()` is invoked below
    const { journals, getMyJournals, searchTerms } = useContext(JournalContext)

    const [filteredJournals, setFiltered] = useState([])
    const [journal, setJournal] = useState({})


    //useEffect - reach out to the world for something
    useEffect(() => {
        getMyJournals()

    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching journals
            const subset = journals.filter(journal => journal.concept.toLowerCase().includes(searchTerms) || journal.user.username.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            // If the search field is blank, display all journals
            setFiltered(journals)
        }
    }, [searchTerms, journals])

    const history = useHistory()


    const journalShow = ((entry) => {

        if (entry.hidden === true && entry.userId !== parseInt(sessionStorage.getItem("active_user"))) {
            return null
        } else {
            return <JournalCard key={entry.id} journal={entry} />
        }

    })



    return (
        <div className="journals">
            <Button type="button" onClick={() => history.push("/journals/create")}>New Entry</Button>
            {
                filteredJournals.map(journal => {
                    return journalShow(journal)
                }
                )
            }
        </div>
    )
}