import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddSubjectToTeacher from './AddSubjectToTeacher/AddSubjectToTeacher'
import Classroom from './Classroom/Classroom'
import Navbar1 from './Navbar'
import Student from './Student/Student'
import AddTeacherToClass from './AddTeacherToClass/AddTeacherToClass'
import Subject from './Subject/Subject'
import Teacher from './Teacher/Teacher'

export default function Home() {
    return (
        <div>
            <Navbar1 />
            <BrowserRouter>
                <Routes>
                    <Route path='/student' element={<Student />}>
                    </Route>
                    <Route path='/teacher' element={<Teacher/>}>
                    </Route>
                    <Route path='/classroom' element={<Classroom />}>
                    </Route>
                    <Route path='/subject' element={<Subject />}>
                    </Route>
                    <Route path='/addsubjecttoteacher' element={<AddSubjectToTeacher />}>
                    </Route>
                    <Route path='/addTeacherToClass' element={<AddTeacherToClass/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
