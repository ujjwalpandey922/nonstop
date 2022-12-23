import React, { useEffect, useState } from 'react'
import { Col,  Row } from 'react-bootstrap';
import {AiFillHome} from "react-icons/ai"
import { useNavigate, useParams } from 'react-router-dom';
import { useCandidateContext } from '../../context/candidateContext';
import { format } from 'date-fns';
import FormInfo from '../Form/Form';
import List from '../List/List'

const Candidate = () => {
    const params = useParams();
    const navTo = useNavigate();
    const [openForm, setOpenForm] = useState(false);
    const {candidateData,getCandidateData} = useCandidateContext();
    const requiredCandidate = candidateData.filter((e)=>e.id==params.id)
    const [selectedCandidate, setSelectedCandidate] = useState(requiredCandidate[0])
    useEffect(() => {
        setSelectedCandidate(requiredCandidate[0])
    }, [params])
    const handleHome =()=>{
        navTo('/home');
    }
const handleDelete = async()=>{
    const res = await fetch(`https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${params.id}`,{
        method:"DELETE"
    })
    const gotData= await res.json();
    console.log(gotData)
    getCandidateData();
     handleHome();
}   
const handleEdit=()=>{
    setOpenForm(!openForm)
} 
console.log(selectedCandidate.experience);
  return (
        
        <>
        <div className="buttons d-flex justify-content-between align-items-center mt-2 ms-4 me-4">
            <div className="homebutton ">
             <button  className="btn fs-4" onClick={handleHome}> <AiFillHome/></button>
            </div>
            <div className="edit ">
            <button className="btn btn-primary me-3" onClick={handleEdit}>{!openForm?"Edit":"Info"}</button>
            <button className="btn btn-danger"  onClick={handleDelete}>Delete</button>
            </div>
        </div>
        
    <div className='d-flex '>
        <div className="list">
        <List/>
        </div>
        { !openForm && 
        <div className="container p-2 m-5" style={{height:"max-content" ,backgroundColor:"red"}} >
                <Row className='d-flex'>
                    <Col> 
                            <img src={ selectedCandidate.profile_picture!==''?selectedCandidate.profile_picture:"https://cdn-icons-png.flaticon.com/512/0/93.png"} alt="img"
                            style={{width:"40%" }} className="rounded-circle"
                            />
                    </Col>
                    <Col>
                        <div className="stack d-flex flex-column">
                            <Row>
                                <Col><h5>NAME : </h5></Col>
                                <Col>{selectedCandidate.name || (selectedCandidate.Fname+` `+selectedCandidate.Lname  )}</Col>
                            </Row>
                            <Row>
                                <Col><h5>Email : </h5></Col>
                                <Col>{selectedCandidate.email}</Col>
                            </Row>
                            <Row>
                                <Col><h5>Gender : </h5></Col>
                                <Col>{selectedCandidate.gender}</Col>
                            </Row>
                            <Row>
                                <Col><h5>hobbies:</h5></Col>
                                {selectedCandidate.hobbies.map((e)=>(
                            <Col key={e}>{e} </Col>))}
                            </Row>
                         

                        </div>
                    </Col>
           
                </Row>
            <div className="education">
                <h1>---EDUCATION----</h1>
                {selectedCandidate.education.map((e,i)=>(
                <React.Fragment key={i}>
                    <Row>
                        <Col><h4>Degree :</h4></Col>
                        <Col>{e.degree}</Col>
                    </Row>
                    <Row>
                        <Col><h4>Institute :</h4></Col>
                        <Col>{e.institute}</Col>
                    </Row>
                    <Row>
                        <Col><h4>Percentage :</h4></Col>
                        <Col>{e.percentage}</Col>
                    </Row>
                    <Row>
                        <Col><h4>Passing Out Year:</h4></Col>
                        <Col>{e.pass_out_year}</Col>
                    </Row>
                </React.Fragment>
                ))}               
            </div>
            
            <div className="skills">
                <h1>---SKILLS----</h1>
                {selectedCandidate.skills.map((e,i)=>(
                <React.Fragment key={i}>
                    <Row>
                        <Col><h4>Skill :</h4></Col>
                        <Col>{e.name||e.skillName}</Col>
                    </Row>
                    <Row>
                        <Col><h4>Experience :</h4></Col>
                        <Col>{e.experience}</Col>
                    </Row>
                </React.Fragment>
                ))}               
            </div>
            <div className="experience">
                <h1>---EXPERIENCE----</h1>
                {selectedCandidate.experience.map((e,i)=>(
                <React.Fragment key={i}>
                    <Row>
                        <Col><h4>Company :</h4></Col>
                        <Col>{e.company}</Col>
                    </Row>
                    <Row>
                        <Col><h4>Role :</h4></Col>
                        <Col>{e.role}</Col>
                    </Row>
                    <Row>
                        <Col><h4>Duration From :</h4></Col>
                        <Col>{e.duration_start}</Col>
                    </Row>
                    <Row>
                        <Col><h4>Duration To :</h4></Col>
                        <Col>{e.duration_end}</Col>
                    </Row>
                </React.Fragment>
                ))}               
            </div>

        </div>
        }

        {
                openForm && 
                <div className="container">
                    <FormInfo selectedCandidate={selectedCandidate} setSelectedCandidate={setSelectedCandidate}/>
                </div>
        }
    </div>

    </>
  )
}

export default Candidate
