import { useState } from 'react';

import { Button, Modal } from "react-bootstrap";
import PridanieObjednavkyForm from './PridanieObjednavkyForm';

export default function PridanieObjednavky({ onFinish }: { onFinish: () => void }) {

    const [show, setShow] = useState(false);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        onFinish()
        handleClose()
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Pridanie objednavky
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Vytvoriť objednávku</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PridanieObjednavkyForm onSubmit={handleSubmit} />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}
