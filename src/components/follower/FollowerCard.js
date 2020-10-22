import React, { useContext } from "react"

export const FollowerCard = ({ followers }) => (
    <section className="follower">
        <h3 className="follower__name">{ followers.user.username }</h3>
    </section>
)