import React from 'react';
import {
    Box,
    Typography,
    makeStyles,
  } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      position: 'absolute',
      background: '#b9b9b9',
      width: '100%',
      height: '30px',
      bottom: '0'
    },
});

export default function MessageField() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
        dkjbdk
    </Box>
  );
}
