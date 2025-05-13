import React, { useState, useRef } from "react";
import LogoJuntosAprendemos from "../../images/logo-juntosaprendemos.png";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Container, Toolbar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useWindowDimensions from '../../styles/useWindowDimensions';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

import PowerBI from '../PowerBI';

const WORKSPACE_ID = '24c0adaf-fbdc-419d-87a2-be37cb2ef137';
const REPORT_ID = 'e2221801-9788-4e63-9401-c5f459b57537';

const useStyles = makeStyles((theme) => ({
    logo: {
        width: 130,
        [theme.breakpoints.up("sm")]: {
            width: 135
        }
    },
    logo2: {
        width: 130,
        [theme.breakpoints.up("sm")]: {
            width: 130
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
        marginRight: theme.spacing(1.5),
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

export default function Visor2JuntosAprendemos(props) {
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
                main: "linear-gradient(to right, #752e77, #8d5497)"
            }
        }
    });

    return (
        <React.Fragment>
            <ThemeProvider theme={actualTheme2}>
            <AppBar position="static" style={{ background: "linear-gradient(to right, #275da8, #afd6e9)" }}>
                    <Toolbar>
                        <div className={classes.logoSpacing2}>
                            <a style={{ display: "contents" }} href={"https://juntosaprendemos.parqueexplora.org/"}>
                                <img src={LogoJuntosAprendemos} alt="logo-juntosaprendemos" className={classes.logo2} />
                            </a>
                        </div>
                        <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 500 }}>
                            Necesidades docentes
                        </Typography>
                        <React.Fragment>
                            <Typography className={classes.username} style={{ fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic" }} variant='body1'>@{username.toLowerCase()}</Typography>
                            <IconButton style={{ marginRight: theme.spacing(1) }} component={Link} edge='start' color='inherit' to={`/client/${clientUUID}/home`}>
                                <HomeIcon />
                            </IconButton>
                            <IconButton edge='start' color='inherit' onClick={() => { localStorage.removeItem('token-juntosaprendemos'); localStorage.removeItem('auth-juntosaprendemos'); localStorage.removeItem('username-juntosaprendemos'); setAccessToken(''); setAuth(false); setUsername(''); }}>
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