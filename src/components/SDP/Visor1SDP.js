import React, { useState, useRef } from "react";
import LogoCNC from "../../images/logo-cnc-2.png";
import LogoSDP from "../../images/logo-sdp.png";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Container, Toolbar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useWindowDimensions from '../../styles/useWindowDimensions';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

import PowerBI from '../PowerBI';

const WORKSPACE_ID = 'bc02e0b8-5eda-4068-8b38-2a63e3eccd4f';
const REPORT_ID = 'a38858fa-9d51-49be-a4eb-aeacbc5a7194';

const useStyles = makeStyles((theme) => ({
    logo: {
        width: 110,
        [theme.breakpoints.up("sm")]: {
            width: 135
        }
    },
    logo2: {
        width: 135,
        [theme.breakpoints.up("sm")]: {
            width: 170
        }
    },
    logoSpacing: {
        marginRight: theme.spacing(1.5),
        [theme.breakpoints.up("sm")]: {
            marginRight: theme.spacing(2)
        },
        display: "flex"
    },
    logoSpacing2: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            marginRight: theme.spacing(4)
        },
        display: "flex"
    },
    username: {
        display: 'none',
        [theme.breakpoints.up("md")]: {
            display: 'unset'
        }
    }
}));

export default function Visor1SDP(props) {
    const { theme, API_DEFAULT, setShowBackdrop, setAuth, clientUUID } = props;
    const [accessToken, setAccessToken] = props.accessToken;
    const [username, setUsername] = props.username;
    const classes = useStyles();
    const refPBI = useRef(null);
    const [pbiEmbed, setPbiEmbed] = useState({});

    const { width } = useWindowDimensions(refPBI, pbiEmbed);

    const actualTheme2 = createTheme(theme, {
        palette: {
            primary: {
                main: "#ffffff"
            }
        }
    });

    return (
        <React.Fragment>
            <ThemeProvider theme={actualTheme2}>
                <AppBar position="static" style={{ color: 'black' }}>
                    <Toolbar>
                        <div className={classes.logoSpacing}>
                            <a style={{ display: "contents" }} href={"https://www.centronacionaldeconsultoria.com/"}>
                                <img src={LogoCNC} alt="logo-cnc" className={classes.logo} />
                            </a>
                        </div>
                        <div className={classes.logoSpacing2}>
                            <a style={{ display: "contents" }} href={"https://www.sdp.gov.co/"}>
                                <img src={LogoSDP} alt="logo-sdp" className={classes.logo2} />
                            </a>
                        </div>
                        <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 500 }}>
                            Satisfacción de usuarios
                        </Typography>
                        <React.Fragment>
                            <Typography className={classes.username} style={{ fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic" }} variant='body1'>@{username.toLowerCase()}</Typography>
                            <IconButton style={{ marginRight: theme.spacing(1) }} component={Link} edge='start' color='inherit' to={`/client/${clientUUID}/home`}>
                                <HomeIcon />
                            </IconButton>
                            <IconButton edge='start' color='inherit' onClick={() => { localStorage.removeItem('token-sdp'); localStorage.removeItem('auth-sdp'); localStorage.removeItem('username-sdp'); setAccessToken(''); setAuth(false); setUsername(''); }}>
                                <LogoutIcon />
                            </IconButton>
                        </React.Fragment>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <div style={{ marginTop: theme.spacing(2) }}>
                <Container maxWidth="xl">
                    <PowerBI pbi={[pbiEmbed, setPbiEmbed]} refPBI={refPBI} width={width} theme={theme} accessToken={accessToken} API_DEFAULT={API_DEFAULT} WORKSPACE_ID={WORKSPACE_ID} REPORT_ID={REPORT_ID} setShowBackdrop={setShowBackdrop} />
                </Container>
            </div>
        </React.Fragment>
    );
}