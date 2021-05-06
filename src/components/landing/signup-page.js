import React, { useRef, useState } from "react";
import { navigate } from "gatsby";
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";
import Logo from "../../images/commandt-logo-sm.svg";
import axios from "axios";
import { Autocomplete } from "@material-ui/lab";
import cities from "../../cities";

const SignupPage = () => {
  const fullNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cityRef = useRef();

  // Again, using states cuz I don't really understand how Ref works well

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState({});
  const [value, setValue] = useState("");

  // register function fires when the user clicks submit
  const register = () => {
    axios({
      method: "POST",
      data: {
        name: fullName,
        username: username,
        email: email,
        password: password,
        city: city,
      },
      withCredentials: true,
      url: "http://localhost:4000/signup",
    }).then((res) => console.log(res));
  };
  const handleOnChangeCountry = (e) => {
    setCountry(e.target.value);
  };
  return (
    <Grid item xs={12} md={6} lg={6}>
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <div className="logotype-wrapper">
            <img src={Logo} width="50" height="32" alt="CommandT Logo"></img>{" "}
            <span className="landing-text-black">CommandT</span>
          </div>
          <h1 className="landing-text-black">Create an account</h1>
          <h5 className="landing-text-gray">
            Enter your information below to create a new account.
          </h5>
          <Card variant="outlined">
            <CardContent>
              <form id="signup-page-form">
                <TextField
                  id="sign-page-form-name"
                  fullWidth
                  label="Full name"
                  type="name"
                  inputRef={fullNameRef}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <TextField
                  id="sign-page-form-username"
                  fullWidth
                  label="Username"
                  type="text"
                  inputRef={usernameRef}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  id="sign-page-form-email"
                  fullWidth
                  label="Email"
                  type="email"
                  inputRef={emailRef}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  id="sign-page-form-password"
                  fullWidth
                  label="Password"
                  type="password"
                  inputRef={passwordRef}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <TextField
                  id="sign-page-form-city"
                  select
                  fullWidth
                  label="Country"
                  onChange={(e) => handleOnChangeCountry(e)}
                >
                  <MenuItem key="usa" value="usa">
                    United State
                  </MenuItem>
                  <MenuItem key="korea" value="korea">
                    South Korea
                  </MenuItem>
                </TextField>
                <Autocomplete
                  onChange={(e, newValue) => {
                    setCity(newValue);
                  }}
                  id="city-by-country"
                  options={cities[country]}
                  getOptionLabel={(option) => option.name}
                  disabled={cities[country] == null}
                  renderInput={(params) => (
                    <TextField {...params} label="Cities" variant="standard" />
                  )}
                ></Autocomplete>
              </form>

              <Button
                variant="contained"
                color="primary"
                disableElevation
                disableTouchRipple
                onClick={register}
              >
                Create an account
              </Button>
            </CardContent>
          </Card>

          <Button
            disableElevation
            disableTouchRipple
            onClick={() => {
              navigate("/");
            }}
            className="landing-text-gray"
          >
            &larr; Back
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignupPage;
