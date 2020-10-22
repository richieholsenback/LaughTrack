import React from "react";
import { Route } from "react-router-dom"
import { EventDetail } from "./event/EventDetail";
import { EventForm } from "./event/EventForm";
import { EventList } from "./event/EventList";
import { EventProvider } from "./event/EventProvider";
import { FollowerList } from "./follower/FollowerList";
import { FollowerProvider } from "./follower/FollowerProvider";
import { Home } from "./Home"
import { CommentForm } from "./journal/CommentForm";
import { CommentList } from "./journal/CommentList";
import { CommentProvider } from "./journal/CommentProvider";
import { JournalDetail } from "./journal/JournalDetails";
import { JournalForm } from "./journal/JournalForm";
import { JournalList } from "./journal/JournalList";
import { JournalProvider } from "./journal/JournalProvider";
import { MessageForm } from "./message/MessageForm";
import { MessageProvider } from "./message/MessageProvider";
import { UserList } from "./user/UserList";
import { UserProvider } from "./user/UserProvider";

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
                <CommentProvider>
                    <UserProvider>
                        <Route exact path="/journals/detail/:journalId(\d+)">
                            <JournalDetail />
                        </Route>
                    </UserProvider>
                </CommentProvider>
            </JournalProvider>

            <JournalProvider>
                <Route path="/journals/edit/:journalId(\d+)">
                    <JournalForm />
                </Route>
            </JournalProvider>

            <EventProvider>
                <Route exact path="/events">
                    <EventList />
                </Route>
            </EventProvider>

            <EventProvider>
                <Route exact path="/events/create">
                    <EventForm />
                </Route>
            </EventProvider>

            <EventProvider>
                <Route exact path="/events/detail/:eventId(\d+)">
                    <EventDetail />
                </Route>
            </EventProvider>

            <EventProvider>
                <Route path="/events/edit/:eventId(\d+)">
                    <EventForm />
                </Route>
            </EventProvider>

            <UserProvider>
                <FollowerProvider>
                    <Route exact path="/users">
                        <UserList />
                    </Route>
                </FollowerProvider>
            </UserProvider>

            <FollowerProvider>
                <UserProvider>
                    <Route exact path="/followers">
                        <FollowerList />
                    </Route>
                </UserProvider>
            </FollowerProvider>
        </>
    )
}