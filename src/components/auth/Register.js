import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { Card, Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'
import photo from "../../images/comedy-laughing-e1516163964662.jpg"

export const Register = props => {
  const username = useRef();
  const email = useRef();
  const verifyPassword = useRef();
  const conflictDialog = useRef();
  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?email=${email.current.value}`)
      .then(res => res.json())
      .then(user => !!user.length);
  };

  const handleRegister = e => {
    e.preventDefault();

    existingUserCheck().then(userExists => {
      if (!userExists) {
        fetch("http://localhost:8088/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email.current.value,
            username: `${username.current.value}`
          })
        })
          .then(_ => _.json())
          .then(createdUser => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("active_user", createdUser.id);
              history.push("/");
            }
          });
      } else {
        conflictDialog.current.showModal();
      }
    });
  };

  return (
    <>
      {/* <main style={{ textAlign: "left" }} className="container--register">
        <dialog className="dialog dialog--password" ref={conflictDialog}>
          <div>Account with that email address already exists</div>
          <button
            className="button--close"
            onClick={e => conflictDialog.current.close()}
          >
            Close
        </button>
        </dialog>
        <section>
          <Card.Content>
            <Form className="form--login" onSubmit={handleRegister}>
              <h1 className="h3 mb-3 font-weight-normal"><Card.Header>
                Become a Better Comedian</Card.Header>
              </h1>
              <Card.Content>
                <div>
                  <label htmlFor="username">Create a Username </label>
                  <input
                    ref={username}
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    required
                    autoFocus
                  /></div>
                <div>
                  <label htmlFor="inputEmail">Email Address </label>
                  <input
                    ref={email}
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    required
                  /></div>
              </Card.Content>
              <Button type="submit"> Sign in </Button>

            </Form>
          </Card.Content>
        </section>
      </main> */}

      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Laugh Track
                    </Header>
          <dialog className="dialog dialog--password" ref={conflictDialog}>
            <div>Account with that email address already exists</div>
            <button
              className="button--close"
              onClick={e => conflictDialog.current.close()}
            >
              Close
        </button>
          </dialog>
          <Form size='large' onSubmit={handleRegister}>
            <Segment stacked>
              <input
                ref={username}
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                required
                autoFocus
              />
              <input
                ref={email}
                type="email"
                name="email"
                className="form-control"
                placeholder="Email address"
                required
              />
              <Button type="submit" fluid size='large'>
                Login
          </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <Link to="/login">Log in</Link>
          </Message>
        </Grid.Column>
      </Grid>

      <div className="picContainer">
        <img id="child" src={photo} alt="Dave Chappelle doing standup" width="100%" />
      </div>
    </>
  );
};
