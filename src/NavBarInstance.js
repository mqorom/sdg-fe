import { Nav, Navbar } from "rsuite";
import 'rsuite/dist/rsuite.min.css';

export const NavBarInstance = ({ onSelect, activeKey }) => {
    return (
      <Navbar appearance='inverse'>
        <Navbar.Brand href="#">BOOK STORE</Navbar.Brand>
        <Nav onSelect={onSelect} activeKey={activeKey}>
          <Nav.Item eventKey="1">Books</Nav.Item>
          <Nav.Item eventKey="2">Authors</Nav.Item>
        </Nav>
      </Navbar>
    );
  };
  