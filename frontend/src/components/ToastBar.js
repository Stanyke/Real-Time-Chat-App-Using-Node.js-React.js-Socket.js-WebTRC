import React, {useContext} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
} from "@material-ui/core";
import { SocketContext } from "../statesManager";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  },
}));

export default function ToastBar() {
  const { showToast, setShowToast, toastData } = useContext(SocketContext);
  const classes = useStyles();
  const { type, message, duration } = toastData;
  const position = { vertical: "top", horizontal: "right" };

  const handleClose = () => {
    setShowToast(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar anchorOrigin={position} open={showToast} autoHideDuration={duration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}