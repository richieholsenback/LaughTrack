import React from "react"
import { Link } from "react-router-dom"

export const EventCard = ({ event }) => (
    <section className="event">
        <h3 className="event__title">
            <Link to={`/events/detail/${event.id}`}>
                {event.name}
            </Link>
        </h3>
        <p className="eventCardDetail">
            {event.date}
        </p>
    </section>
    )