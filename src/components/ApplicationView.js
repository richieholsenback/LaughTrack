import React from "react";
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { MessageForm } from "./message/MessageForm";
import { MessageProvider } from "./message/MessageProvider";

export const ApplicationViews = props => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>

            <MessageProvider>
                <Route exact path="/messages">
                    <MessageForm />
                </Route>
            </MessageProvider>
        </>
    )
}