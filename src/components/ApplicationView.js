import React from "react";
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { JournalDetail } from "./journal/JournalDetails";
import { JournalForm } from "./journal/JournalForm";
import { JournalList } from "./journal/JournalList";
import { JournalProvider } from "./journal/JournalProvider";
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

            <JournalProvider>
                        <Route exact path="/journals">
                            <JournalList />
                        </Route>
            </JournalProvider>

            <JournalProvider>
                <Route exact path="/journals/create">
                    <JournalForm />
                </Route>
            </JournalProvider>

            <JournalProvider>
                <Route exact path="/journals/detail/:journalId(\d+)">
                    <JournalDetail />
                </Route>
            </JournalProvider>

            <JournalProvider>
                <Route path="/journals/edit/:journalId(\d+)">
                    <JournalForm />
                </Route>
            </JournalProvider>
        </>
    )
}