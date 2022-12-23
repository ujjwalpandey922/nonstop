import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
 import { ToastContainer, toast } from "react-toastify";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
const Login = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const NavTo = useNavigate();

  //Login Handle
  const handleLogIn = () => {
    if (!name || !password) {
      toast.error("enter all fields");
      return;
    }
    if(name !=="user" || password !=="user"){
      toast.error("wrong password");
      return;
    }
    NavTo("/home");
    toast.error("User Not Found");
  };
  //handle User
  const handleUser =()=>{
      setName("user");
      setPassword("user");
  }
  return (
    <>
      <Container className="d-flex flex-column justify-content-start my-5 ">
        <Row className="mb-3 my-5 justify-content-md-center">
          <Col className="text-center Title login" xs lg="4">
            Log In
          </Col>
        </Row>
        <Row className="justify-content-md-center ">
          <Col className="Title login p-2" xs lg="4"  >
            <Form>
              <Form.Group className="mb-2" controlId="Basicusername">
                <Form.Label>User Name </Form.Label>
                <Form.Control
                  value={name}
                  type="text"
                  placeholder="Enter User Name "
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  value={password}
                  type={show ? "text" : "password"}
                  placeholder="Enter Password "
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="outline-light"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputGroup>

              <Button
                variant="primary"
                style={{ width: "100%", marginTop: "8px" }}
                onClick={handleUser}
              >
                Use Guest Info
              </Button>
              <Button
                variant="info"
                style={{ width: "100%", marginTop: "8px" }}
                onClick={handleLogIn}
              >
                Log In
              </Button>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Login;
