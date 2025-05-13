import React, { useState, useEffect } from "react";
import LogoCNC from "../../images/logo-cnc.png";
import LogoPrevisora from "../../images/logo-Previsora.png";
import ImgVisor1Previsora from "../../images/visor1-Previsora.png";
import { Redirect, Route, Link, useHistory } from "react-router-dom";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import { AppBar, Button, Card, CardHeader, CardActions, CardContent, Container, Divider, Grid, Toolbar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LogoutIcon from '@mui/icons-material/Logout';

import Sesion from "../Sesion";
import Visor1Previsora from "./Visor1Previsora";

const Visor1UUID = "ffc26785-4d4f-48f7-93b5-7da18efa1100"

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
        width: 140,
        [theme.breakpoints.up("sm")]: {
            width: 175
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

export default function Previsora(props) {
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

    const [auth, setAuth] = useState(localStorage.getItem('auth-Previsora'));
    const [accessToken, setAccessToken] = useState(localStorage.getItem('token-Previsora'));
    const [username, setUsername] = useState(localStorage.getItem('username-Previsora'));

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
                if (d['roles'].includes('Administrador') || d['roles'].includes('Visor Previsora')) {
                    localStorage.setItem('token-Previsora', token);
                    localStorage.setItem('auth-Previsora', true);
                    localStorage.setItem('username-Previsora', usuario);
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
                <div className={classes.logoSpacing2}>
                    <a style={{ display: "contents" }} href={"https://www.previsora.gov.co/"}>
                        <img src={LogoPrevisora} alt="logo-Previsora" className={classes.logo2} />
                    </a>
                </div>
                <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 500, color: "#000000"  }}>
                    Previsora
                </Typography>
                {auth ?
                    <React.Fragment>
                        <Typography className={classes.username} style={{ fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic", color: "#000000"  }} variant='body1'>@{username.toLowerCase()}</Typography>
                        <IconButton edge='start' color='inherit' onClick={() => { localStorage.removeItem('token-Previsora'); localStorage.removeItem('auth-Previsora'); localStorage.removeItem('username-Previsora'); setAccessToken(''); setAuth(false); setUsername(''); }}>
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
        document.title = "Visualización CNC - Previsora"
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
                                            style={{ background: "linear-gradient(to right, #d1d0cc, #f4f4f4)", paddingTop: 12, paddingBottom: 12 }}
                                            title={
                                                <Typography variant="h6" style={{ fontSize: 21, color: "#000000" }}>Resultados Índice global de Reputación</Typography>
                                            }
                                        />
                                        <Divider />
                                        <CardContent style={{ padding: 8, display: "contents" }}>
                                            <img src={ImgVisor1Previsora} alt="visor1-Previsora" />
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
                    <Visor1Previsora
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