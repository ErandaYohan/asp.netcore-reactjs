import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row,} from 'react-bootstrap'

export default function AddSubjectToTeacher(props) {
    const [validated, setValidated] = useState(false);
    const [searchSubject, setSearchSubject] = useState([]);
    const [teacherSubject, setTeacherSubject] = useState([]);
    const [searchTeacher, setSearchTeacher] = useState([{ 'teacherId': '' }]);
    const [companyName, setCompanyName] = useState("")
    const [teacher, setTeacher] = useState("")
    const [subject, setSubject] = useState("")
    const [teacherId, setTeacherId] = useState("")
    //console.log(teacherSubject)
    //Fetch All Teachers and Subject from backend
    useEffect(() => {
        fetch('https://localhost:7267/api/Subject')
            .then((res) => res.json())
            .then((result) => {
                setSearchSubject(result);
            });
        fetch('https://localhost:7267/api/Teacher')
            .then((res) => res.json())
            .then((result) => {
                setSearchTeacher(result);
            });
    }, [])
    //Handle Fetch Teacher ID and Add to View
    const handleTeacher = (event) => {
        const getTeacherId = event.target.value;
        //console.log(getTeacherId);
        setTeacherId(getTeacherId);
    }
    //Fetch Teacher Id from backend and Id get Teacher Dropbox
    useEffect(() => {
        const getTeacherSubject = async () => {
            const res = await fetch('https://localhost:7267/api/Teacher/'+teacherId);
            const getst = await res.json();
            setTeacherSubject(await getst);
        }
        getTeacherSubject();
    }, [teacherId])
    //Validation Part and get all values and Post
    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        setCompanyName(e.target.value);
        e.preventDefault();
        try {
            await axios.post('https://localhost:7267/api/Teacher/TeacherAndSubject', {
                subjectsId: subject,
                teachersId: teacher
            });
            alert("Student Registation Successfully");
        } catch (err) {
            alert(err);
        }      
    };
    //Delete Teacher and Subject
    const Delete = async(subjectId)=>{
        //console.log(subjectId);
        try{
            await axios.post('https://localhost:7267/api/Teacher/TeacherAndSubjectDelete',{
                subjectsId: subjectId,
                teachersId: teacherId
            });
            alert("Student Registation Successfully");
        }catch (err) {
            alert(err);
        }
    }
    return (
        <div className='container '>
            <Form noValidate validated={validated} value={companyName} onSubmit={handleSubmit} class="col-xs-1 center-block">
                <Row className="mb-3 d-flex align-items-center justify-content-center g-3 ">
                    <span class="border p-5 d-flex align-items-center justify-content-center">
                        <Form.Group as={Col} md="6" controlId="validationCustom01" >
                            <div className="d-flex align-items-center  gap-3 ">
                                <Form.Label>Teacher</Form.Label>
                                <select className='form-control' onChange={(e) => {
                                    handleTeacher(e); setTeacher(e.target.value);
                                }}>
                                    <option value="" >Choose Teacher name</option>
                                    {
                                        searchTeacher.map(teacher => (
                                            <option key={teacher.id} value={teacher.id}>{teacher.firstName}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </span>
                    <span className="border p-5 d-flex align-items-center justify-content-center flex-column">
                        <Form.Group as={Col} md="6" controlId="validationCustom01" >
                            <div className="d-flex align-items-center  gap-3 ">
                                <Form.Label>Subject</Form.Label>
                                <select className='form-control' onChange={(e) => {
                                    setSubject(e.target.value);
                                }}>
                                    <option value="">Choose Subject name</option>
                                    {
                                        searchSubject.map(subject => (
                                            <option key={subject.id} value={subject.id}>{subject.subjectName}</option>
                                        ))
                                    }
                                </select>
                                <Button type="submit" class="p-2 bg-info">Allocate</Button>
                            </div>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <div className="pt-5 w-50">
                            <table class="table table-bordered">
                                <thead>
                                    <tr >
                                        <th className="col-md-4">Subject</th>
                                        <th className="col-md-1">Action</th>
                                    </tr>
                                </thead>
                               <tbody>
                                    {
                                        teacherSubject?.map(item => {
                                            return (
                                                <>
                                                    {item.subjects?.map(data => {
                                                        return (
                                                            <tr key={data.id} value={data.id}>
                                                                <td >{data.subjectName}</td>
                                                                <td><Button className="p-2 bg-info" onClick={()=>Delete(data.id)}>deallocate</Button></td>
                                                            </tr>
                                                        )
                                                    })}
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
