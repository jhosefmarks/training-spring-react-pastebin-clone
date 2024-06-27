import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import { NavLink } from 'react-router-dom'

import { logoutUser } from '../actions/authActions'

export default function Navigation() {
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.auth.loggedIn)
  const user = useSelector(state => state.auth.user)

  return (
    <Navbar collapseOnSelect bg="primary" variant="dark" expand="md">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">React Java</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-menu" />
        <Navbar.Collapse id="main-menu" className="justify-content-end">
          { loggedIn && (
            <Nav className="me-auto">
              <Nav.Item>
                <Nav.Link as={NavLink} to='/newpost'>Criar Post</Nav.Link>
              </Nav.Item>
            </Nav>
          )}
          <Nav>
            { !loggedIn ? (
              <>
                <Nav.Link as={NavLink} to='/signup'>Criar Conta</Nav.Link>
                <Nav.Link as={NavLink} to="/signin">Iniciar Sessão</Nav.Link>
              </>
            ): (
              <NavDropdown title={user.sub} id="menu-dropdown">
                <NavDropdown.Item as={NavLink} to='/posts'>Meus Posts</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => dispatch(logoutUser())}>Encerrar Sessão</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
