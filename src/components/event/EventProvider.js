import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data

export const EventContext = createContext()

// This component establishes what data can be used.
export const EventProvider = (props) => {
    const [events, setEvents] = useState([])

    const getEvents = () => {
        return fetch("http://localhost:8088/events?_expand=user")
        .then(res => res.json())
        .then(setEvents)
    }

    const addEvent = eventObj => {
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventObj)
        })
        .then(getEvents)
    }

    const getEventById = (id)=> {
        return fetch(`http://localhost:8088/events/${id}?_expand=user`)
            .then(res => res.json())
    }

    // const getEventByUser = (userId)=> {
    //     return fetch(`http://localhost:8088/events/?${userId}?_expand=user`)
    //         .then(res => res.json())

    const deleteEvent = eventId => {
        return fetch(`http://localhost:8088/events/${eventId}`, {
            method: "DELETE"
        })
            .then(getEvents)
    }

    const updateEvent = event => {
        return fetch(`http://localhost:8088/events/${event.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
            .then(getEvents)
    }
    

    /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <EventContext.Provider value={{
            events, getEvents, addEvent, getEventById, deleteEvent, updateEvent
        }}>
            {props.children}
        </EventContext.Provider>
    )
}