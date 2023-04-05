import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

export default function Teacher() {
    const [validated, setValidated] = useState(false);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [allTeacher, setAllTeacher] = useState([]);
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
            await axios.post('https://localhost:7267/api/Teacher', {
                firstName: fname,
                lastName: lname,
                contactNo: contact,
                email: email
            });
            alert("Teacher Registation Successfully");
        } catch (err) {
            alert(err);
        }
    };
    //Get All Teacher Details
    useEffect(() => {
        const getAllTeacher = async () => {
            const data = await fetch('https://localhost:7267/api/Teacher');
            const getData = await data.json();
            setAllTeacher(await getData);
        }
        getAllTeacher();
    }, [])
    //Delete Teacher and Subject
    const Delete = async (teacherID) => {
        try {
            await axios.post('https://localhost:7267/api/Teacher/DeleteTeacher', {
                id: teacherID
            })
            alert("Teacher Remove Successfully");
        }
        catch (err) {
            alert(err);
        }
    }
    return (
        <>
            <div className='container'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-4 p-2">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First Name"
                                onChange={(e) => { setFname(e.target.value) }}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last Name"
                                onChange={(e) => { setLname(e.target.value) }}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-2 p-2">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Contact Number"
                                onChange={(e) => { setContact(e.target.value) }}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Email"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <div className='d-flex justify-content-end'>
                        <Button type="submit" className="p-2 bg-info">Submit form</Button>
                    </div>
                    <div className='d-flex align-items-center justify-content-center'>
                        <div className="pt-5 w-75">
                            <table className="table table-bordered">
                                <thead>
                                    <tr >
                                        <th className="col-md-3">First Name</th>
                                        <th className="col-md-3">Last Name</th>
                                        <th className="col-md-3">Contact Number</th>
                                        <th className="col-md-1">Email</th>
                                        <th className="col-md-1">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allTeacher?.map(item => {
                                            return (
                                                <>
                                                    <tr key={item.id} value={item.id}>
                                                        <td >{item.firstName}</td>
                                                        <td >{item.lastName}</td>
                                                        <td >{item.contactNo}</td>
                                                        <td >{item.email}</td>
                                                        <td className='d-flex gap-1'><Button className="p-2 bg-info" onClick={() => Delete(item.id)}>deallocate</Button>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    )
}
