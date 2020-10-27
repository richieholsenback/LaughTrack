import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Grid } from "semantic-ui-react"
import { EventCard } from "./EventCard"
import { EventContext } from "./EventProvider"
import "./Event.css";

export const EventList = () => {
    const { events, getEvents } = useContext(EventContext)

    useEffect(() => {
        getEvents()
    }, [])

    const history = useHistory()

    return (
        <div className="events">
            <button type="button" onClick={() => history.push("/events/create")}>Add an event</button>
            <Grid>
                <Grid.Row className="eventGrid">
                    {
                        events.map(event => {
                            return <EventCard key={event.id} event={event} user={event.user.username} />
                        })
                    }
                </Grid.Row>
            </Grid>
        </div>
    )
}