import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Button, Card, Grid, Icon } from "semantic-ui-react"
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
            <div className="eventAddButton">
                <Button type="button" onClick={() => history.push("/events/create")}><Icon name="calendar outline" />Add an event</Button>
            </div>
            <Grid>
                <div className="eventGridContainer">
                    <Card.Group className="eventGrid">
                        {
                            events.map(event => {
                                return <EventCard key={event.id} event={event} user={event.user.username} />
                            })
                        }
                    </Card.Group>
                </div>
            </Grid>
        </div>
    )
}