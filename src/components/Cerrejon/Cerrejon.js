import React, { useState, useEffect } from "react";
import LogoCNC from "../../images/logo-cnc-2.png";
import LogoCerrejon from "../../images/logo-cerrejon-2.png";
import ImgVisor1Cerrejon from "../../images/visor1-cerrejon.png";
import ImgVisor2Cerrejon from "../../images/visor2-cerrejon.png";
import ImgVisor3Cerrejon from "../../images/visor3-cerrejon.png";
import ImgVisor4Cerrejon from "../../images/visor4-cerrejon.png";
import ImgVisor5Cerrejon from "../../images/visor5-cerrejon.png";
import ImgVisor6Cerrejon from "../../images/visor6-cerrejon.png";
import { Redirect, Route, Link, useHistory } from "react-router-dom";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import { AppBar, Button, Card, CardHeader, CardActions, CardContent, Container, Divider, Grid, Toolbar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LogoutIcon from '@mui/icons-material/Logout';

import Sesion from "../Sesion";
import Visor1Cerrejon from "./Visor1Cerrejon";
import Visor2Cerrejon from "./Visor2Cerrejon";
import Visor3Cerrejon from "./Visor3Cerrejon";
import Visor4Cerrejon from "./Visor4Cerrejon";
import Visor5Cerrejon from "./Visor5Cerrejon";
import Visor6Cerrejon from "./Visor6Cerrejon";

const Visor1UUID = "de75b128-1bd5-4557-b300-d21c5e4ae1fa"
const Visor2UUID = "efe9461e-6032-48ad-b4f3-8fb71139defc"
const Visor3UUID = "f90d735f-e3b8-44d2-8e35-6d8d93a46eb8"
const Visor4UUID = "cd2fce37-6693-490e-a290-aa5e432c467c"
const Visor5UUID = "f8e9beb2-25ec-4639-8ecd-e92ffb3d0688"
const Visor6UUID = "6329c445-7ee2-4e8e-b665-b8fce9b4069f"

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
        width: 110,
        [theme.breakpoints.up("sm")]: {
            width: 135
        }
    },
    logo2: {
        width: 85,
        [theme.breakpoints.up("sm")]: {
            width: 105
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

export default function Cerrejon(props) {
    const { theme, API_DEFAULT, setShowBackdrop, setMessage, setSeverity, setSnack, clientUUID } = props;
    const actualTheme = createTheme(theme, {
        palette: {
            primary: {
                main: "#033d50"
            }
        }
    });

    const classes = useStyles();
    const history = useHistory();
    const [pathname, setPathname] = useState(window.location.pathname);
    const pathsVisores = [`/client/${clientUUID}/visual/${Visor1UUID}`, `/client/${clientUUID}/visual/${Visor2UUID}`, `/client/${clientUUID}/visual/${Visor3UUID}`, `/client/${clientUUID}/visual/${Visor4UUID}` , `/client/${clientUUID}/visual/${Visor5UUID}`, `/client/${clientUUID}/visual/${Visor6UUID}`]

    const [sessionErrors, setSessionErrors] = useState(Array(2).fill(false));

    const [auth, setAuth] = useState(localStorage.getItem('auth-cerrejon'));
    const [accessToken, setAccessToken] = useState(localStorage.getItem('token-cerrejon'));
    const [username, setUsername] = useState(localStorage.getItem('username-cerrejon'));

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
                if (d['roles'].includes('Administrador') || d['roles'].includes('Visor Cerrejón')) {
                    localStorage.setItem('token-cerrejon', token);
                    localStorage.setItem('auth-cerrejon', true);
                    localStorage.setItem('username-cerrejon', usuario);
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
        <AppBar position="static" style={{ marginBottom: theme.spacing(2), background: '#ffbb00' }}>
            <Toolbar>
                <div className={classes.logoSpacing}>
                    <a style={{ display: "contents" }} href={"https://www.centronacionaldeconsultoria.com/"}>
                        <img src={LogoCNC} alt="logo-cnc" className={classes.logo} />
                    </a>
                </div>
                <div className={classes.logoSpacing2}>
                    <a style={{ display: "contents" }} href={"https://www.cerrejon.com/"}>
                        <img src={LogoCerrejon} alt="logo-cerrejon" className={classes.logo2} />
                    </a>
                </div>
                <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 500, color: '#000000' }}>
                    Cerrejón
                </Typography>
                {auth ?
                    <React.Fragment>
                        <Typography className={classes.username} style={{ fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic", color: '#000000' }} variant='body1'>@{username.toLowerCase()}</Typography>
                        <IconButton style={{ color: '#000000' }} edge='start' color='inherit' onClick={() => { localStorage.removeItem('token-cerrejon'); localStorage.removeItem('auth-cerrejon'); localStorage.removeItem('username-cerrejon'); setAccessToken(''); setAuth(false); setUsername(''); }}>
                            <LogoutIcon />
                        </IconButton>
                    </React.Fragment>
                    :
                    null
                }
            </Toolbar>
        </AppBar>
    );

    useEffect(() => {
        return history.listen((location) => {
            setPathname(location.pathname)
        })
    }, [history]);

    useEffect(() => {
        document.title = "Visualización CNC - Cerrejón"
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
                        <Container maxWidth="md">
                            <Grid container direction="row" alignItems="stretch" spacing={2}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardHeader
                                            style={{ background: "#033d50", paddingTop: 12, paddingBottom: 12 }}
                                            title={
                                                <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Resultados estudio comunidad 2023</Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent style={{ padding: 8, display: "contents" }}>
                                            <img src={ImgVisor6Cerrejon} alt="visor6-cerrejon" />
                                        </CardContent>
                                        <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                            <ThemeProvider theme={responsiveFontSizes(buttonColor('#033d50'))}>
                                                <Button component={Link} variant="contained" size="small" to={`visual/${Visor6UUID}`}>
                                                    Ir
                                                </Button>
                                            </ThemeProvider>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardHeader
                                            style={{ background: "#033d50", paddingTop: 12, paddingBottom: 12 }}
                                            title={
                                                <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Resultados estudio Líderes 2023</Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent style={{ padding: 8, display: "contents" }}>
                                            <img src={ImgVisor5Cerrejon} alt="visor5-cerrejon" />
                                        </CardContent>
                                        <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                            <ThemeProvider theme={responsiveFontSizes(buttonColor('#033d50'))}>
                                                <Button component={Link} variant="contained" size="small" to={`visual/${Visor5UUID}`}>
                                                    Ir
                                                </Button>
                                            </ThemeProvider>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardHeader
                                            style={{ background: "#033d50", paddingTop: 12, paddingBottom: 12 }}
                                            title={
                                                <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Resultados estudio Comunidad 2022</Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent style={{ padding: 8, display: "contents" }}>
                                            <img src={ImgVisor3Cerrejon} alt="visor3-cerrejon" />
                                        </CardContent>
                                        <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                            <ThemeProvider theme={responsiveFontSizes(buttonColor('#033d50'))}>
                                                <Button component={Link} variant="contained" size="small" to={`visual/${Visor3UUID}`}>
                                                    Ir
                                                </Button>
                                            </ThemeProvider>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardHeader
                                            style={{ background: "#033d50", paddingTop: 12, paddingBottom: 12 }}
                                            title={
                                                <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Resultados estudio Líderes 2022</Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent style={{ padding: 8, display: "contents" }}>
                                            <img src={ImgVisor4Cerrejon} alt="visor4-cerrejon" />
                                        </CardContent>
                                        <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                            <ThemeProvider theme={responsiveFontSizes(buttonColor('#033d50'))}>
                                                <Button component={Link} variant="contained" size="small" to={`visual/${Visor4UUID}`}>
                                                    Ir
                                                </Button>
                                            </ThemeProvider>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardHeader
                                            style={{ background: "#033d50", paddingTop: 12, paddingBottom: 12 }}
                                            title={
                                                <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Resultados estudio Comunidad 2021</Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent style={{ padding: 8, display: "contents" }}>
                                            <img src={ImgVisor1Cerrejon} alt="visor1-cerrejon" />
                                        </CardContent>
                                        <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                            <ThemeProvider theme={responsiveFontSizes(buttonColor('#033d50'))}>
                                                <Button component={Link} variant="contained" size="small" to={`visual/${Visor1UUID}`}>
                                                    Ir
                                                </Button>
                                            </ThemeProvider>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardHeader
                                            style={{ background: "#033d50", paddingTop: 12, paddingBottom: 12 }}
                                            title={
                                                <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Resultados estudio Líderes 2021</Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent style={{ padding: 8, display: "contents" }}>
                                            <img src={ImgVisor2Cerrejon} alt="visor2-cerrejon" />
                                        </CardContent>
                                        <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                            <ThemeProvider theme={responsiveFontSizes(buttonColor('#033d50'))}>
                                                <Button component={Link} variant="contained" size="small" to={`visual/${Visor2UUID}`}>
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
                    <Visor1Cerrejon
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
                    <Visor2Cerrejon
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
                    <Visor3Cerrejon
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
            <Route exact path={pathsVisores[3]}>
                {auth ?
                    <Visor4Cerrejon
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
            <Route exact path={pathsVisores[4]}>
                {auth ?
                    <Visor5Cerrejon
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
            <Route exact path={pathsVisores[5]}>
                {auth ?
                    <Visor6Cerrejon
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