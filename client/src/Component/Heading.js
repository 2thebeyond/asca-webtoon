import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import firebase from '../firebase.js';
//import styled from "styled-components";
import styled from "@emotion/styled";

const CustomCollapse = styled(Navbar.Collapse)`
  @media (max-width: 990px) {
    position: absolute;
    right: 1rem;
    top: 100%;
    right: -0px; 
    width: 180px;
    color: white;
    background-color: black !important;
    border: 1px solid #0000 !important;
`;

function Heading() {
  const user = useSelector((state) => state.user);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const navigate = useNavigate();
  const LogoutHandler = () => {
    firebase.auth().signOut();
    navigate("/");
  };
  return (
    <Navbar bg="black" variant="dark" expand="lg" className="bg-dark-body-tertiary" style={{backgroundColor: "black"}}> 
      <Container>
        <Navbar.Brand href="/">ASCA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <CustomCollapse id="basic-navbar-nav">
          <Nav className="navbar bg-black z-3" >
            <Link to="/" style={{ color: "white", textDecoration: "none", marginRight: "10px", marginTop: "8px", textAlign: "right"}}>소개</Link>
            <Link to="/story" style={{ color: "white", textDecoration: "none", marginRight: "10px", marginTop: "8px", textAlign: "right"}}>회지 전체</Link>
            <NavDropdown title={<span style={{ color: 'white'}}>회지 장르</span>} style={{marginTop: '7px', textAlign: 'center'}} id="genre-dropdown" menuVariant="dark">
              <NavDropdown.Item as={Link} to="/comedy">코미디</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action">액션</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/fantasy">판타지</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/romance">로맨스</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/life">일상</NavDropdown.Item>
            </NavDropdown>
            <Link to="/poster" style={{ color: "white", textDecoration: "none", marginRight: "10px", marginTop: "8px", textAlign: "right"}}>자보 전체</Link>
            {user.accessToken === "" ? 
            <Link to="/login" style={{ color: "white", textDecoration: "none", marginRight: "10px", marginTop: "8px", textAlign: "right" }}>로그인</Link>
            : <Navbar.Text  style={{ color: "white", textDecoration: "none", marginRight: "10px", marginTop: "10px", textAlign: "right", color: "red" }} onClick={() => LogoutHandler()}>로그아웃</Navbar.Text>}
            {isAdmin ?
           <Link to="/upload" style={{ color: "white", textDecoration: "none", marginRight: "10px", marginTop: "8px", textAlign: "right" }}>글쓰기</Link> : ""}
            {/* <Link to="/list" style={{ color: "white", textDecoration: "none", marginRight: "10px" }}>list</Link> */}
          </Nav>
        </CustomCollapse>
      </Container>
    </Navbar>
  );
}

export default Heading;