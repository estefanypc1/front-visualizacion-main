import React, { useState, useRef } from "react";
import LogoCNC from "../../images/logo-cnc.png";
import { Link } from "react-router-dom";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import useWindowDimensions from "../../styles/useWindowDimensions";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

import PowerBI from "../PowerBI";

const WORKSPACE_ID = "753663f8-143e-4a10-ae4a-060183535020";
const REPORT_ID = "e6617e2c-4c17-442c-ac70-7f95234119e0";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: 110,
    [theme.breakpoints.up("sm")]: {
      width: 135,
    },
  },
  logo2: {
    width: 78,
    [theme.breakpoints.up("sm")]: {
      width: 94,
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(1.3),
    },
  },
  logoSpacing: {
    marginRight: theme.spacing(1.5),
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(2),
    },
    display: "flex",
  },
  logoSpacing2: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(4),
    },
    display: "flex",
  },
  username: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "unset",
    },
  },
}));

export default function Visor2ClaroNSU(props) {
  const { theme, API_DEFAULT, setShowBackdrop, setAuth, clientUUID } = props;
  const [accessToken, setAccessToken] = props.accessToken;
  const [username, setUsername] = props.username;
  const classes = useStyles();
  const refPBI = useRef(null);
  const [pbiEmbed, setPbiEmbed] = useState({});

  const { width } = useWindowDimensions(refPBI, pbiEmbed);

  return (
    <React.Fragment>
      <AppBar position="static" style={{ background: "#DA291C" }}>
        <Toolbar>
          <div className={classes.logoSpacing2}>
            <a
              style={{ display: "contents" }}
              href={"https://www.centronacionaldeconsultoria.com/"}
            >
              <img src={LogoCNC} alt="logo-cnc" className={classes.logo} />
            </a>
            <a
              style={{ display: "contents" }}
              href={"https://www.claro.com.co/personas/"}
            >
              <img
                src="https://www.claro.com.co/portal/recursos_estaticos_claro/claro/css/vector/logo-claro-blanco.svg"
                alt="logo"
                className={classes.logo2}
              />
            </a>
          </div>
          <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 500 }}>
            Estudio de NSU - Ola 3
          </Typography>
          <React.Fragment>
            <Typography
              className={classes.username}
              style={{
                fontSize: 14,
                fontWeight: 500,
                marginRight: theme.spacing(2),
                fontStyle: "italic",
              }}
              variant="body1"
            >
              @{username.toLowerCase()}
            </Typography>
            <IconButton
              style={{ marginRight: theme.spacing(1) }}
              component={Link}
              edge="start"
              color="inherit"
              to={`/client/${clientUUID}/home`}
            >
              <HomeIcon />
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                localStorage.removeItem("token-claro-nsu");
                localStorage.removeItem("auth-claro-nsu");
                localStorage.removeItem("username-claro-nsu");
                setAccessToken("");
                setAuth(false);
                setUsername("");
              }}
            >
              <LogoutIcon />
            </IconButton>
          </React.Fragment>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: theme.spacing(2) }}>
        <Container maxWidth="xl">
          <PowerBI
            pbi={[pbiEmbed, setPbiEmbed]}
            refPBI={refPBI}
            width={width}
            theme={theme}
            accessToken={accessToken}
            API_DEFAULT={API_DEFAULT}
            WORKSPACE_ID={WORKSPACE_ID}
            REPORT_ID={REPORT_ID}
            setShowBackdrop={setShowBackdrop}
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
