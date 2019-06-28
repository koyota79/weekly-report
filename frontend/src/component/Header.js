import React    from 'react';
import {Nav ,Navbar ,Form ,Button ,FormControl} from 'react-bootstrap';

const Header = () => (
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">WEEKLY REPORT</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/report">주간보고</Nav.Link>
      {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
  </Navbar>
)

export default Header;