import React, { useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import WaitForPageLoad from "../components/WaitForPageLoad";

import { AuthStyle } from "../assets/css/AuthStyle";
import AuthSidebar from "../components/AuthSidebar";
import { SocketContext } from "../statesManager";
import ToastBar from "../components/ToastBar";

const useStyles = makeStyles((theme) => AuthStyle(theme));

export default function Dashboard() {
    const { user, showToast, authToken, pageLoaded } = useContext(SocketContext);
    const classes = useStyles();
    
    useEffect(() => {
        if(!authToken){
            return <Redirect to={process.env.REACT_APP_BEFORE_LOGIN_REDIRECT_URL} />;
        }
    }, []);
    if(!authToken){
        return <Redirect to={process.env.REACT_APP_BEFORE_LOGIN_REDIRECT_URL} />;
    }

  return (
    <>
        {!pageLoaded && <WaitForPageLoad />}
    </>
  );
}
