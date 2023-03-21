import { useContext } from 'react';

import { Navbar } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export default function NavbarComponent() {
    const user = useContext(AuthContext);



    return (
        <>
            <Navbar className="justify-content-between" bg="dark" variant="dark">

            </Navbar>




        </>
    );
}
