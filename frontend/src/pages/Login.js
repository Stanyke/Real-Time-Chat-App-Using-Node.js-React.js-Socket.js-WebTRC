import React, { useContext } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  makeStyles,
} from "@material-ui/core";

import { AuthStyle } from "../assets/css/AuthStyle";
import AuthSidebar from "../components/AuthSidebar";
import {SocketContext} from "../components/SocketContext";

const useStyles = makeStyles((theme) => AuthStyle(theme));

export default function Login() {
  const { user, setupUser } = useContext(SocketContext);
  const classes = useStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    setupUser({username})
    // await login({ username, password });
  };

  return (
    <Grid container className={classes.homeScreen}>
      <AuthSidebar styles={classes} />

      <Box className={classes.rightSideContainer}>
        <Grid className={classes.formBox}>
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
