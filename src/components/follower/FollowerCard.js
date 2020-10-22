import React, { useContext } from "react"

//creates html for each follower, which can be clicked to view the details of that follower
export const FollowerCard = ({ followers }) => (
    <section className="follower">
        <h3 className="follower__name">{ followers.user.username }</h3>
    </section>
)