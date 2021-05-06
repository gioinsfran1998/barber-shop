import React from "react";

import { useSelector } from "react-redux";

import {
  Typography,
  makeStyles,
  Box,
  Avatar,
  useTheme,
} from "@material-ui/core";

const Profile = () => {
  const user = useSelector((state) => state.user.user);

  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box p={theme.spacing(1)} justifyContent="center">
      <Box display="flex" justifyContent="center">
        <Avatar alt="Avatar" src={user.photoURL} className={classes.avatar} />
      </Box>
      <Box textAlign="center" mt={2}>
        <Typography
          variant="inherit"
          display="block"
          color="initial"
          align="center"
        >
          {user.displayName}
        </Typography>
        <Typography
          variant="inherit"
          display="block"
          color="initial"
          align="center"
        >
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  avatar: {
    width: "64px",
    height: "64px",
  },
}));

export default Profile;
