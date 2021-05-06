import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import PersonIcon from "@material-ui/icons/Person";
import { loginUser } from "../../redux/user";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { firebase, db } from "../../firebase";
import { Box, Divider } from "@material-ui/core";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.background.dark
        : theme.palette.primary.light,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerLogin: {
    height: "100px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: "40px",
    // borderRadius: "8px 8px 0px 0px",
    // color: theme.palette.background.dark,
    // backgroundColor:
    //   theme.palette.type === "dark"
    //     ? "#424242"
    //     : theme.palette.background.light,
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.background.paper
        : theme.palette.primary.main,
  },
  avatar: {
    color: "#fafafa",
    borderRadius: "50px",
    padding: "15px",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.background.paper
        : theme.palette.primary.main,
  },
  titleHeader: {
    color: "#FAFAFA",
    fontFamily: "Patua One, cursive",
    paddingLeft: "10px",
  },
  subTitle: {
    color:
      theme.palette.type === "dark"
        ? theme.palette.background.paper
        : theme.palette.primary.main,
  },
  logoGmail: {
    width: "30px",
    height: "30px",
  },
  buttonGmail: {
    color: "#fafafa",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.background.paper
        : theme.palette.primary.main,
    height: "50px",
    maxWidth: "300px",
  },
  container: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.background.light
        : theme.palette.background.dark,
    display: "flex",
    flexFlow: "column nowrap",
    padding: "0px",
    // boxShadow: "0px 0px 9px 1px rgba(109,109,109,1);",
    // borderRadius: "8px",
  },
  dividerHorizontal: {
    height: "55px",
    width: "5px",
    backgroundColor: "#FAFAFA",
  },
}));

export const getUsersRole = async (email) => {
  const data = await db.collection("usersRole").get();
  try {
    const arrayData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const autorizado = arrayData
      .map((doc) => doc)
      .filter(function (user) {
        return user.email === email;
      })[0];
    console.log("autorizado", autorizado, email);
    return autorizado;
  } catch (error) {
    console.log(error);
  }
};

const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // const message = "No existe usuario";
  const handleClickPopUp = (variant, message) => {
    console.log(variant, "variant");
    enqueueSnackbar(message, { variant });
  };

  const onLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        const { displayName, email, photoURL, uid } = result.user;
        const isAuthorized = await getUsersRole(email);

        if (isAuthorized) {
          if (
            isAuthorized.role === "administrador" &&
            isAuthorized.autorizacion
          ) {
            dispatch(loginUser({ displayName, email, photoURL, uid }));
          } else {
            console.log("usuario no autorizado.");
            handleClickPopUp("error", "Usuario no autorizado");
          }
        } else {
          console.log("user no exist, cadastrar pfv");
          handleClickPopUp("error", "No existe usuario");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Box className={classes.headerLogin}>
          <Divider
            className={classes.dividerHorizontal}
            orientation="vertical"
          />
          <Typography variant="h4" className={classes.titleHeader}>
            Bienvenidos
          </Typography>
        </Box>
        <Box py={8} px={7}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <Box className={classes.avatar}>
              <PersonIcon style={{ fontSize: 60 }} />
            </Box>

            <Box
              style={{
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                className={classes.subTitle}
              >
                Iniciar Sesion
              </Typography>
            </Box>
          </Box>
          <Box py={3} display="flex" justifyContent="center">
            <Button
              className={classes.buttonGmail}
              variant="contained"
              fullWidth
              startIcon={
                <img
                  className={classes.logoGmail}
                  alt="Login"
                  src="/images/logingoogle.png"
                />
              }
              onClick={() => onLogin()}
            >
              Continuar con Google
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default withRouter(Login);
