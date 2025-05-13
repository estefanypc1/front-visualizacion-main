import React, { useState, useEffect } from "react";
import LogoCNC from "../../images/logo-cnc-2.png";
import LogoRiopaila from "../../images/logo-riopaila.png";
import ImgVisor1Riopaila from "../../images/visor1-riopaila.png";
import ImgVisor2Riopaila from "../../images/visor2-riopaila.png";
import ImgVisor3Riopaila from "../../images/visor3-riopaila.png";
import ImgVisor4Riopaila from "../../images/visor4-riopaila.png";
import ImgVisor5Riopaila from "../../images/visor5-riopaila.png";
import ImgVisor6Riopaila from "../../images/visor6-riopaila.png";
import { Redirect, Route, Link, useHistory } from "react-router-dom";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import { AppBar, Button, Card, CardHeader, CardActions, CardContent, Container, Divider, Grid, Toolbar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LogoutIcon from '@mui/icons-material/Logout';

import Sesion from "../Sesion";
import Visor1Riopaila from "./Visor1Riopaila";
import Visor2Riopaila from "./Visor2Riopaila";
import Visor3Riopaila from "./Visor3Riopaila";
import Visor4Riopaila from "./Visor4Riopaila";
import Visor5Riopaila from "./Visor5Riopaila";
import Visor6Riopaila from "./Visor6Riopaila";

const Visor1UUID = "ef304cb0-d66d-4a9e-994f-b7f1265b23d5"
const Visor2UUID = "3fef13f0-1f81-41f2-9fc8-19aed4d3d0b5"
const Visor3UUID = "bb8bd007-6809-4f6d-8dbc-42c7a56afc82"
const Visor4UUID = "cadab76b-a6b7-4d77-92d3-5540d3aa10fe"
const Visor5UUID = "11402b65-3250-408f-98c7-59cb3a209286"
const Visor6UUID = "53805daf-1145-4b28-b78b-62b7f35cba6c"

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
            width: 125
        }
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

export default function Riopaila(props) {
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
    const pathsVisores = [`/client/${clientUUID}/visual/${Visor1UUID}`, `/client/${clientUUID}/visual/${Visor2UUID}`, `/client/${clientUUID}/visual/${Visor3UUID}`,`/client/${clientUUID}/visual/${Visor4UUID}`,`/client/${clientUUID}/visual/${Visor5UUID}`,`/client/${clientUUID}/visual/${Visor6UUID}`]

    const [sessionErrors, setSessionErrors] = useState(Array(2).fill(false));

    const [auth, setAuth] = useState(localStorage.getItem('auth-riopaila'));
    const [accessToken, setAccessToken] = useState(localStorage.getItem('token-riopaila'));
    const [username, setUsername] = useState(localStorage.getItem('username-riopaila'));

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
                if (d['roles'].includes('Administrador') || d['roles'].includes('Visor Riopaila')) {
                    localStorage.setItem('token-riopaila', token);
                    localStorage.setItem('auth-riopaila', true);
                    localStorage.setItem('username-riopaila', usuario);
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
                    <a style={{ display: "contents" }} href={"https://www.riopaila-castilla.com/"}>
                        <img src={LogoRiopaila} alt="logo-riopaila" className={classes.logo2} />
                    </a>
                </div>
                <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 500 }}>

                </Typography>
                {auth ?
                    <React.Fragment>
                        <Typography className={classes.username} style={{ color: 'black', fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic" }} variant='body1'>@{username.toLowerCase()}</Typography>
                        <IconButton edge='start' color='default' onClick={() => { localStorage.removeItem('token-riopaila'); localStorage.removeItem('auth-riopaila'); localStorage.removeItem('username-riopaila'); setAccessToken(''); setAuth(false); setUsername(''); }}>
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
        document.title = "Visualización CNC - Riopaila"
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
                                                style={{ background: "linear-gradient(to right, #d1d0cc, #e6e6e6)", paddingTop: 12, paddingBottom: 12 }}
                                                title={
                                                    <Typography variant="h6" style={{ color: "black", fontSize: 21 }}>Riopaila </Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent style={{ padding: 8, display: "contents" }}>
                                                <img src={ImgVisor1Riopaila} alt="visor1-riopaila" />
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
                                    :
                                    null
                                }
                                {["admin", "mlazaro_visual", "lina_alvarado", "fcaicedogonzalez"].includes(username) ?
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardHeader
                                                style={{ background: "linear-gradient(to right, #d1d0cc, #e6e6e6)", paddingTop: 12, paddingBottom: 12 }}
                                                title={
                                                    <Typography variant="h6" style={{ color: "black", fontSize: 21 }}>Fundación Caicedo González </Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent style={{ padding: 8, display: "contents" }}>
                                                <img src={ImgVisor2Riopaila} alt="visor2-riopaila" />
                                            </CardContent>
                                            <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                                <ThemeProvider theme={responsiveFontSizes(buttonColor('#d1d0cc'))}>
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
                                {["admin", "mlazaro_visual", "lina_alvarado", "grupo_riopaila"].includes(username) ?
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardHeader
                                                style={{ background: "linear-gradient(to right, #d1d0cc, #e6e6e6)", paddingTop: 12, paddingBottom: 12 }}
                                                title={
                                                    <Typography variant="h6" style={{ color: "black", fontSize: 21 }}>Grupo Agroindustrial </Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent style={{ padding: 8, display: "contents" }}>
                                                <img src={ImgVisor3Riopaila} alt="visor3-riopaila" />
                                            </CardContent>
                                            <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                                <ThemeProvider theme={responsiveFontSizes(buttonColor('#d1d0cc'))}>
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
                                {["admin", "mlazaro_visual", "lina_alvarado", "grupo_riopaila"].includes(username) ?
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardHeader
                                                style={{ background: "linear-gradient(to right, #d1d0cc, #e6e6e6)", paddingTop: 12, paddingBottom: 12 }}
                                                title={
                                                    <Typography variant="h6" style={{ color: "black", fontSize: 21 }}>Fundación Caicedo González </Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent style={{ padding: 8, display: "contents" }}>
                                                <img src={ImgVisor4Riopaila} alt="visor4-riopaila" />
                                            </CardContent>
                                            <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                                <ThemeProvider theme={responsiveFontSizes(buttonColor('#d1d0cc'))}>
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
                                {["admin", "mlazaro_visual", "lina_alvarado", "grupo_riopaila"].includes(username) ?
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardHeader
                                                style={{ background: "linear-gradient(to right, #d1d0cc, #e6e6e6)", paddingTop: 12, paddingBottom: 12 }}
                                                title={
                                                    <Typography variant="h6" style={{ color: "black", fontSize: 21 }}>Grupo Agroindustrial Riopaila Castilla </Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent style={{ padding: 8, display: "contents" }}>
                                                <img src={ImgVisor5Riopaila} alt="visor5-riopaila" />
                                            </CardContent>
                                            <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                                <ThemeProvider theme={responsiveFontSizes(buttonColor('#d1d0cc'))}>
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
                                {["admin", "mlazaro_visual", "lina_alvarado", "grupo_riopaila"].includes(username) ?
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardHeader
                                                style={{ background: "linear-gradient(to right, #d1d0cc, #e6e6e6)", paddingTop: 12, paddingBottom: 12 }}
                                                title={
                                                    <Typography variant="h6" style={{ color: "black", fontSize: 21 }}>Imagen de los grupos de reputación </Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent style={{ padding: 8, display: "contents" }}>
                                                <img src={ImgVisor6Riopaila} alt="visor5-riopaila" />
                                            </CardContent>
                                            <CardActions style={{ justifyContent: "flex-end", paddingBottom: 12, paddingRight: 12 }}>
                                                <ThemeProvider theme={responsiveFontSizes(buttonColor('#d1d0cc'))}>
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
                        <Visor1Riopaila
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
            {["admin", "mlazaro_visual", "lina_alvarado", "fcaicedogonzalez"].includes(username) ?
                <Route exact path={pathsVisores[1]}>
                    {auth ?
                        <Visor2Riopaila
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
            {["admin", "mlazaro_visual", "lina_alvarado", "grupo_riopaila"].includes(username) ?
                <Route exact path={pathsVisores[2]}>
                    {auth ?
                        <Visor3Riopaila
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
            {["admin", "mlazaro_visual", "lina_alvarado", "grupo_riopaila"].includes(username) ?
                <Route exact path={pathsVisores[3]}>
                    {auth ?
                        <Visor4Riopaila
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
            {["admin", "mlazaro_visual", "lina_alvarado", "grupo_riopaila"].includes(username) ?
                <Route exact path={pathsVisores[4]}>
                    {auth ?
                        <Visor5Riopaila
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
            {["admin", "mlazaro_visual", "lina_alvarado", "grupo_riopaila"].includes(username) ?
                <Route exact path={pathsVisores[5]}>
                    {auth ?
                        <Visor6Riopaila
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
