import { useEffect, useState } from 'react';

import { Table } from "react-bootstrap";
import { volneTablePreprocess } from '../services/dataUtils';
import { SkladItem } from '../services/types';
import { VolneItem } from './types';

export default function VsetkyObjednavkyTable({ data }: { data: SkladItem[] }) {
    const [rows, setRows] = useState<SkladItem[]>([])

    useEffect(() => {
        setRows(data)

    }, [data])



    return (
        <>
            <h1 style={{ color: 'green' }}>
                Volné zásoby

            </h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sirka</th>
                        <th>Spolu metrov</th>
                        <th>50 m</th>
                        <th>100 m</th>
                        <th>150 m</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rows.map((item, index) => {
                            return [
                                <tr key={index}>
                                    <td>{item.sirka}</td>
                                    {/* <td>{item.sumMetrov}</td>
                                    <td>{item.padeKs + ' ks'}</td>
                                    <td>{item.stoKs + ' ks'}</td>
                                    <td>{item.stopadeKs + ' ks'}</td> */}
                                </tr>
                            ]
                        })
                    }
                </tbody>
            </Table>


        </>
    );
}
