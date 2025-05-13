import React, { useState, useRef } from "react";
import LogoCNC from "../../images/logo-cnc.png";
import LogoSDM from "../../images/logo-sdm.png";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Container, Toolbar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useWindowDimensions from '../../styles/useWindowDimensions';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

import PowerBI from '../PowerBI';

const WORKSPACE_ID = 'eec7a10a-401d-484a-b17e-35eca227daa5';
const REPORT_ID = '56256b52-1430-4799-ba11-d138ac2e2073';

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

export default function Visor1SDM(props) {
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
            <AppBar position="static" style={{ background: "linear-gradient(to right, #752e77, #8d5497)" }}>
                    <Toolbar>
                        <div className={classes.logoSpacing}>
                            <a style={{ display: "contents" }} href={"https://www.centronacionaldeconsultoria.com/"}>
                                <img src={LogoCNC} alt="logo-cnc" className={classes.logo} />
                            </a>
                        </div>
                        <div className={classes.logoSpacing2}>
                            <a style={{ display: "contents" }} href={"https://www.sdmujer.gov.co/"}>
                                <img src={LogoSDM} alt="logo-sdm" className={classes.logo2} />
                            </a>
                        </div>
                        <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 500 }}>
                            Escuela de Educación Emocional
                        </Typography>
                        <React.Fragment>
                            <Typography className={classes.username} style={{ fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic" }} variant='body1'>@{username.toLowerCase()}</Typography>
                            <IconButton style={{ marginRight: theme.spacing(1) }} component={Link} edge='start' color='inherit' to={`/client/${clientUUID}/home`}>
                                <HomeIcon />
                            </IconButton>
                            <IconButton edge='start' color='inherit' onClick={() => { localStorage.removeItem('token-sdm'); localStorage.removeItem('auth-sdm'); localStorage.removeItem('username-sdm'); setAccessToken(''); setAuth(false); setUsername(''); }}>
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