import React, { useContext} from "react"
import { MessageContext } from "./MessageProvider"
import { useHistory} from 'react-router-dom'
import "./Message.css"

export const MessageCard = ({ message }) => {
    const history = useHistory()

    const { deleteMessage } = useContext(MessageContext)

    const buttonShow = (() => {
        if (message.user.id === parseInt(localStorage.getItem("active_user")))
            return (
                <>
                    <button onClick={
                        () => {
                            deleteMessage(message.id)
                                .then(() => {
                                    history.push("/messages")
                                })
                        }}>Delete
                    </button>
                </>
            )
    })

    return (
        <section className="messageBox">
                <section className="messageContainer">
                    <div className="message"><strong>{message.user.username}</strong> - <em>{message.message}</em></div>
                    <div className="message__date">{message.date}</div>
                </section>
                <section className="buttons">
                    {buttonShow()}
                </section>
        </section>
    )
}
