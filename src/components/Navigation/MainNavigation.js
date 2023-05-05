import { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "@styles/Home.module.scss";

const MainNavigation = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar
                bg="light"
                expand={false}
                className="p-3 mb-4 shadow sticky-top"
            >
                <Container fluid>
                    <Navbar.Brand href="/">Noël Fotos</Navbar.Brand>
                    <Navbar.Toggle onClick={handleShow} />
                    <Navbar.Offcanvas placement="end" show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Albums</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ul
                                className={styles.navFolders}
                                onClick={props.handleOnfolderClick}
                            >
                                {props.folders.map((folder) => {
                                    return (
                                        <li
                                            key={folder.path}
                                        >
                                            <button
                                                data-folder-path={folder.path}
                                                onClick={handleClose}
                                            >
                                                {folder.name}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
};

export default MainNavigation;