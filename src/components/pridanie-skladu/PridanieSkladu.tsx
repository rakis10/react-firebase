import { useState } from 'react';

import { Button, Modal } from "react-bootstrap";
import PridanieSkladuForm from './PridanieSkladuForm';

export default function PridanieSkladu({ onFinish }: { onFinish: () => void }) {

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
                Pridanie várky do skladu
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Pridanie do skladu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PridanieSkladuForm onSubmit={handleSubmit} />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}
