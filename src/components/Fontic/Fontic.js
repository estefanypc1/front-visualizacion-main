import React, { useState, useEffect } from "react";
import LogoCNC from "../../images/logo-cnc-2.png";
import LogoFontic from "../../images/logo-mintic4.png";
import LogoPotencia from "../../images/logo-PMDV.png";
import LogoCCCE from "../../images/logo-ccce-3.png";
import LogoFaceIt from "../../images/logo-faceit.png";
import ImgVisor1Fontic from "../../images/visor1-fontic1.png";
import ImgVisor2Fontic from "../../images/visor2-fontic1.png";
import ImgVisor3Fontic from "../../images/visor3-fontic1.png";
import { Redirect, Route, Link, useHistory } from "react-router-dom";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import { AppBar, Button, Card, CardHeader, CardActions, CardContent, Container, Divider, Grid, Toolbar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LogoutIcon from '@mui/icons-material/Logout';

import "./Fontic.css"

import Sesion from "../Sesion";
import Visor1Fontic from "./Visor1Fontic";
import Visor2Fontic from "./Visor2Fontic";
import Visor3Fontic from "./Visor3Fontic";

const Visor1UUID = "89018871-3396-41f3-a606-5625bcb637f3"
const Visor2UUID = "f5dbccf3-09de-4c16-879a-aa5ebfbfc9b8"
const Visor3UUID = "34733dd9-83b1-49e7-be40-e106874f8ec5"

const buttonColor = (color) => createTheme({
    palette: {
        primary: {
            main: "#E9A144"
        }
    },
    typography: {
        fontFamily: 'Roboto'
    }
});

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

export default function Fontic(props) {
    const { theme, API_DEFAULT, setShowBackdrop, setMessage, setSeverity, setSnack, clientUUID } = props;
    const actualTheme = createTheme(theme, {
        palette: {
            primary: {
                main: "#E9A144"
            }
        }
    });
    const actualTheme2 = createTheme(theme, {
        palette: {
            primary: {
                main: "#E9A144"
            }
        }
    });

    const classes = useStyles();
    const history = useHistory();
    const [pathname, setPathname] = useState(window.location.pathname);
    const pathsVisores = [`/client/${clientUUID}/visual/${Visor1UUID}`, `/client/${clientUUID}/visual/${Visor2UUID}`, `/client/${clientUUID}/visual/${Visor3UUID}`]

    const [sessionErrors, setSessionErrors] = useState(Array(2).fill(false));

    const [auth, setAuth] = useState(localStorage.getItem('auth-Fontic'));
    const [accessToken, setAccessToken] = useState(localStorage.getItem('token-Fontic'));
    const [username, setUsername] = useState(localStorage.getItem('username-Fontic'));

    const validateSession = (username, password) => {
        let errorSesion = false;
        if (username === '') {
            errorSesion = true;
            sessionErrors[0] = true;
        }
        if (password === '') {
            errorSesion = true;
            sessionErrors[1] = true;
        }
        if (errorSesion) {
            setSessionErrors([...sessionErrors]);
            setMessage('Existen campos sin diligenciar o con algún error.');
            setSeverity('error');
            setTimeout(() => { setSnack(true) }, 0);
        }
        else {
            logIn(username, password);
        }
    }

    async function logIn(username, password) {
        setShowBackdrop(true);
        const res = await fetch(`${API_DEFAULT}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        })
        res
            .json()
            .then(d => {
                setShowBackdrop(false);
                if (d['token']) {
                    rol(d['token'], username);
                }
                else {
                    setMessage('Los datos de usuario y contraseña son incorrectos.');
                    setSeverity('error');
                    setTimeout(() => { setSnack(true) }, 0);
                }
            })
    }

    async function rol(token, usuario) {
        const res = await fetch(`${API_DEFAULT}/users/roles`, {
            headers: { 'Authorization': `Token ${token}` }
        })
        res
            .json()
            .then(d => {
                if (d['roles'].includes('Administrador') || d['roles'].includes('Visor Fontic')) {
                    localStorage.setItem('token-Fontic', token);
                    localStorage.setItem('auth-Fontic', true);
                    localStorage.setItem('username-Fontic', usuario);
                    setUsername(usuario);
                    setAccessToken(token);
                    setAuth(true);
                }
                else {
                    setMessage('El usuario no está habilitado para usar esta aplicación.');
                    setSeverity('warning');
                    setTimeout(() => { setSnack(true) }, 0);
                }
            })
    }

    const appBarCustom = (
        <ThemeProvider theme={actualTheme2}>
            <AppBar position="static" style={{ marginBottom: theme.spacing(2), background: "linear-gradient(to right, #E8A044, #f4c892)" }}>
                <Toolbar>
                    <div className={classes.logoSpacing2} >
                        <a style={{ display: "contents" }} href={"https://www.mintic.gov.co/portal/inicio/"}>
                            <img src={LogoFontic} alt="logo-Fontic" className={classes.logo2} style={{ width: "30%" }} />
                        </a>
                    </div>
                    <div className={classes.logoSpacing} style={{ marginLeft: "-290px" }}>
                        <a style={{ display: "contents" }} href={"https://www.mintic.gov.co/portal/inicio/"}>
                            <img src={LogoPotencia} alt="logo-cnc" className={classes.logo} />
                        </a>
                    </div>
                    <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 500 }}>
                        Observatorio eCommerce 2023
                    </Typography>
                    {auth ?
                        <React.Fragment>
                            <Typography className={classes.username} style={{ fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic" }} variant='body1'>@{username.toLowerCase()}</Typography>
                            <IconButton edge='start' color='inherit' onClick={() => { localStorage.removeItem('token-Fontic'); localStorage.removeItem('auth-Fontic'); localStorage.removeItem('username-Fontic'); setAccessToken(''); setAuth(false); setUsername(''); }}>
                                <LogoutIcon />
                            </IconButton>
                        </React.Fragment>
                        :
                        null
                    }
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );

    useEffect(() => {
        return history.listen((location) => {
            setPathname(location.pathname)
        })
    }, [history]);

    useEffect(() => {
        document.title = "Visualización CNC - Fontic"
    }, []);

    return (
        <ThemeProvider theme={actualTheme}>
            <Redirect
                to={{
                    pathname:
                        pathsVisores.includes(pathname) ?
                            pathname :
                            `/client/${clientUUID}/home`,
                    state: { from: props.location }
                }}
            />
            {/* <Redirect
                to={{
                    pathname: !auth ?
                        `/client/${clientUUID}/login`
                        :
                        pathsVisores.includes(pathname) ?
                            pathname :
                            `/client/${clientUUID}/home`,
                    state: { from: props.location }
                }}
            />
            <Route exact path={`/client/${clientUUID}/login`}>
                {!auth ?
                    <React.Fragment>
                        {appBarCustom}
                        <Container maxWidth="xs">
                            <Sesion theme={theme} errors={[sessionErrors, setSessionErrors]} validateSession={validateSession} />
                        </Container>
                        <div className="logo-container">
                            <div>
                                <a style={{ display: "contents" }} href={"https://www.centronacionaldeconsultoria.com/"}>
                                    <img src={LogoCNC} alt="logo-cnc" className={"logo-cnc"} />
                                </a>
                            </div>
                            <div>
                                <a style={{ display: "contents" }} href={"https://www.ccce.org.co/"}>
                                    <img src={LogoCCCE} alt="logo-cnc" className={"logo-ccce"} />
                                </a>
                            </div>
                            <div>
                                <a style={{ display: "contents" }} href={"https://www.faceit.org.co/"}>
                                    <img src={LogoFaceIt} alt="logo-cnc" className={"logo-faceit"} />
                                </a>
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    null
                }
            </Route> */}
            <Route exact path={`/client/${clientUUID}/home`}>
                {/* {auth ? */}
                    <React.Fragment>
                        {appBarCustom}
                        <Container maxWidth="lg">
                            <Grid container direction="row" alignItems="stretch" spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardHeader
                                            style={{ background: "linear-gradient(to right, #E8A044, #f4c892)", paddingTop: 12, paddingBottom: 12 }}
                                            title={
                                                <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Fontic</Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent style={{ padding: 8, display: "contents" }}>
                                            <img src={ImgVisor1Fontic} alt="visor1-Fontic" />
                                        </CardContent>
                                        <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                            <ThemeProvider theme={responsiveFontSizes(buttonColor('#E8A144'))}>
                                                <Button style={{ color: "white" }} component={Link} variant="contained" size="small" to={`visual/${Visor1UUID}`}>
                                                    Ir
                                                </Button>
                                            </ThemeProvider>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardHeader
                                            style={{ background: "linear-gradient(to right, #E8A044, #f4c892)", paddingTop: 12, paddingBottom: 12 }}
                                            title={
                                                <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Fontic</Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent style={{ padding: 8, display: "contents" }}>
                                            <img src={ImgVisor2Fontic} alt="visor2-Fontic" />
                                        </CardContent>
                                        <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                            <ThemeProvider theme={responsiveFontSizes(buttonColor('#E8A044'))}>
                                                <Button style={{ color: "white" }} component={Link} variant="contained" size="small" to={`visual/${Visor2UUID}`}>
                                                    Ir
                                                </Button>
                                            </ThemeProvider>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardHeader
                                            style={{ background: "linear-gradient(to right, #12487b, #0b67a6)", paddingTop: 12, paddingBottom: 12 }}
                                            title={
                                                <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Percepción de la gestión del MinTIC</Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent style={{ padding: 8, display: "contents" }}>
                                            <img src={ImgVisor3Fontic} alt="visor3-Fontic" />
                                        </CardContent>
                                        <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                            <ThemeProvider theme={responsiveFontSizes(buttonColor('#0b67a6'))}>
                                                <Button style={{ color: "white" }} component={Link} variant="contained" size="small" to={`visual/${Visor3UUID}`}>
                                                    Ir
                                                </Button>
                                            </ThemeProvider>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Container>
                        <div className="logo-container">
                            <div>
                                <a style={{ display: "contents" }} href={"https://www.centronacionaldeconsultoria.com/"}>
                                    <img src={LogoCNC} alt="logo-cnc" className={"logo-cnc"} />
                                </a>
                            </div>
                            <div>
                                <a style={{ display: "contents" }} href={"https://www.ccce.org.co/"}>
                                    <img src={LogoCCCE} alt="logo-cnc" className={"logo-ccce"} />
                                </a>
                            </div>
                            <div>
                                <a style={{ display: "contents" }} href={"https://www.faceit.org.co/"}>
                                    <img src={LogoFaceIt} alt="logo-cnc" className={"logo-faceit"} />
                                </a>
                            </div>
                        </div>
                    </React.Fragment>
                    {/* :
                    <Redirect to={`/client/${clientUUID}/login`} />
                } */}
            </Route>
            <Route exact path={pathsVisores[0]}>
                {/* {auth ? */}
                    <Visor1Fontic
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        accessToken={[accessToken, setAccessToken]}
                        setShowBackdrop={setShowBackdrop}
                        username={[username, setUsername]}
                        setAuth={setAuth}
                        clientUUID={clientUUID}
                    />
                    {/* :
                    <Redirect to={`/client/${clientUUID}/login`} />
                } */}
            </Route>
            <Route exact path={pathsVisores[1]}>
                {/* {auth ? */}
                    <Visor2Fontic
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        accessToken={[accessToken, setAccessToken]}
                        setShowBackdrop={setShowBackdrop}
                        username={[username, setUsername]}
                        setAuth={setAuth}
                        clientUUID={clientUUID}
                    />
                    {/* :
                    <Redirect to={`/client/${clientUUID}/login`} />
                } */}
            </Route>
            <Route exact path={pathsVisores[2]}>
                {/* {auth ? */}
                    <Visor3Fontic
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        accessToken={[accessToken, setAccessToken]}
                        setShowBackdrop={setShowBackdrop}
                        username={[username, setUsername]}
                        setAuth={setAuth}
                        clientUUID={clientUUID}
                    />
                    {/* :
                    <Redirect to={`/client/${clientUUID}/login`} />
                } */}
            </Route>
        </ThemeProvider>
    );
}