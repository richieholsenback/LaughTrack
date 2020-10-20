import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "../event/EventProvider"
import "./Event.css"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Input, Label, TextArea } from "semantic-ui-react";

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
                userId: userId
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
                userId: userId
            })
                .then(() => history.push("events"))
        }
    }

    // const stateCodes = [
    //     'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    //     'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    //     'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    //     'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    //     'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    // ];


    return (
        <form className="eventForm">
            <h2 className="eventForm__title">New Event</h2>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="name">Event name: </Label>
                    <input
                        type="text"
                        id="eventName"
                        name="name"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Event name"
                        onChange={handleControlledInputChange}
                        defaultValue={event.name}
                    />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="date">Date: </Label>
                    <input
                        type="date"
                        id="eventDate"
                        name="date"
                        required
                        className="form-control"
                        onChange={handleControlledInputChange}
                        defaultValue={event.date}
                    />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="location">Name of venue: </Label>
                    <input
                        type="text"
                        id="eventLocation"
                        name="location"
                        required
                        className="form-control"
                        placeholder="Venue Name"
                        onChange={handleControlledInputChange}
                        defaultValue={event.location}
                    />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="address">Street address of venue: </Label>
                    <input
                        type="text"
                        id="eventAddress"
                        name="address"
                        required
                        className="form-control"
                        placeholder="Street address"
                        onChange={handleControlledInputChange}
                        defaultValue={event.address}
                    />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="city">City: </Label>
                    <input
                        type="text"
                        id="eventCity"
                        name="city"
                        required
                        className="form-control"
                        placeholder="City"
                        onChange={handleControlledInputChange}
                        defaultValue={event.city}
                    />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="state">State: </Label>
                    <input
                        type="text"
                        id="eventState"
                        name="state"
                        required
                        className="form-control"
                        placeholder="State"
                        onChange={handleControlledInputChange}
                        defaultValue={event.state}
                    />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="zip">Zip code: </Label>
                    <input
                        type="text"
                        id="eventZip"
                        name="zip"
                        required
                        className="form-control"
                        placeholder="Zip"
                        onChange={handleControlledInputChange}
                        defaultValue={event.zip}
                    />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <Label htmlFor="description">Description of your event: </Label>
                    <TextArea
                        type="text"
                        id="eventDescription"
                        name="description"
                        required
                        className="form-control"
                        placeholder="Description"
                        onChange={handleControlledInputChange}
                        defaultValue={event.description}
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