import React, { useContext, useRef } from 'react';
import logo from './logo.svg';
import { auth } from './firebaseSetup';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { Button, Col, Container, Form, Navbar, Row } from "react-bootstrap";
import { AuthContext } from "./context/AuthContext";
import Dashboard from './components/Dashboard';

function App() {
  const user = useContext(AuthContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);



  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };
  return (
    <>
      <Navbar className="justify-content-between" bg="dark" variant="dark">
        <Navbar.Brand>Sklad3.0</Navbar.Brand>
      </Navbar>
      {user ?
        <>
          <Dashboard/>
        </> :

        <Container style={{ maxWidth: "500px" }} fluid>
          <Form className="mt-4">
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control ref={emailRef} type="email" placeholder="email" />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control ref={passwordRef} type="password" placeholder="password" />
            </Form.Group>
            <Form.Group className="text-center">
              <Button onClick={signIn} type="button" variant="primary" >
                Sign In
              </Button>

            </Form.Group>
          </Form>
        </Container>
      }


    </>
  );
}

export default App;
