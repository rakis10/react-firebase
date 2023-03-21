import { useEffect, useState } from 'react';

import { Alert, Button, Row, Table } from "react-bootstrap";
import { getAllSkladFilter } from '../../services/sklad';
import { Objednavka, SkladItem } from '../../services/types';
import useFillObjednavkyService from './useFillObjednavkyService';

export default function FillObjednavka({ objednavka, onClose }: { objednavka: Objednavka, onClose: () => void }) {
    const service = useFillObjednavkyService(objednavka)
    const [rows, setRows] = useState<SkladItem[]>([])

    useEffect(() => {
        getAllSkladFilter(objednavka.dlzka, objednavka.sirka).then((data) => {
            setRows(data)
        })
        // service.setObjednavka(objednavka)
    }, [objednavka])

    const handleConfirm = () => {
        service.submit()
        onClose()
    }



    return (
        <>
            <Row className="mb-6">
                <label>Sirka: {objednavka?.sirka} mm </label>
                <label>Dlzka: {objednavka?.dlzka} m </label>
                <label>Pocet: {objednavka?.pocet} ks </label>
                <label>Spolu {objednavka?.sum} mm </label>
            </Row>
            <hr />
            {
                rows.length === 0 ? <Alert key={"danger"} variant="danger">
                    Niesu žiadne volné na sklade.
                </Alert> :
                    <>
                        <label> Počet {service.fillObj.sum}/{objednavka.pocet} </label>
                        {service.isFull && <Alert key="success" variant="success">
                            V objednavke je dostatok materialu
                        </Alert>}
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Sirka</th>
                                    <th>Dlzka</th>
                                    <th>Pocet</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rows.map((item, index) => {
                                        return [
                                            <tr className={service.affectedSklad.includes(item.id) ? 'bg-warning' : ''} key={index} onClick={() => {
                                                service.pridatFill(item)
                                            }}>
                                                <td>{item.sirka}</td>
                                                <td>{item.dlzka}</td>
                                                <td>{item.pocet + ' ks'}</td>
                                            </tr>
                                        ]
                                    })
                                }
                            </tbody>
                        </Table>
                        <Button variant="primary" onClick={handleConfirm}>
                            Pridať do objednavky
                        </Button>
                    </>
            }



        </>
    );
}
