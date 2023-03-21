import { useEffect, useState } from 'react';

import { Col, Container, Row } from "react-bootstrap";
import { getAllObjednavky } from '../services/objednavky';
import { getAllSklad } from '../services/sklad';
import { Objednavka, SkladItem } from '../services/types';
import ListObjednavky from './ListObjednavky/ListObjednavky';
import OtvoreneObjednavky from './OtvoreneObjednavky';
import PridanieObjednavky from './pridanie-objednavky/PridanieObjednavky';
import PridanieSkladu from './pridanie-skladu/PridanieSkladu';
import VolneTable from './VolneTable';
import VsetkyObjednavkyTable from './VsetkyObjednavkyTable';

export default function Dashboard() {
    // const [sklad, setSklad] = useState<number | null>(null)
    const [sklad, setSklad] = useState<SkladItem[]>([])
    const [objednavky, setObjednavky] = useState<Objednavka[]>([])

    function callUpdate() {
        // getSumSklad().then((data) => {
        //     setSklad(data)
        // })
        getAllSklad().then((data) => {
            setSklad(data)
        })
        getAllObjednavky().then((datas)=>{
            setObjednavky(datas)
        })
    }
    useEffect(() => {
        callUpdate()
    }, [])



    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <VolneTable data={sklad} />
                        <PridanieSkladu onFinish={callUpdate} />
                    </Col>
                    <Col>
                        <OtvoreneObjednavky data={objednavky}/>
                        <PridanieObjednavky onFinish={callUpdate} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <VsetkyObjednavkyTable data={objednavky} />
                        <PridanieSkladu onFinish={callUpdate} />
                    </Col>
                    
                    <Col>
                        <ListObjednavky data={objednavky} />
                        <PridanieSkladu onFinish={callUpdate} />
                    </Col>
            
                </Row>

            </Container>
        </>
    );
}
