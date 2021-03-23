import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Airports: React.FC = () =>{

    const history = useHistory();
    const handleClick = () => {
        history.push("/");
      };

    return (
        <div> 
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand style={{ cursor: "pointer" }} onClick={handleClick}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link> Routes </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
        </div>
    );
}

export default Airports;