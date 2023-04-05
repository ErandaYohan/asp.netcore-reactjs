import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

export default function Classroom() {
    const [validated, setValidated] = useState(false);
    const [className, setClassName] = useState("");
    const [allClass, setAllClass] = useState([]);
    //Get values in input data and pass to backend by API
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        event.preventDefault();
        try {
            await axios.post('https://localhost:7267/api/Class', {
                className: className
            });
            alert("Class Registation Successfully");
        } catch (err) {
            alert(err);
        }
    };
    //Get Class Details 
    useEffect(() => {
        const getAllClasses = async () => {
            const data = await fetch('https://localhost:7267/api/Class');
            const getData = await data.json();
            setAllClass(await getData);
        }
        getAllClasses();
    }, [])
    //Delete Teacher and Subject
    const Delete = async (classId) => {
        //console.log(classId);
        try {
            await axios.post('https://localhost:7267/api/Class/DeleteClass', {
                id: classId,
            });
            alert("Student Remove Successfully");
        } catch (err) {
            alert(err);
        }
    }
    return (
        <div className='container'>
            <Form noValidate validated={validated} onSubmit={handleSubmit} >
                <Row className="mb-3 d-flex align-items-center justify-content-center g-3 ">
                    <span className="border p-5 d-flex align-items-center justify-content-center flex-column">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <div className="d-flex align-items-center gap-3">
                                <Form.Label>Classroom Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Classroom Name"
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setClassName(e.target.value);
                                    }}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Button type="submit" className="p-2 bg-info">Submit form</Button>
                            </div>
                        </Form.Group>
                        <div className="pt-5 w-50">
                            <table className="table table-bordered">
                                <thead>
                                    <tr >
                                        <th className="col-md-4">Subject</th>
                                        <th className="col-md-1">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allClass?.map(item => {
                                            return (
                                                <>
                                                    <tr key={item.id} value={item.id}>
                                                        <td >{item.className}</td>
                                                        <td><Button className="p-2 bg-info" onClick={() => Delete(item.id)}>deallocate</Button></td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </span>
                </Row>
            </Form>
        </div>
    )
}
