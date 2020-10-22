import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import { UserCard } from "./UserCard"
import {useHistory} from "react-router-dom"

export const UserList = () => {
    const { users, getUsers } = useContext(UserContext)
    const history = useHistory()
    
    useEffect(() => {
		getUsers()
		
    }, [])

    return (
      <>
          <h3>Suggested Follow</h3>
        <div>
      {
      users.map(users => {
        return <UserCard key={users.id} users={users} />
      })
      }
        </div>
      </>
  )
}