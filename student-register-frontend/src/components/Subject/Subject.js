import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row} from 'react-bootstrap'

export default function Subject() {
    const [validated, setValidated] = useState(false);
    const [subjectName,setSubjectName] = useState("");
    const [allSubject,setAllSubject] = useState([]);
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
            await axios.post('https://localhost:7267/api/Subject', {
                subjectName: subjectName
            });
            alert("Subject Registation Successfully");
            setSubjectName('');
        } catch (err) {
            alert(err);
        }
    };
    //get all subject Details
    useEffect(() => {
        const getAllSubject = async () => {
            const data = await fetch('https://localhost:7267/api/Subject');
            const getData = await data.json();
            setAllSubject(await getData);
            
        }
        getAllSubject();
    }, [])
    //Delete Teacher and Subject
    const Delete = async(subId)=>{
        //console.log(classId);
        try{
            await axios.post('https://localhost:7267/api/Subject/DeleteSubject',{
                id: subId,
            });
            alert("Subject Remove Successfully");
        }catch (err) {
            alert(err);
        }
    }
    return (
        <div className='container'>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3 d-flex align-items-center justify-content-center g-3 ">
                    <span className="border p-5 d-flex align-items-center justify-content-center flex-column">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <div className="d-flex align-items-center gap-3">
                                <Form.Label>Subject Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Subject Name"
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setSubjectName(e.target.value);
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
                                        allSubject?.map(item => {
                                            return (
                                                <>
                                                    <tr key={item.id} value={item.id}>
                                                        <td >{item.subjectName}</td>
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
