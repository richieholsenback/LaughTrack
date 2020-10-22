import React, { useContext } from "react"
import { Card, Icon, Image } from 'semantic-ui-react'
import { FollowerContext } from "../follower/FollowerProvider"
import { UserContext } from "./UserProvider"


export const UserCard = ( {users} ) => {
    const { addFollower } = useContext(FollowerContext)
    const userId = parseInt(localStorage.getItem("active_user"))
    const { getUsers } = useContext(UserContext)

    const addFollowerObj = (followerObj) => {
        addFollower({
            userId: followerObj,
            followingId: userId,
        })
        // .then(getUsers)
    }
    

    return (
    <section className="user">
        <Card>
        <Card.Header>
        <h3 className="user__name">
        { users.username } </h3>
        </Card.Header>
        
            {/* <Link to={`/users/detail/${users.id}`}>  
                <Image src={ users.photo } alt="Me!"></Image>
            </Link>
        <Card.Content>
        <div className="user__species">{ users.species }</div>
        </Card.Content> */}
        </Card>

        <section>
            <button onClick={
                () => {
                    addFollowerObj(users.id)
                }
            }>Add Follower</button>
        </section>

    </section>
    )
}