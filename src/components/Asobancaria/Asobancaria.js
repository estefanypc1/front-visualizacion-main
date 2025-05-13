import React, { useState, useEffect } from "react";
import LogoCNC from "../../images/logo-cnc-3.png";
import LogoAsobancaria from "../../images/logo-asobancaria-2.png";

import ImgVisor1Asobancaria from "../../images/visor1-asobancaria.png";
import ImgVisor3Asobancaria from "../../images/visor3-asobancaria.png";
import ImgVisor4Asobancaria from "../../images/visor4-asobancaria.png";

import { Redirect, Route, Link, useHistory } from "react-router-dom";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import { AppBar, Button, Card, CardHeader, CardActions, CardContent, Container, Divider, Grid, Toolbar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LogoutIcon from '@mui/icons-material/Logout';

import Sesion from "../Sesion";
import Visor1Asobancaria from "./Visor1Asobancaria";
import Visor2Asobancaria from "./Visor2Asobancaria";
import Visor3Asobancaria from "./Visor3Asobancaria";
import Visor4Asobancaria from "./Visor4Asobancaria";

const Visor1UUID = "9a32e3c8-a086-470a-b326-8dafc2ecb347"
const Visor2UUID = "43970950-775e-4a0c-9fae-8cf811d4847f"
const Visor3UUID = "3cc6b920-d52d-404f-a74d-abc9c2fce22c"
const Visor4UUID = "05833940-a2ce-4225-9e80-fa75d96a2af9"

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
        width: 50,
        [theme.breakpoints.up("sm")]: {
            width: 55,
            marginLeft: `${11}px`,
            marginRight: `${-12}px`
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

export default function Asobancaria(props) {
    const { theme, API_DEFAULT, setShowBackdrop, setMessage, setSeverity, setSnack, clientUUID } = props;
    const actualTheme = createTheme(theme, {
        palette: {
            primary: {
                main: "#1F3E59"
            }
        }
    });

    const classes = useStyles();
    const history = useHistory();
    const [pathname, setPathname] = useState(window.location.pathname);
    const [pathsVisores, setPathVisores] = useState([`/client/${clientUUID}/visual/${Visor1UUID}`]);

    const [sessionErrors, setSessionErrors] = useState(Array(2).fill(false));

    const [auth, setAuth] = useState(localStorage.getItem('auth-asobancaria'));
    const [accessToken, setAccessToken] = useState(localStorage.getItem('token-asobancaria'));
    const [username, setUsername] = useState(localStorage.getItem('username-asobancaria'));

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
                if (d['roles'].includes('Administrador') || d['roles'].includes('Visor Asobancaria')) {
                    localStorage.setItem('token-asobancaria', token);
                    localStorage.setItem('auth-asobancaria', true);
                    localStorage.setItem('username-asobancaria', usuario);
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
                    <a style={{ display: "contents" }} href={"https://www.asobancaria.com/"}>
                        <img src={LogoAsobancaria} alt="logo-asobancaria" className={classes.logo2} />
                    </a>
                </div>
                <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 500 }}>
                    Asobancaria
                </Typography>
                {auth ?
                    <React.Fragment>
                        <Typography className={classes.username} style={{ fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic" }} variant='body1'>@{username.toLowerCase()}</Typography>
                        <IconButton edge='start' color='inherit' onClick={() => { localStorage.removeItem('token-asobancaria'); localStorage.removeItem('auth-asobancaria'); localStorage.removeItem('username-asobancaria'); setAccessToken(''); setAuth(false); setUsername(''); }}>
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
        if (["admin", "mlazaro_visual"].includes(username)) setPathVisores([...pathsVisores, `/client/${clientUUID}/visual/${Visor2UUID}`, `/client/${clientUUID}/visual/${Visor3UUID}`, `/client/${clientUUID}/visual/${Visor4UUID}`]);
    }, [username]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        document.title = "Visualización CNC - Asobancaria"
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
                                {["admin", "mlazaro_visual", "lina_alvarado"].includes(username) ?
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardHeader
                                                style={{ background: "linear-gradient(to right, #274669, #1F3E59)", paddingTop: 12, paddingBottom: 12 }}
                                                title={
                                                    <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Estudio sindicado de percepción, reputación y satisfacción del sector bancario {["admin", "mlazaro_visual"].includes(username) ? '*con filtro banco*' : ''}</Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent style={{ padding: 8, display: "contents" }}>
                                                <img src={ImgVisor1Asobancaria} alt="visor1-asobancaria" />
                                            </CardContent>
                                            <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                                <ThemeProvider theme={responsiveFontSizes(buttonColor('#274669'))}>
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
                                {["admin", "mlazaro_visual", "lina_alvarado"].includes(username) ?
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardHeader
                                                style={{ background: "linear-gradient(to right, #274669, #1F3E59)", paddingTop: 12, paddingBottom: 12 }}
                                                title={
                                                    <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Estudio sindicado de percepción, reputación y satisfacción del sector bancario *sin filtro banco*</Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent style={{ padding: 8, display: "contents" }}>
                                                <img src={ImgVisor1Asobancaria} alt="visor1-asobancaria" />
                                            </CardContent>
                                            <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                                <ThemeProvider theme={responsiveFontSizes(buttonColor('#274669'))}>
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
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardHeader
                                            style={{ background: "linear-gradient(to right, #3A3A3A, #414141)", paddingTop: 12, paddingBottom: 12 }}
                                            title={
                                                <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Estudio sindicado de percepción, reputación y satisfacción del sector bancario</Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent style={{ padding: 8, display: "contents" }}>
                                            <img src={ImgVisor3Asobancaria} alt="visor3-asobancaria" />
                                        </CardContent>
                                        <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                            <ThemeProvider theme={responsiveFontSizes(buttonColor('#3A3A3A'))}>
                                                <Button component={Link} variant="contained" size="small" to={`visual/${Visor3UUID}`}>
                                                    Ir
                                                </Button>
                                            </ThemeProvider>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                {["admin", "mlazaro_visual", "lina_alvarado"].includes(username) ?
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardHeader
                                                style={{ background: "linear-gradient(to right, #3A3A3A, #414141)", paddingTop: 12, paddingBottom: 12 }}
                                                title={
                                                    <Typography variant="h6" style={{ color: "white", fontSize: 21 }}>Estudio sindicado de percepción, reputación y satisfacción del sector bancario</Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent style={{ padding: 8, display: "contents" }}>
                                                <img src={ImgVisor4Asobancaria} alt="visor3-asobancaria" />
                                            </CardContent>
                                            <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                                <ThemeProvider theme={responsiveFontSizes(buttonColor('#3A3A3A'))}>
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
                            </Grid>
                        </Container>
                    </React.Fragment>
                    :
                    <Redirect to={`/client/${clientUUID}/login`} />
                }
            </Route>
            {["admin", "mlazaro_visual", "lina_alvarado"].includes(username) ?
                <Route exact path={pathsVisores[0]}>
                    {auth ?
                        <Visor1Asobancaria
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
                :
                null
            }
            {["admin", "mlazaro_visual", "lina_alvarado"].includes(username) ?
                <Route exact path={pathsVisores[1]}>
                    {auth ?
                        <Visor2Asobancaria
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
                :
                null
            }
            <Route exact path={pathsVisores[2]}>
                {auth ?
                    <Visor3Asobancaria
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
            {["admin", "mlazaro_visual", "lina_alvarado"].includes(username) ?
                <Route exact path={pathsVisores[3]}>
                    {auth ?
                        <Visor4Asobancaria
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
                :
                null
            }
        </ThemeProvider>
    );
}