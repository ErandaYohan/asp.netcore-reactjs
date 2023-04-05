import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

export default function Student() {
    const [validated, setValidated] = useState(false);
    const [Class, setClass] = useState("");
    const [searchClass, setSearchClass] = useState([]);
    const [fname,setFname] = useState("");
    const [lname,setLname] = useState("");
    const [contactPerson,setContactPerson] = useState("");
    const [contactNumber,setContactNumber] = useState("");
    const [email,setEmail] = useState("");
    const [dob,setDOB] = useState("");
    const [allStudent,setAllStudent] = useState([]);
    //Get all classes Details
    useEffect(()=>{
        fetch('https://localhost:7267/api/Class')
            .then((res) => res.json())
            .then((result) => {
                setSearchClass(result);
            });
    })
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
            setValidated(true);
            await axios.post('https://localhost:7267/api/Student', {
                firstName: fname,
                lastName: lname,
                contactPerson: contactPerson,
                contactNo: contactNumber,
                emailAddress: email,
                dateOfBirth: dob,
                classId: Class,
            });
            alert("Subject Registation Successfully");
        } catch (err) {
            alert(err);
        }
        
    };
    //Get all Student Details
    useEffect(() => {
        const getAllStudent = async () => {
            const data = await fetch('https://localhost:7267/api/Student');
            const getData = await data.json();
            setAllStudent(await getData);
        }
        getAllStudent();
    }, [])
    //Delete Student by Id 
    const Delete = async(studentId)=>{
        try{
            await axios.post('https://localhost:7267/api/Student/DeleteStudent',{
                id:studentId
            })
            alert("Student Remove Successfully");
        }
        catch(err){
            alert(err);
        }
    }
    return (
        <div className='container'>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            onChange={(e)=>{setFname(e.target.value)}}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                            onChange={(e)=>{setLname(e.target.value)}}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Contact Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Contact Person"
                            onChange={(e)=>{setContactPerson(e.target.value)}}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Contact Number"
                            onChange={(e)=>{setContactNumber(e.target.value)}}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Email Address"
                            onChange={(e)=>{setEmail(e.target.value)}}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            placeholder="Date Of Birth"
                            onChange={(e)=>{setDOB(e.target.value)}}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Classroom</Form.Label>
                        <select className='form-control' onChange={(e) => {
                                    setClass(e.target.value);
                                }}>
                                    <option value="">Choose Class name</option>
                                    {
                                        searchClass.map(Class => (
                                            <option key={Class.id} value={Class.id}>{Class.className}</option>
                                        ))
                                    }
                                </select>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button type="submit" >Submit form</Button>
                <div className='d-flex align-items-center justify-content-center'>
                    <div className="pt-5 w-100">
                        <table className="table table-bordered">
                            <thead>
                                <tr >
                                    <th className="col-md-2">First Name</th>
                                    <th className="col-md-2">Last Name</th>
                                    <th className="col-md-2">Contact Person</th>
                                    <th className="col-md-2">Contact Number</th>
                                    <th className="col-md-2">Email</th>
                                    <th className="col-md-1">Age</th>
                                    <th className="col-md-2">Class Name</th>
                                    <th className="col-md-1">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allStudent?.map(item => {
                                        return (
                                            <>
                                                <tr key={item.id} value={item.id}>
                                                    <td >{item.firstName}</td>
                                                    <td >{item.lastName}</td>
                                                    <td >{item.contactPerson}</td>
                                                    <td >{item.contactNo}</td>
                                                    <td >{item.emailAddress}</td>
                                                    <td >{item.age}</td>
                                                    <td >{item.class.className}</td>
                                                    <td><Button className="p-2 bg-info" onClick={() => Delete(item.id)}>deallocate</Button></td>
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

    )
}
