import React, { useState, useEffect } from "react";
import LogoCNC from "../../images/logo-cnc.png";
import LogoMiBanco from "../../images/logo-mibanco.png";
import ImgVisor1MiBanco from "../../images/visor1-mibanco.png";
import ImgVisor2MiBanco from "../../images/visor2-mibanco.png";
import ImgVisor3MiBanco from "../../images/visor3-mibanco.png";
import ImgVisor4MiBanco from "../../images/visor4-mibanco.png";
import ImgVisor5MiBanco from "../../images/visor5-mibanco.png";
import ImgVisor6MiBanco from "../../images/visor6-mibanco.png";
import ImgVisor7MiBanco from "../../images/visor7-mibanco.png";
import ImgVisor8MiBanco from "../../images/visor8-mibanco.png";
import { Redirect, Route, Link, useHistory } from "react-router-dom";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import { AppBar, Button, Card, CardHeader, CardActions, CardContent, Container, Divider, Grid, Toolbar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LogoutIcon from '@mui/icons-material/Logout';

import Sesion from "../Sesion";
import Visor1MiBanco from "./Visor1MiBanco";
import Visor2MiBanco from "./Visor2MiBanco";
import Visor3MiBanco from "./Visor3MiBanco";
import Visor4MiBanco from "./Visor4MiBanco";
import Visor5MiBanco from "./Visor5MiBanco";
import Visor6MiBanco from "./Visor6MiBanco";
import Visor7MiBanco from "./Visor7MiBanco";
import Visor8MiBanco from "./Visor8MiBanco";

const Visor1UUID = "071861ef-15b9-4559-b46d-b3a5e959566a"
const Visor2UUID = "c8aa4ec0-f16b-4375-9f0f-68232a38c3e6"
const Visor3UUID = "9df31d91-011c-4c39-b51d-11c69c65630f"
const Visor4UUID = "f651bd80-78d9-46ba-a3d0-2f78b27cb791"
const Visor5UUID = "2c5b02af-f643-407b-b2ed-769c24573be8"
const Visor6UUID = "7ce7eb45-ceda-4793-8a4c-58a2f2bcf228"
const Visor7UUID = "5fdf3615-d512-4409-8efe-62a1450bf11b"
const Visor8UUID = "02718d54-a2a4-4da1-b43f-0060a000efb0"

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
        width: 70,
        [theme.breakpoints.up("sm")]: {
            width: 90
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

export default function MiBanco(props) {
    const { theme, API_DEFAULT, setShowBackdrop, setMessage, setSeverity, setSnack, clientUUID } = props;
    const actualTheme = createTheme(theme, {
        palette: {
            primary: {
                main: "#2E7D32"
            }
        }
    });

    const classes = useStyles();
    const history = useHistory();
    const [pathname, setPathname] = useState(window.location.pathname);
    const pathsVisores = [`/client/${clientUUID}/visual/${Visor1UUID}`, `/client/${clientUUID}/visual/${Visor2UUID}`, `/client/${clientUUID}/visual/${Visor3UUID}`, `/client/${clientUUID}/visual/${Visor4UUID}`,
    `/client/${clientUUID}/visual/${Visor5UUID}`, `/client/${clientUUID}/visual/${Visor6UUID}`,`/client/${clientUUID}/visual/${Visor7UUID}`,`/client/${clientUUID}/visual/${Visor8UUID}`];

    const [sessionErrors, setSessionErrors] = useState(Array(2).fill(false));

    const [auth, setAuth] = useState(localStorage.getItem('auth-mibanco'));
    const [accessToken, setAccessToken] = useState(localStorage.getItem('token-mibanco'));
    const [username, setUsername] = useState(localStorage.getItem('username-mibanco'));

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
                if (d['roles'].includes('Administrador') || d['roles'].includes('Visor MiBanco')) {
                    localStorage.setItem('token-mibanco', token);
                    localStorage.setItem('auth-mibanco', true);
                    localStorage.setItem('username-mibanco', usuario);
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
        <AppBar position="static" style={{ marginBottom: theme.spacing(2) }}>
            <Toolbar>
                <div className={classes.logoSpacing}>
                    <a style={{ display: "contents" }} href={"https://www.centronacionaldeconsultoria.com/"}>
                        <img src={LogoCNC} alt="logo-cnc" className={classes.logo} />
                    </a>
                </div>
                <div className={classes.logoSpacing2}>
                    <a style={{ display: "contents" }} href={"https://www.mibanco.com.co/"}>
                        <img src={LogoMiBanco} alt="logo-mibanco" className={classes.logo2} />
                    </a>
                </div>
                <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 500 }}>
                    MiBanco
                </Typography>
                {auth ?
                    <React.Fragment>
                        <Typography className={classes.username} style={{ fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic" }} variant='body1'>@{username.toLowerCase()}</Typography>
                        <IconButton edge='start' color='inherit' onClick={() => { localStorage.removeItem('token-mibanco'); localStorage.removeItem('auth-mibanco'); localStorage.removeItem('username-mibanco'); setAccessToken(''); setAuth(false); setUsername(''); }}>
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
        document.title = "Visualización CNC - MiBanco"
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
                                {username !== '' ?
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardHeader
                                                style={{ background: "#2E7D32", paddingTop: 12, paddingBottom: 12 }}
                                                title={
                                                    <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>MIbanco 2024</Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent style={{ padding: 8, display: "contents" }}>
                                                <img src={ImgVisor8MiBanco} alt="visor8-mibanco" />
                                            </CardContent>
                                            <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                                <ThemeProvider theme={responsiveFontSizes(buttonColor('#2E7D32'))}>
                                                    <Button component={Link} variant="contained" size="small" to={`visual/${Visor8UUID}`}>
                                                        Ir
                                                    </Button>
                                                </ThemeProvider>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    :
                                    null
                                }
                                {username !== '' ?
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardHeader
                                                style={{ background: "#2E7D32", paddingTop: 12, paddingBottom: 12 }}
                                                title={
                                                    <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Relacionamiento clientes sep-oct</Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent style={{ padding: 8, display: "contents" }}>
                                                <img src={ImgVisor7MiBanco} alt="visor7-mibanco" />
                                            </CardContent>
                                            <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                                <ThemeProvider theme={responsiveFontSizes(buttonColor('#2E7D32'))}>
                                                    <Button component={Link} variant="contained" size="small" to={`visual/${Visor7UUID}`}>
                                                        Ir
                                                    </Button>
                                                </ThemeProvider>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    :
                                    null
                                }
                                {username !== '' ?
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardHeader
                                                style={{ background: "#2E7D32", paddingTop: 12, paddingBottom: 12 }}
                                                title={
                                                    <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Relacionamiento total 2023</Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent style={{ padding: 8, display: "contents" }}>
                                                <img src={ImgVisor6MiBanco} alt="visor6-mibanco" />
                                            </CardContent>
                                            <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                                <ThemeProvider theme={responsiveFontSizes(buttonColor('#2E7D32'))}>
                                                    <Button component={Link} variant="contained" size="small" to={`visual/${Visor6UUID}`}>
                                                        Ir
                                                    </Button>
                                                </ThemeProvider>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    :
                                    null
                                }
                                {username !== '' ?
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardHeader
                                                style={{ background: "#2E7D32", paddingTop: 12, paddingBottom: 12 }}
                                                title={
                                                    <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Relacionamiento Medición 2023</Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent style={{ padding: 8, display: "contents" }}>
                                                <img src={ImgVisor5MiBanco} alt="visor5-mibanco" />
                                            </CardContent>
                                            <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                                <ThemeProvider theme={responsiveFontSizes(buttonColor('#2E7D32'))}>
                                                    <Button component={Link} variant="contained" size="small" to={`visual/${Visor5UUID}`}>
                                                        Ir
                                                    </Button>
                                                </ThemeProvider>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    :
                                    null
                                }
                                {username !== '' ?
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardHeader
                                                style={{ background: "#2E7D32", paddingTop: 12, paddingBottom: 12 }}
                                                title={
                                                    <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Relacionamiento Tercera Medición</Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent style={{ padding: 8, display: "contents" }}>
                                                <img src={ImgVisor4MiBanco} alt="visor4-mibanco" />
                                            </CardContent>
                                            <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                                <ThemeProvider theme={responsiveFontSizes(buttonColor('#2E7D32'))}>
                                                    <Button component={Link} variant="contained" size="small" to={`visual/${Visor4UUID}`}>
                                                        Ir
                                                    </Button>
                                                </ThemeProvider>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    :
                                    null
                                }
                                {username !== 'mibanco_interno' ?
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardHeader
                                                style={{ background: "#2E7D32", paddingTop: 12, paddingBottom: 12 }}
                                                title={
                                                    <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Relacionamiento Segunda Medición</Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent style={{ padding: 8, display: "contents" }}>
                                                <img src={ImgVisor3MiBanco} alt="visor3-mibanco" />
                                            </CardContent>
                                            <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                                <ThemeProvider theme={responsiveFontSizes(buttonColor('#2E7D32'))}>
                                                    <Button component={Link} variant="contained" size="small" to={`visual/${Visor3UUID}`}>
                                                        Ir
                                                    </Button>
                                                </ThemeProvider>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    :
                                    null
                                }
                                {username !== 'mibanco_interno' ?
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardHeader
                                                style={{ background: "#2E7D32", paddingTop: 12, paddingBottom: 12 }}
                                                title={
                                                    <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Relacionamiento Clientes</Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent style={{ padding: 8, display: "contents" }}>
                                                <img src={ImgVisor2MiBanco} alt="visor2-mibanco" />
                                            </CardContent>
                                            <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                                <ThemeProvider theme={responsiveFontSizes(buttonColor('#2E7D32'))}>
                                                    <Button component={Link} variant="contained" size="small" to={`visual/${Visor2UUID}`}>
                                                        Ir
                                                    </Button>
                                                </ThemeProvider>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    :
                                    null
                                }
                                {username !== 'mibanco_relacion' ?
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardHeader
                                                style={{ background: "#2E7D32", paddingTop: 12, paddingBottom: 12 }}
                                                title={
                                                    <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Evaluación Cliente Interno</Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent style={{ padding: 8, display: "contents" }}>
                                                <img src={ImgVisor1MiBanco} alt="visor1-mibanco" />
                                            </CardContent>
                                            <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                                <ThemeProvider theme={responsiveFontSizes(buttonColor('#2E7D32'))}>
                                                    <Button component={Link} variant="contained" size="small" to={`visual/${Visor1UUID}`}>
                                                        Ir
                                                    </Button>
                                                </ThemeProvider>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    :
                                    null
                                }
                            </Grid>
                        </Container>
                    </React.Fragment>
                    :
                    <Redirect to={`/client/${clientUUID}/login`} />
                }
            </Route>
            <Route exact path={pathsVisores[0]}>
                {auth & username !== 'mibanco_relacion' ?
                    <Visor1MiBanco
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
                {auth & username !== 'mibanco_interno' ?
                    <Visor2MiBanco
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
                {auth & username !== 'mibanco_interno' ?
                    <Visor3MiBanco
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
                {auth & username !== 'mibanco_interno' ?
                    <Visor4MiBanco
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
                {auth & username !== '' ?
                    <Visor5MiBanco
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
                {auth & username !== '' ?
                    <Visor6MiBanco
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
            <Route exact path={pathsVisores[6]}>
                {auth & username !== '' ?
                    <Visor7MiBanco
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
            <Route exact path={pathsVisores[7]}>
                {auth & username !== '' ?
                    <Visor8MiBanco
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