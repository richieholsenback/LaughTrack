import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { Button, Form, Segment } from "semantic-ui-react"
import photo from "../../images/loginbg.jpg"

export const Login = props => {
    const email = useRef();
    const password = useRef();
    const existDialog = useRef();
    const history = useHistory();



    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => (user.length ? user[0] : false));
    };

    const handleLogin = e => {
        e.preventDefault();

        existingUserCheck().then(exists => {
            if (exists) {
                localStorage.setItem("active_user", exists.id);
                history.push("/");
            } else {
                existDialog.current.showModal();
            }
        });
    };

    return (
        <>
            <main className="container--login">
                <dialog className="dialog dialog--auth" ref={existDialog}>
                    <div>User does not exist</div>
                    <Button
                        className="button--close"
                        onClick={e => existDialog.current.close()}
                    >
                        Close
        </Button>
                </dialog>

                <section>
                    <Segment inverted>
                        <Form inverted className="form--login" onSubmit={handleLogin}>
                            <h1>Laugh Track</h1>
                            <h2>Please sign in</h2>
                            <Form>
                                <label htmlFor="inputEmail"> Email address </label>
                                <input
                                    ref={email}
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Email address"
                                    required
                                    autoFocus
                                />
                            </Form>
                            <Form>
                                <Button type="submit">Sign in</Button>
                            </Form>
                        </Form>
                    </Segment>
                </section>
                <section className="link--register">
                    <Link to="/register">Not a member yet?</Link>
                </section>
            </main>

            <img id="imageBG" src={photo} alt="Dave Chappelle doing standup" />
        </>
    );
};