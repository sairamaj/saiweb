﻿import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export default props => (
  <Navbar inverse fixedTop fluid collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={'/techtips'}>Sai Tech</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to={'/techtips'} exact>
          <NavItem>
            <Glyphicon glyph='home' /> TechTips
          </NavItem>
        </LinkContainer>
      </Nav>
      <Nav>
        <LinkContainer to={'/azure'} exact>
          <NavItem>
            <Glyphicon glyph='home' /> Azure
          </NavItem>
        </LinkContainer>
      </Nav>
      <Nav>
        <LinkContainer to={'/codesnippets'} exact>
          <NavItem>
            <Glyphicon glyph='home' /> Code Snippets
          </NavItem>
        </LinkContainer>
      </Nav>
      <Nav>
        <LinkContainer to={'/projects'} exact>
          <NavItem>
            <Glyphicon glyph='home' /> Projects
          </NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
