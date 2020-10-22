import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventCard } from "../event/EventCard"
import { EventContext } from "../event/EventProvider"
import "../journal/Journal.css"
import { JournalCard } from "../journal/JournalCard"
import { JournalContext } from "../journal/JournalProvider"

export const UserJournalList = () => {
    // This state changes when `getAnimals()` is invoked below
    const { journals, getJournals } = useContext(JournalContext)

    //useEffect - reach out to the world for something
    useEffect(() => {
        getJournals()

    }, [])

    const history = useHistory()
    const filteredJournals = journals.filter(journal => journal.userId === parseInt(localStorage.getItem("active_user")))

    return (
        <div className="journals">
            {/* {console.log("JournalList: Render")} */}
            <button type="button" onClick={() => history.push("/journals/create")}>New Entry</button>
            {
                filteredJournals.map(journal => {
                    return <JournalCard key={journal.id} journal={journal}  />
                })
            }
        </div>
    )
}

export const UserEventList = () => {
    const {events, getEvents} = useContext(EventContext)

    useEffect(() => {
        getEvents()
    }, [])

    const history = useHistory()
    const filteredEvents = events.filter(event => event.userId === parseInt(localStorage.getItem("active_user")))

    return(
        <div className="events">
            <button type="button" onClick={() => history.push("/events/create")}>+</button>
            {
                filteredEvents.map(event => {
                    return <EventCard key={event.id} event={event} user={event.user.username} />
                })
            }
        </div>
    )
}