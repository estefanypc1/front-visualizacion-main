import React, { useState, useEffect } from "react";
import LogoCNC from "../../images/logo-cnc-2.png";
import LogoEcopetrol from "../../images/logo-ecopetrol.png";
import ImgVisor1Ecopetrol from "../../images/visor1-ecopetrol.png";
import ImgVisor2Ecopetrol from "../../images/visor2-ecopetrol.PNG";
import ImgVisor3Ecopetrol from "../../images/visor3-ecopetrol.png";
import { Redirect, Route, Link, useHistory } from "react-router-dom";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import { AppBar, Button, Card, CardHeader, CardActions, CardContent, Container, Divider, Grid, Toolbar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LogoutIcon from '@mui/icons-material/Logout';

import Sesion from "../Sesion";
import Visor1Ecopetrol from "./Visor1Ecopetrol";
import Visor2Ecopetrol from "./Visor2Ecopetrol";
import Visor3Ecopetrol from "./Visor3Ecopetrol";

const Visor1UUID = "0d20c6aa-1a1d-4f90-a529-bb5b5090241d"
const Visor2UUID = "35c16018-9053-42b1-bd9c-e2798600a7a1"
const Visor3UUID = "ff14238b-c598-43dc-91db-315fa10db23d"

const buttonColor = (color) => createTheme({
    palette: {
        primary: {
            main: color
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

export default function Ecopetrol(props) {
    const { theme, API_DEFAULT, setShowBackdrop, setMessage, setSeverity, setSnack, clientUUID } = props;
    const actualTheme = createTheme(theme, {
        palette: {
            primary: {
                main: "#149A2F",
            }
        }
    });
    const actualTheme2 = createTheme(theme, {
        palette: {
            primary: {
                main: "#149A2F"
            }
        }
    });

    const classes = useStyles();
    const history = useHistory();
    const [pathname, setPathname] = useState(window.location.pathname);
    const pathsVisores = [`/client/${clientUUID}/visual/${Visor1UUID}`,`/client/${clientUUID}/visual/${Visor2UUID}` ,`/client/${clientUUID}/visual/${Visor3UUID}`]

    const [sessionErrors, setSessionErrors] = useState(Array(2).fill(false));

    const [auth, setAuth] = useState(localStorage.getItem('auth-Ecopetrol'));
    const [accessToken, setAccessToken] = useState(localStorage.getItem('token-Ecopetrol'));
    const [username, setUsername] = useState(localStorage.getItem('username-Ecopetrol'));

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
                if (d['roles'].includes('Administrador') || d['roles'].includes('Visor Ecopetrol')) {
                    localStorage.setItem('token-Ecopetrol', token);
                    localStorage.setItem('auth-Ecopetrol', true);
                    localStorage.setItem('username-Ecopetrol', usuario);
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
            <AppBar position="static" style={{ marginBottom: theme.spacing(2), background: "linear-gradient(to right, #149A2F, #73AF25)" }}>
                <Toolbar>
                    <div className={classes.logoSpacing}>
                        <a style={{ display: "contents" }} href={"https://www.centronacionaldeconsultoria.com/"}>
                            <img src={LogoCNC} alt="logo-cnc" className={classes.logo} />
                        </a>
                    </div>
                    <div className={classes.logoSpacing2}>
                        <a style={{ display: "contents" }} href={"https://www.ecopetrol.com.co/wps/portal/"}>
                            <img src={LogoEcopetrol} alt="logo-ecopetrol" className={classes.logo2} />
                        </a>
                    </div>
                    <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 500 }}>
                        Ecopetrol  
                    </Typography>
                    {auth ?
                        <React.Fragment>
                            <Typography className={classes.username} style={{ fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic" }} variant='body1'>@{username.toLowerCase()}</Typography>
                            <IconButton edge='start' color='inherit' onClick={() => { localStorage.removeItem('token-Ecopetrol'); localStorage.removeItem('auth-Ecopetrol'); localStorage.removeItem('username-Ecopetrol'); setAccessToken(''); setAuth(false); setUsername(''); }}>
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
        document.title = ""
    }, []);

    return (
        <ThemeProvider theme={actualTheme}>
            <Redirect
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
                    </React.Fragment>
                    :
                    null
                }
            </Route>
            <Route exact path={`/client/${clientUUID}/home`}>
                {auth ?
                    <React.Fragment>
                        {appBarCustom}
                        <Container maxWidth="lg">
                            <Grid container direction="row" alignItems="stretch" spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardHeader
                                            style={{ background: "#149A2F", paddingTop: 12, paddingBottom: 12 }}
                                            title={
                                                <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Producto 12: Herramienta para análisis de prospectiva</Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent style={{ padding: 8, display: "contents" }}>
                                            <img src={ImgVisor1Ecopetrol} alt="visor1-ecopetrol" />
                                        </CardContent>
                                        <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                            <ThemeProvider theme={responsiveFontSizes(buttonColor('#149A2F'))}>
                                                <Button component={Link} variant="contained" size="small" to={`visual/${Visor1UUID}`}>
                                                    Ir
                                                </Button>
                                            </ThemeProvider>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardHeader
                                            style={{ background: "#149A2F", paddingTop: 12, paddingBottom: 12 }}
                                            title={
                                                <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Producto 12: Inversión y activos</Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent style={{ padding: 8, display: "contents" }}>
                                            <img src={ImgVisor2Ecopetrol} alt="visor2-ecopetrol" />
                                        </CardContent>
                                        <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                            <ThemeProvider theme={responsiveFontSizes(buttonColor('#149A2F'))}>
                                                <Button component={Link} variant="contained" size="small" to={`visual/${Visor2UUID}`}>
                                                    Ir
                                                </Button>
                                            </ThemeProvider>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardHeader
                                            style={{ background: "#149A2F", paddingTop: 12, paddingBottom: 12 }}
                                            title={
                                                <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Producto 13: Línea de base</Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent style={{ padding: 8, display: "contents" }}>
                                            <img src={ImgVisor3Ecopetrol} alt="visor3-ecopetrol" />
                                        </CardContent>
                                        <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                            <ThemeProvider theme={responsiveFontSizes(buttonColor('#149A2F'))}>
                                                <Button component={Link} variant="contained" size="small" to={`visual/${Visor3UUID}`}>
                                                    Ir
                                                </Button>
                                            </ThemeProvider>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Container>
                    </React.Fragment>
                    :
                    <Redirect to={`/client/${clientUUID}/login`} />
                }
            </Route>
            <Route exact path={pathsVisores[0]}>
                {auth ?
                    <Visor1Ecopetrol
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        accessToken={[accessToken, setAccessToken]}
                        setShowBackdrop={setShowBackdrop}
                        username={[username, setUsername]}
                        setAuth={setAuth}
                        clientUUID={clientUUID}
                    />
                    :
                    <Redirect to={`/client/${clientUUID}/login`} />
                }
            </Route>
            <Route exact path={pathsVisores[1]}>
                {auth ?
                    <Visor2Ecopetrol
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        accessToken={[accessToken, setAccessToken]}
                        setShowBackdrop={setShowBackdrop}
                        username={[username, setUsername]}
                        setAuth={setAuth}
                        clientUUID={clientUUID}
                    />
                    :
                    <Redirect to={`/client/${clientUUID}/login`} />
                }
            </Route>
            <Route exact path={pathsVisores[2]}>
                {auth ?
                    <Visor3Ecopetrol
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        accessToken={[accessToken, setAccessToken]}
                        setShowBackdrop={setShowBackdrop}
                        username={[username, setUsername]}
                        setAuth={setAuth}
                        clientUUID={clientUUID}
                    />
                    :
                    <Redirect to={`/client/${clientUUID}/login`} />
                }
            </Route>
        </ThemeProvider>
    );
}