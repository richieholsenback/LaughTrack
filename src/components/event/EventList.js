import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventCard } from "./EventCard"
import { EventContext } from "./EventProvider"

export const EventList = () => {
    const {events, getEvents} = useContext(EventContext)

    useEffect(() => {
        getEvents()
    }, [])

    const history = useHistory()

    return(
        <div className="events">
            <button type="button" onClick={() => history.push("/events/create")}>+</button>
            {
                events.map(event => {
                    return <EventCard key={event.id} event={event} user={event.user.username} />
                })
            }
        </div>
    )
}