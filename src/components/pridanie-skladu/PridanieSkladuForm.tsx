import { Field, Form, Formik } from 'formik';

import { FormikValues } from 'formik/dist/types';
import { Button, FormLabel, Row } from "react-bootstrap";
import * as yup from 'yup';
import { addSklad } from '../../services/sklad';
import { SkladItem } from '../../services/types';

export default function PridanieSkladuForm({ onSubmit }: { onSubmit: () => void }) {

    const handleSubmit = (values: FormikValues) => {
        const output : Omit<SkladItem, 'id'>= {
            sirka: values.hrubka,
            dlzka: values.dlzka,
            pocet: values.pocet,
            sum: values.pocet * values.dlzka
        }
        addSklad(output).then(onSubmit)
        
    };
    const schema = yup.object().shape({
        hrubka: yup.number().required().nullable(),
        dlzka: yup.number().required().nullable(),
        pocet: yup.number().required().nullable(),
    });
    return (
        <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
                hrubka: undefined,
                dlzka: undefined,
                pocet: undefined
            }}
        >
            {({
                errors,
            }) => (
                // <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form>
                    <Row className="mb-6">
                        <div className="form-group">
                            <FormLabel>Hrubka</FormLabel>
                            <Field isInvalid={!!errors.hrubka} className="form-control" type="number" name="hrubka" placeholder="Hrubka v milimetroch" />
                            <div style={{ color: 'red' }}>
                                {errors.hrubka}
                            </div>
                        </div>


                    </Row>
                    <Row className="mb-6">
                        <div className="form-group">
                            <FormLabel>Dlzka tyce</FormLabel>
                            <Field isInvalid={!!errors.hrubka} className="form-control" type="number"
                                name="dlzka" placeholder="dlzka v metroch" />
                            <div style={{ color: 'red' }}>
                                {errors.dlzka}
                            </div>
                        </div>
                    </Row>
                    <Row className="mb-6">
                        <div className="form-group">
                            <FormLabel>Pocet</FormLabel>
                            <Field isInvalid={!!errors.hrubka}
                                className="form-control"
                                type="number"
                                name="pocet"
                                placeholder="Pocet v metroch" />
                            <div style={{ color: 'red' }}>
                                {errors.pocet}
                            </div>
                        </div>
                    </Row>

                    <Button type="submit">Submit form</Button>
                </Form>
            )}
        </Formik>
    );

}
