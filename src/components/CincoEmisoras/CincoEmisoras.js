import React, { useState, useEffect } from "react";
import LogoCNC from "../../images/logo-cnc-RcnBluRadP.png";
import ImgVisor1RcnBluRadP from "../../images/visor1-RcnBluRadP.png";
import { Redirect, Route, Link, useHistory } from "react-router-dom";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import { AppBar, Button, Card, CardHeader, CardActions, CardContent, Container, Divider, Grid, Toolbar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LogoutIcon from '@mui/icons-material/Logout';

import Sesion from "../Sesion";
import Visor1CincoEmisoras from "./Visor1CincoEmisoras";

const Visor1UUID = "bd22dad8-193f-47bc-9052-51f36db3e9b7"

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
        width: 180,
        [theme.breakpoints.up("sm")]: {
            width: 220
        },
        height: "auto",
    },
    logo2: {
        width: 140,
        [theme.breakpoints.up("sm")]: {
            width: 150
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
            marginRight: theme.spacing(2)
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

export default function CincoEmisoras(props) {
    const { theme, API_DEFAULT, setShowBackdrop, setMessage, setSeverity, setSnack, clientUUID } = props;
    const actualTheme = createTheme(theme, {
        palette: {
            primary: {
                main: "#d1d0cc"
            }
        }
    });

    const classes = useStyles();
    const history = useHistory();
    const [pathname, setPathname] = useState(window.location.pathname);
    const pathsVisores = [`/client/${clientUUID}/visual/${Visor1UUID}`]

    const [sessionErrors, setSessionErrors] = useState(Array(2).fill(false));

    const [auth, setAuth] = useState(localStorage.getItem('auth-CincoEmisoras'));
    const [accessToken, setAccessToken] = useState(localStorage.getItem('token-CincoEmisoras'));
    const [username, setUsername] = useState(localStorage.getItem('username-CincoEmisoras'));

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
                if (d['roles'].includes('Administrador') || d['roles'].includes('Visor DNP')) {
                    localStorage.setItem('token-DNP', token);
                    localStorage.setItem('auth-DNP', true);
                    localStorage.setItem('username-DNP', usuario);
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
        <AppBar position="static" style={{ marginBottom: theme.spacing(2), background: "linear-gradient(to right, #d1d0cc, #f4f4f4)" }}>
            <Toolbar>
                <div className={classes.logoSpacing}>
                    <a style={{ display: "contents" }} href={"https://www.centronacionaldeconsultoria.com/"}>
                        <img src={LogoCNC} alt="logo-cnc" className={classes.logo} />
                    </a>
                </div>
                <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 500 }}>
            
                </Typography>
                {auth ?
                    <React.Fragment>
                        <Typography className={classes.username} style={{ color: 'black', fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic" }} variant='body1'>@{username.toLowerCase()}</Typography>
                        <IconButton edge='start' color='default' onClick={() => { localStorage.removeItem('token-CincoEmisoras'); localStorage.removeItem('auth-CincoEmisoras'); localStorage.removeItem('username-CincoEmisoras'); setAccessToken(''); setAuth(false); setUsername(''); }}>
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
        document.title = "Visualización CNC - CincoEmisoras"
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
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardHeader
                                            style={{ background: "linear-gradient(to right, #d1d0cc, #f4f4f4)", paddingTop: 12, paddingBottom: 12 }}
                                            title={
                                                <Typography variant="h6" style={{ color: "black", fontSize: 21 }}>Reporte Radio</Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent style={{ padding: 8, display: "contents" }}>
                                            <img src={ImgVisor1RcnBluRadP} alt="visor1-CincoEmisoras" />
                                        </CardContent>
                                        <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                            <ThemeProvider theme={responsiveFontSizes(buttonColor('#d1d0cc'))}>
                                                <Button component={Link} variant="contained" size="small" to={`visual/${Visor1UUID}`}>
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
                    <Visor1CincoEmisoras
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