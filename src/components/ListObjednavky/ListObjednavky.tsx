import { useEffect, useState } from 'react';

import { Modal, Table } from "react-bootstrap";
import { Objednavka } from '../../services/types';
import FillObjednavka from './FillObjednavka';

export default function ListObjednavky({ data }: { data: Objednavka[] }) {
    const [rows, setRows] = useState<Objednavka[]>([])

    useEffect(() => {
        setRows(data)
    }, [data])

    const [show, setShow] = useState<Objednavka | undefined>();

    const handleClose = () => setShow(undefined);

    function showDetail(item: Objednavka) {
        setShow(item)
    }
    return (
        <>
            <h1 className={'text-warning'}>
                Otvorené objednávky
            </h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sirka</th>
                        <th>Dlzka</th>
                        <th>Pocet</th>
                        <th>Spolu metrov</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        rows.map((item, index) => {


                            return [
                                <tr key={index} onClick={() => {
                                    showDetail(item)
                                }}>
                                    <td>{item.sirka}</td>
                                    <td>{item.dlzka}</td>
                                    <td>{item.pocet}</td>
                                    <td>{item.sum}</td>
                                </tr>
                            ]
                        })
                    }



                </tbody>
            </Table>

            <Modal show={show !== undefined} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Naplnit objednávku</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {show && <FillObjednavka objednavka={show} onClose={handleClose} />}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>


        </>
    );
}
