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
import { CommentProvider } from "./journal/performances/comments/CommentProvider";
import { IdeaList } from "./journal/ideas/IdeaList";
import { JournalHub } from "./journal/JournalHub";
import { IdeaProvider } from "./journal/ideas/IdeaProvider";
import { IdeaForm } from "./journal/ideas/IdeaForm";
import { IdeaDetail } from "./journal/ideas/IdeaDetails";
import { IdeaCommentProvider } from "./journal/ideas/IdeaComments/IdeaCommentProvider";
import { UserSearch } from "./user/UserSearch";
import { JournalSearch } from "./journal/performances/JournalSearch";
import { IdeaSearch } from "./journal/ideas/IdeaSearch";

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
                <UserProvider>
                    <IdeaProvider>
                        <CommentProvider>
                            <Route exact path="/journals">
                                <JournalHub />
                            </Route>
                        </CommentProvider>
                    </IdeaProvider>
                </UserProvider>
            </JournalProvider>

            <JournalProvider>
                <IdeaProvider>
                    <UserProvider>
                        <Route exact path="/journals/performances">
                            <JournalSearch />
                            <JournalList />
                        </Route>
                    </UserProvider>
                </IdeaProvider>
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

            <IdeaProvider>
                <UserProvider>
                    <Route exact path="/journals/ideas">
                        <IdeaSearch />
                        <IdeaList />
                    </Route>
                </UserProvider>
            </IdeaProvider>

            <IdeaProvider>
                <Route exact path="/journals/ideas/create">
                    <IdeaForm />
                </Route>
            </IdeaProvider>

            <IdeaProvider>
                <IdeaCommentProvider>
                    <UserProvider>
                        <Route exact path="/journals/ideas/detail/:ideaId(\d+)">
                            <IdeaDetail />
                        </Route>
                    </UserProvider>
                </IdeaCommentProvider>
            </IdeaProvider>

            <IdeaProvider>
                <Route exact path="/journals/ideas/edit/:ideaId(\d+)">
                    <IdeaForm />
                </Route>
            </IdeaProvider>

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
                    <JournalProvider>
                        <Route exact path="/followers">
                            <FollowerList />
                        </Route>
                    </JournalProvider>
                </UserProvider>
            </FollowerProvider>

            <UserProvider>
                <FollowerProvider>
                    <JournalProvider>
                        <Route exact path="/followers">
                            <UserSearch />
                            <UserList />
                        </Route>
                    </JournalProvider>
                </FollowerProvider>
            </UserProvider>

            <FollowerProvider>
                <UserProvider>
                    <IdeaProvider>
                        <JournalProvider>
                            <UserProvider>
                                <EventProvider>
                                    <Route exact path="/followers/detail/:followingId(\d+)" >
                                        <FollowerDetails />
                                    </Route>
                                </EventProvider>
                            </UserProvider>
                        </JournalProvider>
                    </IdeaProvider>
                </UserProvider>
            </FollowerProvider>
        </>
    )
}