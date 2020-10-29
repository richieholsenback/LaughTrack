import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "../event/EventProvider"
import "./Event.css"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Input, TextArea } from "semantic-ui-react";

export const EventForm = (props) => {
    const { addEvent, getEventById, updateEvent } = useContext(EventContext)

    const [event, setEvent] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const { eventId } = useParams();
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newEvent = { ...event }
        newEvent[event.target.name] = event.target.value
        setEvent(newEvent)
    }

    useEffect(() => {
        if (eventId) {
            getEventById(eventId)
                .then(event => {
                    setEvent(event)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    const constructEventObject = () => {
        const userId = parseInt(localStorage.getItem("active_user"))
        setIsLoading(false);
        if (eventId) {
            updateEvent({
                id: event.id,
                name: event.name,
                location: event.location,
                address: event.address,
                city: event.city,
                state: event.state,
                zip: event.zip,
                description: event.description,
                date: event.date,
                userId: userId,
                poster: event.poster
            })
                .then(() => history.push(`/events/detail/${event.id}`))
        } else {
            addEvent({
                name: event.name,
                location: event.location,
                address: event.address,
                city: event.city,
                state: event.state,
                zip: event.zip,
                description: event.description,
                date: event.date,
                userId: userId, 
                poster: event.poster
            })
                .then(() => history.push("events"))
        }
    }

    


    return (
        <form className="eventForm">
            <h2 className="eventForm__title">New Event</h2>
            <Form.Field>
                <div className="form-group">
                    <p htmlFor="name">Event name: </p>
                    <Input
                        type="text"
                        id="eventName"
                        name="name"
                        required
                        autoFocus
                        
                        placeholder="Event name"
                        onChange={handleControlledInputChange}
                        defaultValue={event.name}
                    />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <p htmlFor="date">Date: </p>
                    <Input
                        type="date"
                        id="eventDate"
                        name="date"
                        required
                        
                        onChange={handleControlledInputChange}
                        defaultValue={event.date}
                    />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <p htmlFor="location">Name of venue: </p>
                    <Input
                        type="text"
                        id="eventLocation"
                        name="location"
                        required
                        
                        placeholder="Venue Name"
                        onChange={handleControlledInputChange}
                        defaultValue={event.location}
                    />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <p htmlFor="address">Street address of venue: </p>
                    <Input
                        type="text"
                        id="eventAddress"
                        name="address"
                        required
                        
                        placeholder="Street address"
                        onChange={handleControlledInputChange}
                        defaultValue={event.address}
                    />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <p htmlFor="city">City: </p>
                    <Input
                        type="text"
                        id="eventCity"
                        name="city"
                        required
                        
                        placeholder="City"
                        onChange={handleControlledInputChange}
                        defaultValue={event.city}
                    />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <p htmlFor="state">State: </p>
                    <Input
                        type="text"
                        id="eventState"
                        name="state"
                        required
                        
                        placeholder="State"
                        onChange={handleControlledInputChange}
                        defaultValue={event.state}
                    />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <p htmlFor="zip">Zip code: </p>
                    <Input
                        type="text"
                        id="eventZip"
                        name="zip"
                        required
                        
                        placeholder="Zip"
                        onChange={handleControlledInputChange}
                        defaultValue={event.zip}
                    />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <p htmlFor="description">Description of your event: </p>
                    <TextArea
                        type="text"
                        id="eventDescription"
                        name="description"
                        required
                        
                        placeholder="Description"
                        onChange={handleControlledInputChange}
                        defaultValue={event.description}
                    />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <p htmlFor="poster">Poster for your event: </p>
                    <Input
                        type="text"
                        id="eventPoster"
                        name="poster"
                        required
                        
                        placeholder="Link to Event Poster"
                        onChange={handleControlledInputChange}
                        defaultValue={event.poster}
                    />
                </div>
            </Form.Field>
            <Button type="submit"
                className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault() // Prevent browser from submitting the form
                    constructEventObject()
                }}>
                {eventId ? <>Save Event</> : <>Add Event</>}</Button>
        </form>
    )
}