import React, { useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import { Button, Card, Icon } from "semantic-ui-react"
import { FollowerContext } from "./FollowerProvider"
import "./Follower.css"

//creates html for each follower, which can be clicked to view the details of that follower
export const FollowerCard = ({ follower }) => {

    const { unfollow } = useContext(FollowerContext)

    const history = useHistory()

    function refreshPage() {
        window.location.reload(false);
    }

    const buttonShow = (() => {
        if (follower.followedById === parseInt(localStorage.getItem("active_user")))
            return (
                <>
                    <Button
                        compact
                        type="submit"
                        className="btn_btn-primary"
                        onClick={
                            () => {
                                unfollow(follower.id)
                                    .then(() => {
                                        history.push("/followers")
                                        refreshPage()
                                    })
                            }}><Icon name="remove user" /> Unfollow
                    </Button>
                </>
            )
    })

    return (
        <div className="followListings">
            {buttonShow()}
            <Card.Header>
                <h3 className="follower">
                    <Link to={`/followers/detail/${follower.userId}`}>
                        <h3 className="follower__name">{follower.user.username}</h3>
                    </Link>
                </h3>
            </Card.Header>
        </div>
    )
}
