import React, { useContext, useEffect, useState } from "react"
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { FollowerContext } from "../follower/FollowerProvider"
import { UserContext } from "./UserProvider"


export const UserCard = ({ users }) => {
    const { followers, addFollower, getFollowers } = useContext(FollowerContext)
    const userId = parseInt(localStorage.getItem("active_user"))
    const { user, getUsers } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUsers()
            .then(getFollowers)
    }, [])


    const followerCheck = (userObj) => {
        const foundFollower = user.find(user => user.username.toUpperCase() === userObj.username.toUpperCase())

        //Checks if the follower already exists and is not the user
        if (foundFollower && foundFollower.id !== parseInt(localStorage.getItem("active_user"))) {
            const followerExist = followers.find(follower => {
                if (follower.activeUserId === parseInt(localStorage.getItem("active_user"))
                    && follower.userId === foundFollower.id) {
                    return true
                } else {
                    return false
                }
            })

            if (followerExist) {
                alert("You are already followers!")
            } else {
                //When everything checks out, creates new follower
                addFollower({
                    userId: foundFollower.id,
                    followedById: userId,
                    followingId: foundFollower.id,
                })
            }
        } else if (foundFollower?.id === parseInt(localStorage.getItem("active_user"))) {
            alert("Can't add yourself as a follower")
        } else {
            alert("User does not exist!")
        }
    }

    return (
        <>
            <div className="user">
                <Card>
                    <Card.Header>
                        <h3 className="user__name">
                            {users.username} </h3>
                    </Card.Header>
                </Card>
            </div>
            <div></div>
            <Button 
                type="submit"
                className="btn btn-primary"
                // disabled={isLoading}
                onClick={event => {
                    followerCheck(users)
                    getFollowers()
            }
            } >Add Follower</Button>
        </>
    )
}