import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { JournalCard } from "./JournalCard"
import "./Journal.css"
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
            <p>
                <Link to={"/journals"}>
                    Back
                </Link>
            </p>
            <button type="button" onClick={() => history.push("/journals/create")}>New Entry</button>
            {
                journals.map(journal => {
                    return <JournalCard key={journal.id} journal={journal}  />
                })
            }
        </div>
    )
}