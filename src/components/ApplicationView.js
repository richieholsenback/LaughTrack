import React from "react";
import { Route } from "react-router-dom"
import { EventDetail } from "./event/EventDetail";
import { EventForm } from "./event/EventForm";
import { EventList } from "./event/EventList";
import { EventProvider } from "./event/EventProvider";
import { FollowerDetails } from "./follower/FollowerDetails";
import { FollowerList } from "./follower/FollowerList";
import { FollowerProvider } from "./follower/FollowerProvider";
import { Home } from "./Home"
import { MessageForm } from "./message/MessageForm";
import { MessageProvider } from "./message/MessageProvider";
import { UserList } from "./user/UserList";
import { UserProvider } from "./user/UserProvider";
import { JournalProvider } from "./journal/performances/JournalProvider";
import { JournalList } from "./journal/performances/JournalList"
import { JournalForm } from "./journal/performances/JournalForm"
import { JournalDetail } from "./journal/performances/JournalDetails"
import { CommentProvider } from "./journal/comments/CommentProvider";
import { JournalIdeaList } from "./journal/ideas/JournalIdeaList";
import { JournalHub } from "./journal/JournalHub";
import { JournalIdeaProvider } from "./journal/ideas/JournalIdeaProvider";

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
                <JournalIdeaProvider>
                    <Route exact path="/journals">
                        <JournalHub />
                    </Route>
                </JournalIdeaProvider>
            </JournalProvider>

            <JournalProvider>
                <Route exact path="/journals/ideas">
                    <JournalIdeaList />
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
                <Route exact path="/journals/edit/:journalId(\d+)">
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
                <Route exact path="/events/edit/:eventId(\d+)">
                    <EventForm />
                </Route>
            </EventProvider>

            <FollowerProvider>
                <UserProvider>
                    <Route exact path="/followers">
                        <FollowerList />
                    </Route>
                </UserProvider>
            </FollowerProvider>

            <UserProvider>
                <FollowerProvider>
                    <Route exact path="/followers">
                        <UserList />
                    </Route>
                </FollowerProvider>
            </UserProvider>

            <FollowerProvider>
                <UserProvider>
                    <JournalProvider>
                        <CommentProvider>
                            <EventProvider>
                                <Route exact path="/followers/detail/:followingId(\d+)" >
                                    <FollowerDetails />
                                </Route>
                            </EventProvider>
                        </CommentProvider>
                    </JournalProvider>
                </UserProvider>
            </FollowerProvider>
        </>
    )
}