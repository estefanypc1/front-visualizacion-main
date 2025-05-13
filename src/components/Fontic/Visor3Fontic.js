import React, { useState, useRef } from "react";
import LogoFontic from "../../images/logo-mintic4.png";
import LogoPotencia from "../../images/logo-PMDV.png";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Container, Toolbar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useWindowDimensions from '../../styles/useWindowDimensions';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

import PowerBINoAuth from '../PowerBINoAuth';

const WORKSPACE_ID = 'd08049c0-a156-41c4-8566-5328163cd5cc';
const REPORT_ID = '0b2e8666-2d21-4f74-861c-2649dc4d32d3';

const useStyles = makeStyles((theme) => ({
    logo: {
        width: 130,
        [theme.breakpoints.up("sm")]: {
            width: 135
        }
    },
    logo2: {
        width: 100,
        [theme.breakpoints.up("sm")]: {
            width: 75
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
        marginRight: theme.spacing(1),
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

export default function Visor3Fontic(props) {
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
                main: "linear-gradient(to right, #E9A144)"
            }
        }
    });

    return (
        <React.Fragment>
            <ThemeProvider theme={actualTheme2}>
            <AppBar position="static" style={{ background: "linear-gradient(to right, #12487b, #0b67a6" }}>
                    <Toolbar>
                        <div className={classes.logoSpacing2} >
                            <a style={{ display: "contents" }} href={"https://www.mintic.gov.co/portal/inicio/"}>
                                <img src={LogoFontic} alt="logo-Fontic" className={classes.logo2} style={{width: "30%"}}/>
                            </a>
                        </div>
                        <div className={classes.logoSpacing} style={{ marginLeft: "-290px" }}>
                            <a style={{ display: "contents" }} href={"https://www.mintic.gov.co/portal/inicio/"}>
                                <img src={LogoPotencia} alt="logo-cnc" className={classes.logo} />
                            </a>
                        </div>
                        <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 500 }}>
                            Percepción de la gestión del MinTIC
                        </Typography>
                        <React.Fragment>
                            {/* <Typography className={classes.username} style={{ fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic" }} variant='body1'>@{username.toLowerCase()}</Typography> */}
                            <Typography className={classes.username} style={{ fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic" }} variant='body1'>@mintic</Typography>
                            <IconButton style={{ marginRight: theme.spacing(1) }} component={Link} edge='start' color='inherit' to={`/client/${clientUUID}/home`}>
                                <HomeIcon />
                            </IconButton>
                            {/* <IconButton edge='start' color='inherit' onClick={() => { localStorage.removeItem('token-Fontic'); localStorage.removeItem('auth-Fontic'); localStorage.removeItem('username-Fontic'); setAccessToken(''); setAuth(false); setUsername(''); }}>
                                <LogoutIcon />
                            </IconButton> */}
                        </React.Fragment>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <div style={{ marginTop: theme.spacing(2) }}>
                <Container maxWidth="xl">
                    <PowerBINoAuth pbi={[pbiEmbed, setPbiEmbed]} refPBI={refPBI} width={width} theme={theme} accessToken={accessToken} API_DEFAULT={API_DEFAULT} WORKSPACE_ID={WORKSPACE_ID} REPORT_ID={REPORT_ID} setShowBackdrop={setShowBackdrop} />
                </Container>
            </div>
        </React.Fragment>
    );
}