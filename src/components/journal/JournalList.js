import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../user/UserProvider"
import "./Journal.css"
import { JournalCard } from "./JournalCard"
import { JournalContext } from "./JournalProvider"

export const JournalList = () => {
    // This state changes when `getAnimals()` is invoked below
    const { journals, getJournals } = useContext(JournalContext)

    //useEffect - reach out to the world for something
    useEffect(() => {
        getJournals()

    }, [])

    const history = useHistory()

    return (
        <div className="journals">
            {/* {console.log("JournalList: Render")} */}
            <button type="button" onClick={() => history.push("/journals/create")}>New Entry</button>
            {
                journals.map(journal => {
                    return <JournalCard key={journal.id} journal={journal}  />
                })
            }
        </div>
    )
}