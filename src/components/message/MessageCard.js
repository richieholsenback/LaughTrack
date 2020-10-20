import React, { useContext, useEffect, useState } from "react"
import { MessageContext } from "./MessageProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Container, Icon } from "semantic-ui-react"
import "./Message.css"

export const MessageCard = ({ message }) => {
    const history = useHistory()

    const { getMessages, deleteMessage, updateMessage } = useContext(MessageContext)

    // useEffect(() => {
    //     if (messageId) {
    //         getMessageById(messageId)
    //             .then(message => {
    //                 setMessage(message)
    //                 setIsLoading(false)
    //             })
    //     } else {
    //         setIsLoading(false)
    //     }
    // }, [])

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
                    {/* <button onClick={() => {
                        history.push(`/messages/edit/${message.id}`)
                    }}><Icon name="edit" />
                    </button> */}
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
