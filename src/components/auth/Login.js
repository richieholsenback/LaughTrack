import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { Button, Card, Container, Form, Segment } from "semantic-ui-react"
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
            <section className="container--login">
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
                    <div inverted>
                        <Form inverted className="form--login" onSubmit={handleLogin}>
                            <h1>Laugh Track</h1>
                            <h2>Please sign in</h2>
                            <fieldset>
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
                            </fieldset>
                            <fieldset>
                                <Button type="submit">Sign in</Button>
                            </fieldset>
                <section className="link--register">
                    <Link to="/register">Not a member yet?</Link>
                </section>
                        </Form>
                    </div>
                </section>
            </section>

            <img id="imageBG" src={photo} alt="Dave Chappelle doing standup" width="100%"/>
        </>
    );
};
