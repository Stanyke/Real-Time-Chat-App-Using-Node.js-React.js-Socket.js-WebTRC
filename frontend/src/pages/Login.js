import React, { useContext, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { AuthStyle } from "../assets/css/AuthStyle";
import AuthSidebar from "../components/AuthSidebar";
import useApp from "../store/contexts/AppContext";
import ToastBar from "../components/ToastBar";

const useStyles = makeStyles((theme) => AuthStyle(theme));
const { REACT_APP_AFTER_LOGIN_REDIRECT_URL } = process.env;

export default function Login() {
  const {
    appState: { showToast, authToken, hasInternetConnection },
    setupUser
  } = useApp();
  const classes = useStyles();
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    setupUser({ username, password });
  };

  useEffect(() => {
    if (authToken) {
      return history.push(REACT_APP_AFTER_LOGIN_REDIRECT_URL);
    }
  }, [authToken]);

  return (
    <Grid container className={classes.homeScreen}>
      <AuthSidebar styles={classes} />

      <Box className={classes.rightSideContainer}>
        <Grid className={classes.formBox}>
          <ToastBar />
          <Box>
            <Typography className={classes.formNotice}>Hello!</Typography>
          </Box>

          <Box>
            <form
              onSubmit={handleLogin}
              className={classes.root}
              noValidate
              autoComplete="off"
            >
              <Box className={classes.inputForm}>
                <FormControl margin="normal" className={classes.inputForm}>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                  />
                </FormControl>
                <FormControl margin="normal" className={classes.inputForm}>
                  <TextField
                    label="password"
                    aria-label="password"
                    type="password"
                    name="password"
                    required
                  />
                </FormControl>
                <Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    className={classes.authBtn}
                  >
                    Login
                  </Button>
                </Grid>
              </Box>
            </form>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}
