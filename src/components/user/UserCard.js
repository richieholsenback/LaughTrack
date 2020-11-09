import React, { useContext } from "react"
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { FollowerContext } from "../follower/FollowerProvider"
import { UserContext } from "./UserProvider"
import "./User.css"


export const UserCard = ({ user }) => {
    const { followers, addFollower, getFollowers } = useContext(FollowerContext)
    const userId = parseInt(sessionStorage.getItem("active_user"))

    const addFollowerObj = (followerObj) => {
        addFollower({
            userId: followerObj,
            followedById: userId,
            followingId: followerObj,
        })
        // .then(getUsers)	
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <>
            <section className="userCard">

                <Button
                    compact
                    type="submit"
                    className="btn_btn-primary"
                    // disabled={isLoading}
                    onClick={event => {
                        addFollowerObj(user.id)
                        refreshPage()
                    }
                    } ><Icon name="add user" /> Follow</Button>
                <Card.Header>
                    <h3 className="user__name">
                        {user.username} </h3>
                </Card.Header>
            </section>
        </>
    )
}