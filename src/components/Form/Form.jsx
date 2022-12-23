import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useCandidateContext } from "../../context/candidateContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormInfo = ({ setToggle, selectedCandidate }) => {
  const { getCandidateData } = useCandidateContext();
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    phone: "",
    email: "",
    profile_picture: "",
    gender: "",
    hobbies: [],
  });
  const [educationInfo, setEducationInfo] = useState([
    {
      degree: "",
      institute: "",
      pass_out_year: "",
      percentage: "",
    },
  ]);
  const [experienceInfo, setExperienceInfo] = useState([
    {
      company: "",
      role: "",
      duration_start: "",
      duration_end: "",
    },
  ]);

  const [skillsInfo, setSkillsInfo] = useState([
    {
      skillName: "",
      experience: "",
    },
  ]);
  useEffect(() => {
    if (selectedCandidate) {
      let {
        education,
        experience,
        skills,
        name,
        phone,
        email,
        hobbies,
        profile_picture,
        gender,
      } = selectedCandidate;
      setEducationInfo([...education]);
      setExperienceInfo([...experience]);
      setSkillsInfo([...skills]);
      setPersonalInfo({ name, phone, email, hobbies, profile_picture, gender });
      console.log("====================================");
      console.log(selectedCandidate.gender);
      console.log("====================================");
    }
  }, [selectedCandidate]);

  //Image setting----------------------------
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
    setPersonalInfo({ ...personalInfo, profile_picture: image });
  };

  // ------------------Remove Education---------------------------------
  const handleRemove = (index) => {
    const data = educationInfo.filter((_, i) => i !== index);
    setEducationInfo(data);
  };
  const handleRemoveSkill = (index) => {
    const data = skillsInfo.filter((_, i) => i !== index);
    setSkillsInfo(data);
  };
  const handleRemoveExperience = (index) => {
    const data = experienceInfo.filter((_, i) => i !== index);
    setExperienceInfo(data);
  };
  // ------------------FormChangeEducation---------------------------------
  const handleChangeInfo = (e) => {
    let data = { ...personalInfo };
    data[e.target.name] = e.target.value;
    setPersonalInfo(data);
  };
  const handleFormChange = (e, index) => {
    let data = [...educationInfo];
    data[index][e.target.name] = e.target.value;
    setEducationInfo(data);
  };
  const handleFormChangeSkills = (e, index) => {
    let data = [...skillsInfo];
    data[index][e.target.name] = e.target.value;
    setSkillsInfo(data);
  };
  const handleFormChangeExperience = (e, index) => {
    let data = [...experienceInfo];
    data[index][e.target.name] = e.target.value;
    setExperienceInfo(data);
  };
  // ------------------Add ---------------------------------

  // Education
  const addEducation = (e) => {
    e.preventDefault();
    const letNewFields = {
      degree: "",
      institution: "",
      passOutYear: "",
      grade: "",
    };
    setEducationInfo([...educationInfo, letNewFields]);
  };
  // Skills

  const addSkills = () => {
    const letNewFields = { skillName: "", experience: "" };
    setSkillsInfo([...skillsInfo, letNewFields]);
  };

  // -Experience

  const addExperience = () => {
    const letNewFields = {
      company: "",
      role: "",
      duration_end: "",
      duration_start: "",
    };
    setExperienceInfo([...experienceInfo, letNewFields]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      ...personalInfo,
      education: educationInfo,
      experience: experienceInfo,
      skills: skillsInfo,
    };

    if (!selectedCandidate) {
      const res = await fetch(
        "https://60d5a2c2943aa60017768b01.mockapi.io/candidate",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const realData = await res.json();
      getCandidateData();
      setToggle(false);
      window.scrollTo(0, 0);
      toast.success("Candidate Added");
    } else {
      const res = await fetch(
        `https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${selectedCandidate.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedCandidate),
        }
      );
      const realData = await res.json();
      console.log(realData, selectedCandidate);
      getCandidateData();
      window.scrollTo(0, 0);
      toast.success("Candidate Updated");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="h-100 bg-dark m-5 ">
        <div className="container py-1 h-100 w-fit">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="col">
                    <div className="card-body p-md-5 text-black w-100">
                      <h3 className="mb-5 text-uppercase text-center">
                        Candidate Registration Form
                      </h3>
                      <h5 className="mb-5 text-uppercase ">
                        <b>1.Personal Info</b>
                      </h5>
                      <div className="row">
                        <div className="col">
                          <div className="input-group mb-3">
                            <input
                              type="file"
                              className="form-control"
                              id="inputGroupFile03"
                              aria-describedby="inputGroupFileAddon03"
                              aria-label="Upload"
                              onChange={onImageChange}
                              placeholder="Profile Pic"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Name */}
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example1m"
                              className="form-control form-control-lg"
                              name="name"
                              value={personalInfo.name}
                              onChange={(e) => handleChangeInfo(e)}
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1m"
                            >
                              Full Name
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example1n"
                              className="form-control form-control-lg"
                              name="phone"
                              value={personalInfo.phone}
                              onChange={(e) => handleChangeInfo(e)}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1n"
                            >
                              Phone Number
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example97"
                          className="form-control form-control-lg"
                          name="email"
                          value={personalInfo.email}
                          onChange={(e) => handleChangeInfo(e)}
                          required
                        />
                        <label className="form-label" htmlFor="form3Example97">
                          Email ID
                        </label>
                      </div>

                      {/* Gender */}
                      <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                        <h6 className="mb-0 me-4">Gender: </h6>

                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="femaleGender"
                            onClick={(e) => {
                              setPersonalInfo({
                                ...personalInfo,
                                gender: e.target.value,
                              });
                            }}
                            value="Female"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="femaleGender"
                          >
                            Female
                          </label>
                        </div>

                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="maleGender"
                            value="Male"
                            onClick={(e) => {
                              setPersonalInfo({
                                ...personalInfo,
                                gender: e.target.value,
                              });
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="maleGender"
                          >
                            Male
                          </label>
                        </div>
                        <div className="form-check form-check-inline mb-0">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="otherGender"
                            onClick={(e) => {
                              setPersonalInfo({
                                ...personalInfo,
                                gender: e.target.value,
                              });
                            }}
                            value="Other"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="otherGender"
                          >
                            Other
                          </label>
                        </div>
                      </div>

                      {/* Hobbie */}
                      <div className="row">
                        <div className="col-md-8  d-flex justify-content-center align-items-center">
                          <h6 className="pe-2 flex-shrink-1">Hobbies:</h6>
                          <Form.Group
                            className="mb-3 d-flex p-2 flex-wrap justify-content-around w-100 "
                            style={{ width: "75%" }}
                            controlId="formBasicCheckbox"
                            //handle Check Box.................
                            onClick={(e) => {
                              if (e.target.checked) {
                                personalInfo.hobbies.push(e.target.value);
                              } else {
                                personalInfo.hobbies =
                                  personalInfo.hobbies.filter(
                                    (ele) => ele != e.target.value
                                  );
                              }
                            }}
                          >
                            <Form.Check
                              type="checkbox"
                              label="Reading"
                              value="Reading"
                            />
                            <Form.Check
                              type="checkbox"
                              label="Trekking"
                              value="Trekking"
                            />
                            <Form.Check
                              type="checkbox"
                              label="Music"
                              value="Music"
                            />
                            <Form.Check
                              type="checkbox"
                              label="Sports"
                              value="Sports"
                            />
                            <Form.Check
                              type="checkbox"
                              label="Movies"
                              value="Movies"
                            />
                            <Form.Check
                              type="checkbox"
                              label="Others"
                              value="Others"
                            />
                          </Form.Group>
                        </div>
                      </div>
                      {/*=========================== Educational Info=============================== */}
                      <h5 className="mb-4 text-uppercase d-flex justify-content-between align-items-center">
                        <b>2. Educational Info</b>{" "}
                      </h5>
                      {educationInfo.map((educationInput, index) => {
                        return (
                          <div
                            className="row EducationInfo d-flex flex-wrap "
                            key={index}
                          >
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <input
                                  onChange={(e) => handleFormChange(e, index)}
                                  name="degree"
                                  type="text"
                                  id="form3Example1m"
                                  className="form-control form-control-lg"
                                  value={educationInput.degree}
                                  required
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1m"
                                >
                                  Degree
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <input
                                  onChange={(e) => handleFormChange(e, index)}
                                  name="institute"
                                  type="text"
                                  id="form3Example1n"
                                  className="form-control form-control-lg"
                                  value={educationInput.institute}
                                  required
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1n"
                                >
                                  Institute
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <input
                                  onChange={(e) => handleFormChange(e, index)}
                                  name="percentage"
                                  type="text"
                                  id="form3Example1m"
                                  className="form-control form-control-lg"
                                  value={educationInput.percentage}
                                  required
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1m"
                                >
                                  Grade
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <input
                                  onChange={(e) => handleFormChange(e, index)}
                                  name="pass_out_year"
                                  type="number"
                                  id="form3Example1n"
                                  className="form-control form-control-lg"
                                  min="1900"
                                  max="2099"
                                  step="1"
                                  value={educationInput.pass_out_year}
                                  required
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1n"
                                >
                                  Passing Out Year
                                </label>
                              </div>
                            </div>
                            <div className="col-md-4 mb-4 ">
                              <div className="remove mb-2">
                                {educationInfo.length > 1 && (
                                  <button
                                    className="btn btn-danger"
                                    onClick={(e) => handleRemove(index, e)}
                                  >
                                    Remove Info
                                  </button>
                                )}
                              </div>
                              {educationInfo.length - 1 === index &&
                                educationInfo.length < 10 && (
                                  <button
                                    className="btn btn-primary"
                                    onClick={(e) => addEducation(e)}
                                  >
                                    Add +
                                  </button>
                                )}
                            </div>
                          </div>
                        );
                      })}

                      {/* Skills */}
                      <h5 className="mb-5 text-uppercase d-flex justify-content-between align-items-center">
                        <b>3. Skills Info</b>{" "}
                      </h5>

                      {skillsInfo.map((element, index) => (
                        <div className="row skillInfo" key={index}>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="form3Example1m"
                                className="form-control form-control-lg"
                                name="skillName"
                                value={element.skillName}
                                onChange={(e) =>
                                  handleFormChangeSkills(e, index)
                                }
                                required
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example1m"
                              >
                                Skill
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="form3Example1n"
                                className="form-control form-control-lg"
                                value={element.experience}
                                name="experience"
                                onChange={(e) =>
                                  handleFormChangeSkills(e, index)
                                }
                                required
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example1n"
                              >
                                Experience
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 mb-4 ">
                            <div className="remove mb-2">
                              {skillsInfo.length > 1 && (
                                <button
                                  className="btn btn-danger"
                                  onClick={(e) => handleRemoveSkill(index, e)}
                                >
                                  Remove Info
                                </button>
                              )}
                            </div>
                            {skillsInfo.length - 1 === index &&
                              skillsInfo.length < 10 && (
                                <button
                                  className="btn btn-primary"
                                  onClick={addSkills}
                                >
                                  Add +
                                </button>
                              )}
                          </div>
                        </div>
                      ))}

                      {/* Experience */}
                      <h5 className="mb-5 text-uppercase d-flex justify-content-between align-items-center">
                        <b>4. Experience Info</b>{" "}
                      </h5>

                      {experienceInfo.map((element, index) => {
                        return (
                          <div
                            className="row EducationInfo d-flex flex-wrap "
                            key={index}
                          >
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <input
                                  onChange={(e) =>
                                    handleFormChangeExperience(e, index)
                                  }
                                  name="company"
                                  type="text"
                                  id="form3Example1m"
                                  className="form-control form-control-lg"
                                  value={element.company}
                                  required
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1m"
                                >
                                  Company
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <input
                                  onChange={(e) =>
                                    handleFormChangeExperience(e, index)
                                  }
                                  name="role"
                                  type="text"
                                  id="form3Example1n"
                                  className="form-control form-control-lg"
                                  value={element.role}
                                  required
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1n"
                                >
                                  Role
                                </label>
                              </div>
                            </div>

                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <input
                                  onChange={(e) =>
                                    handleFormChangeExperience(e, index)
                                  }
                                  name="duration_start"
                                  type="month"
                                  id="form3Example1n"
                                  className="form-control form-control-lg"
                                  max="2022-12"
                                  value={element.duration_start}
                                  required
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1n"
                                >
                                  Duration Start
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <input
                                  onChange={(e) =>
                                    handleFormChangeExperience(e, index)
                                  }
                                  name="duration_end"
                                  type="month"
                                  id="form3Example1n"
                                  className="form-control form-control-lg"
                                  max="2022-12"
                                  value={element.duration_end}
                                  required
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Example1n"
                                >
                                  Duration End
                                </label>
                              </div>
                            </div>
                            <div className="col-md-4 mb-4 ">
                              <div className="remove mb-2">
                                {experienceInfo.length > 1 && (
                                  <button
                                    className="btn btn-danger"
                                    onClick={(e) =>
                                      handleRemoveExperience(index, e)
                                    }
                                  >
                                    Remove Info
                                  </button>
                                )}
                              </div>
                              {experienceInfo.length - 1 === index &&
                                experienceInfo.length < 10 && (
                                  <button
                                    className="btn btn-primary"
                                    onClick={addExperience}
                                  >
                                    Add +
                                  </button>
                                )}
                            </div>
                          </div>
                        );
                      })}

                      <div className="d-flex justify-content-end pt-3">
                        <button
                          type="submit"
                          className="btn btn-warning btn-lg ms-2"
                        >
                          {!selectedCandidate ? "Submit form" : "Update Info"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Form>
  );
};

export default FormInfo;
