import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import axios from "axios";
import Modal from "react-modal";
import SignInModal from "./signin_modal";
import firebase from "../containers/firebase";
import baseURL from "../utils/constant.js";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  input: (provided, _) => ({
    ...provided,
    fontSize: "16px",
  }),
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
    justifyContent: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "16px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    alignSelf: "center",
  },
  submit: {
    width: "40%",
    alignItems: "center",
    fontSize: 13,
    margin: theme.spacing(2, 0, 0),
  },
  resize: {
    fontSize: 16,
  },
}));

export default function SignUpModal({
  props,
  isLink,
  openModal,
  closeModal,
  isLoginOpened,
  isSignupOpened,
  isNavigation,
}) {
  Modal.setAppElement("body");
  const classes = useStyles();
  const [ErrorLabel, setErrorLabel] = useState(null);

  function afterOpenModal() {
    setErrorLabel(null);
    firebase.analytics().logEvent("signup_modal_open");
  }

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  async function onSubmit(e, setErrorLabel, props) {
    e.preventDefault();
    setErrorLabel(null);
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirm-password");
    let email = document.getElementById("email");
    if (username.value === "" || username.value === undefined) {
      setErrorLabel("Username is not provided");
      return;
    }

    var emailaddress = email.value.trim();
    if (emailaddress !== "") {
      if (!validateEmail(email.value)) {
        setErrorLabel("Verify Email Address");
        return;
      }
    } else {
      emailaddress = "null";
      setErrorLabel("Email Address is not provided");
      return;
    }
    if (password.value.length < 6) {
      setErrorLabel("Password must be at least 6 characters.");
      return;
    }
    if (password.value !== confirmPassword.value) {
      setErrorLabel("Confirm Password: password does not match");
      return;
    }
    axios({
      method: "post",
      url: `${baseURL}/signup/`,
      headers: {},
      data: {
        username: username.value,
        password: password.value,
        email: emailaddress.toLowerCase(),
      },
    }).then((res) => {
      const data = res.data;
      if (data.token !== undefined) {
        localStorage.setItem("username", username.value);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("token", data.token);
        closeModal("signup");
        window.location.reload();
      } else {
        setErrorLabel(data.message);
      }
    });
    firebase.analytics().logEvent("signup");
  }

  function ErrorBox({ ErrorLabel }) {
    return (
      <Card raised="true">
        <Typography variant="h6" color="error" align="center">
          {ErrorLabel}
        </Typography>
      </Card>
    );
  }

  return (
    <div>
      {!isNavigation ? (
        isLink ? (
          <Link href="#" variant="h6" onClick={openModal("signup")}>
            {"Don't have an account? Sign Up"}
          </Link>
        ) : (
          <button
            onClick={openModal("signup")}
            className="btn btn-custom btn-lg page-scroll"
          >
            Sign Up
          </button>
        )
      ) : null}
      <Modal
        isOpen={isSignupOpened}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal("signup")}
        style={customStyles}
        contentLabel="Example Modal"
        id="Modal"
      >
        <button className="ModalCloseButton" onClick={closeModal("login")}>
          X
        </button>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            component={Paper}
            elevation={0}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}></Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <form className={classes.form} noValidate>
                <Box mt={ErrorLabel ? 5 : 0}>
                  {ErrorLabel ? <ErrorBox ErrorLabel={ErrorLabel} /> : null}
                </Box>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  defaultValue=""
                  autoComplete="email"
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  autoComplete="current-password"
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                />
                <Grid container>
                  <Grid item>
                    <Grid>
                      <SignInModal
                        openModal={openModal}
                        closeModal={closeModal}
                        isLoginOpened={isLoginOpened}
                        isSignupOpened={isSignupOpened}
                        props={props}
                        isLink={true}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(e) => onSubmit(e, setErrorLabel, props)}
                >
                  Sign Up
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}
