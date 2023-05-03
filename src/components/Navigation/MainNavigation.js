import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

const MainNavigation = () => {
  return (
    <>
            <Navbar
                key={false}
                bg="light"
                expand={false}
                className="p-3 mb-4 shadow sticky-top"
            >
                <Container fluid>
                    <Navbar.Brand href="/">Noël Fotos</Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls={`offcanvasNavbar-expand-${false}`}
                    />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${false}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title
                                id={`offcanvasNavbarLabel-expand-${false}`}
                            >
                                Albums
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/events">Events</Nav.Link>
                                <Nav.Link href="#">Men</Nav.Link>
                                <Nav.Link href="#">Women</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
  )
}

export default MainNavigation