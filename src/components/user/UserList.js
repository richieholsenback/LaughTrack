import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import { UserCard } from "./UserCard"
import { useHistory } from "react-router-dom"
import { FollowerContext } from "../follower/FollowerProvider"

export const UserList = () => {

  const { user, getUsers, searchTerms } = useContext(UserContext)
  const {followers, getFollowers} = useContext(FollowerContext)

  const [filteredUsers, setFiltered] = useState([])

  const history = useHistory()

  useEffect(() => {
    getFollowers().then(
    getUsers())
  }, [])

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = user.filter(users => users.username.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      setFiltered(user)
    }
  }, [searchTerms, user])

  // const filteredUsers = followers.filter(follower => follower.followingId !== users.userId)
//   const alreadyFollowing = (obj) => {
//     obj.filter(object => {
//     if(object.userId.includes(+localStorage.getItem("active_user"))){
//   return null
// } else if(object.userId === )
// }
//     )}

  return (
    <>
      <div className="users">
        {
          filteredUsers.map(user => {
            return <UserCard key={user.id} user={user} />
          })
        }
      </div>
    </>
  )
}