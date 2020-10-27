import React, { useContext } from "react"
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { FollowerContext } from "../follower/FollowerProvider"
import { UserContext } from "./UserProvider"


export const UserCard = ({ user }) => {
    const { followers, addFollower, getFollowers } = useContext(FollowerContext)
    const userId = parseInt(localStorage.getItem("active_user"))

    const addFollowerObj = (followerObj) => {	
        addFollower({	
            userId: followerObj,	
            followedById: userId,	
            followingId: followerObj,	
        })	
        // .then(getUsers)	
    }	

    
    return (
        <section className="user">
            <Card>
                <Card.Header>
                    <h3 className="user__name">
                        {user.username} </h3>
                </Card.Header>
            </Card>
            <Button 
                type="submit"
                className="btn btn-primary"
                // disabled={isLoading}
                onClick={event => {
                    addFollowerObj(user.id)
            }
            } >Add Follower</Button>
        </section>
    )
}