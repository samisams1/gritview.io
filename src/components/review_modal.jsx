import React from "react";
import Modal from "react-modal";
import { Button, Form, FormGroup, Input } from "reactstrap";
import Select from "react-select";
import { StarRating } from "./ratingstar";
import axios from "axios";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import firebase from "../containers/firebase";
import baseURL from "../utils/constant.js";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "-50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  input: (provided, _) => ({
    ...provided,
    fontSize: "16px",
  }),
};

export default function ReviewModal({ props }) {
  Modal.setAppElement("body");

  var professor_values = [];
  var course_values = [];
  let grade_values = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "F", value: "F" },
    { label: "O", value: "O" },
    { label: "Rather not say", value: "Rather not say" },
    { label: "Not sure yet", value: "Not sure yet" },
  ];
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [_professor, setProfessor] = React.useState(null);
  const [_faculty_id, setFacultyId] = React.useState(null);
  const [_course, setCourse] = React.useState(null);
  const [_expectedGrade, setExpectedGrade] = React.useState(null);
  const [error, setError] = React.useState(null);

  const { instructor, subject, instructors } = props.resp;

  if (props.location.pathname === "/professor") {
    // Fetches Professor values
    professor_values = [
      {
        label: `${instructor.first_name} ${instructor.last_name}`,
        value: instructor.id,
      },
    ];
    // Fetches Course values
    for (let key in instructor.subjects) {
      const item = {
        label: `${instructor.subjects[key].name}${instructor.subjects[key].catalog_number
          }${instructor.subjects[key].catalog_topic === null
            ? ""
            : " - " + instructor.subjects[key].catalog_topic
          }`,
        value: instructor.subjects[key].id,
      };
      course_values.push(item);
    }
  }

  if (props.location.pathname === "/course") {
    // Fetches Course values
    course_values = [
      {
        label: `${subject.name}${subject.catalog_number}`,
        value: subject.id,
      },
    ];
    // Fetches Professor values
    for (let key in instructors) {
      const item = {
        label: `${instructors[key].first_name} ${instructors[key].last_name}`,
        value: instructors[key].id,
      };
      professor_values.push(item);
    }
  }

  function openModal() {
    setIsOpen(true);
    setRating(0);
  }

  function closeModal() {
    setIsOpen(false);
    firebase.analytics().logEvent("review_modal_close");
  }

  function afterOpenModal() {
    let user_id = localStorage.getItem("user_id");
    let username = localStorage.getItem("username");
    let token = localStorage.getItem("token");
    setRating(0);
    setError(null);
    if (username === null || user_id === null || token === null) {
      setError("Sign in or create an account to submit a review");
      return;
    }
    if (props.location.pathname === "/professor")
      setProfessor({
        label: `${instructor.first_name} ${instructor.last_name}`,
        value: instructor.id,
      });
      setFacultyId(instructor.faculty_id)
    if (props.location.pathname === "/course")
      setCourse({
        label: `${subject.name}${subject.catalog_number}`,
        value: subject.id,
      });
    firebase.analytics().logEvent("review_modal_open");
  }

  async function onSubmit() {
    setError(null);
    let review = document.getElementById("review-text").value;
    let user_id = localStorage.getItem("user_id");
    let username = localStorage.getItem("username");
    let token = localStorage.getItem("token");

    if (
      _professor === null ||
      _course === null ||
      _expectedGrade === null ||
      rating === 0 ||
      review.trim() === ""
    ) {
      setError("Please specify all required inputs");
      return;
    }

    if (username === null || user_id === null || token === null) {
      setError(
        "Cannot authenticate, sign in or create an account to submit your review"
      );
      return;
    }

    await axios({
      method: "post",
      url: `${baseURL}/review/`,
      headers: {},
      data: {
        user_id: user_id,
        username: username,
        token: token,
        subject_id: _course.value,
        instructor_id: _professor.value,
        faculty_id: _faculty_id,
        grade: _expectedGrade.value,
        rating: rating,
        body: review,
      },
    });
    Store.addNotification({
      title: "Hooray! You've submitted a review.",
      message: "Your post will be reviewed shortly.",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 9000,
        onScreen: true,
      },
    });
    setIsOpen(false);
    firebase.analytics().logEvent("review_submit");
  }

  return (
    <div>
      <button onClick={openModal} className="btn btn-custom btn-lg page-scroll">
        Write a Review
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        id="Modal"
      >
        <button className="ModalCloseButton" onClick={closeModal}>
          X
        </button>
        <h2>Review</h2>
        {error ? <p id="ModalError">{error}</p> : null}
        <Form>
          <FormGroup>
            <b>Professor</b>
            <Select
              id="ProfessorSelect"
              className="ModalSelect"
              options={professor_values}
              styles={customStyles}
              onChange={(e) => setProfessor(e)}
              isSearchable={false}
              defaultValue={
                props.location.pathname === "/professor"
                  ? [
                    {
                      label: `${instructor.first_name} ${instructor.last_name}`,
                      value: instructor.id,
                    },
                  ]
                  : null
              }
              isDisabled={
                props.location.pathname === "/professor" ? true : false
              }
            />
          </FormGroup>
          <FormGroup>
            <b>Course</b>
            <Select
              id="CourseSelect"
              className="ModalSelect"
              options={course_values}
              styles={customStyles}
              isSearchable={false}
              defaultValue={
                props.location.pathname === "/course"
                  ? [
                    {
                      label: `${subject.name}${subject.catalog_number}`,
                      value: subject.id,
                    },
                  ]
                  : null
              }
              isDisabled={props.location.pathname === "/course" ? true : false}
              onChange={(e) => setCourse(e)}
            />
          </FormGroup>
          <FormGroup>
            <b>Rating</b>
            <br />
            <StarRating
              size={28}
              rating={rating}
              isSearchable={false}
              onChangeRating={(rating) => {
                setRating(rating);
              }}
            />
          </FormGroup>
          <FormGroup>
            <b>Grade</b>
            <Select
              className="ModalSelect"
              options={grade_values}
              styles={customStyles}
              isOptionSelected={true}
              isSearchable={false}
              onChange={(e) => setExpectedGrade(e)}
            />
          </FormGroup>
          <FormGroup>
            <b>Review</b>
            <Input
              style={{ fontSize: 16, height: 120 }}
              id="review-text"
              type="textarea"
              name="translation"
              defaultValue=""
              placeholder="Write your review here..."
            />
          </FormGroup>
          <Button color="success" onClick={() => onSubmit()}>
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
