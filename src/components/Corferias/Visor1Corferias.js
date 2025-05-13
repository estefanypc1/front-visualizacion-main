import React, { useState, useRef, useEffect } from "react";
import LogoCNC from "../../images/logo-cnc.png";
import LogoCorferias from "../../images/logo-corferias.png";
import { Link } from "react-router-dom";
import { AppBar, Container, Toolbar, Typography, IconButton, Drawer, List, ListItemText, ListItemIcon, ListItemButton, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useWindowDimensions from '../../styles/useWindowDimensions';
import useBreakpoints from "../../styles/useBreakpoints";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

import PowerBI from '../PowerBI';

const WORKSPACE_ID = 'df417ad2-aa64-4faf-ac77-55c0362a28d4';
const REPORT_ID = ['88caa770-9910-4844-8acb-c54c2a4a6b78', "4d693419-9fd1-4651-baab-810a975bfff9"];

const drawerWidth1 = 180;
const drawerWidth2 = 56;

const useStyles = makeStyles((theme) => ({
    logo: {
        width: 110,
        [theme.breakpoints.up("sm")]: {
            width: 135
        }
    },
    logo2: {
        width: 110,
        [theme.breakpoints.up("sm")]: {
            width: 125
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
    },
    pbi: {
        width: `calc(100% - ${drawerWidth2}px)`,
        marginLeft: drawerWidth2,
        [theme.breakpoints.up("md")]: {
            width: `calc(100% - ${drawerWidth1}px)`,
            marginLeft: drawerWidth1,
        }
    },
    drawer: {
        width: drawerWidth2,
        [theme.breakpoints.up("md")]: {
            width: drawerWidth1,
        }
    }
}));

export default function Visor1Corferias(props) {
    const { theme, API_DEFAULT, setShowBackdrop, setAuth, clientUUID, setMLCopyright } = props;
    const actualTheme = createTheme(theme, {
        palette: {
            primary: {
                main: "#3D5C74"
            }
        }
    });
    const [accessToken, setAccessToken] = props.accessToken;
    const [username, setUsername] = props.username;
    const classes = useStyles();
    const refPBI = useRef(null);
    const [pbiEmbed, setPbiEmbed] = useState({});

    const [visorIndex, setVisorIndex] = useState(0);

    const { width } = useWindowDimensions(refPBI, pbiEmbed);
    const point = useBreakpoints();

    useEffect(() => {
        if (!["xs", "sm"].includes(point)) {
            setMLCopyright(220);
        }
        else {
            setMLCopyright(56);
        }
    }, [point]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <ThemeProvider theme={actualTheme}>
            <AppBar position="static" style={{ background: "linear-gradient(to right, #274759, #3D5C74)" }}>
                <Toolbar>
                    <div className={classes.logoSpacing}>
                        <a style={{ display: "contents" }} href={"https://www.centronacionaldeconsultoria.com/"}>
                            <img src={LogoCNC} alt="logo-cnc" className={classes.logo} />
                        </a>
                    </div>
                    <div className={classes.logoSpacing2}>
                        <a style={{ display: "contents" }} href={"https://corferias.com/"}>
                            <img src={LogoCorferias} alt="logo-corferias" className={classes.logo2} />
                        </a>
                    </div>
                    <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 500 }}>
                        SOFA
                    </Typography>
                    <React.Fragment>
                        <Typography className={classes.username} style={{ fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic" }} variant='body1'>@{username.toLowerCase()}</Typography>
                        <IconButton style={{ marginRight: theme.spacing(1) }} component={Link} edge='start' color='inherit' to={`/client/${clientUUID}/home`}>
                            <HomeIcon />
                        </IconButton>
                        <IconButton edge='start' color='inherit' onClick={() => { localStorage.removeItem('token-corferias'); localStorage.removeItem('auth-corferias'); localStorage.removeItem('username-corferias'); setAccessToken(''); setAuth(false); setUsername(''); }}>
                            <LogoutIcon />
                        </IconButton>
                    </React.Fragment>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth2,
                    [theme.breakpoints.up("md")]: {
                        width: drawerWidth1,
                    },
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth2,
                        [theme.breakpoints.up("md")]: {
                            width: drawerWidth1,
                        },
                        boxSizing: 'border-box',
                        zIndex: -1
                    }
                }}
                variant="permanent"
                anchor="left"
            />
            <List className={classes.drawer} style={{ position: "absolute" }}>
                <Tooltip title="Visitantes" placement="right" arrow disableHoverListener={!["xs", "sm"].includes(point)} disableTouchListener={!["xs", "sm"].includes(point)} disableFocusListener={!["xs", "sm"].includes(point)}>
                    <ListItemButton selected={visorIndex === 0} onClick={(e) => { setVisorIndex(0) }}>
                        <ListItemIcon sx={{ minWidth: 45 }}>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.username} primary="Visitantes" />
                    </ListItemButton>
                </Tooltip>
                <Tooltip title="Expositores" placement="right" arrow disableHoverListener={!["xs", "sm"].includes(point)} disableTouchListener={!["xs", "sm"].includes(point)} disableFocusListener={!["xs", "sm"].includes(point)}>
                    <ListItemButton selected={visorIndex === 1} onClick={(e) => { setVisorIndex(1) }}>
                        <ListItemIcon sx={{ minWidth: 45 }}>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.username} primary="Expositores" />
                    </ListItemButton>
                </Tooltip>
            </List>
            <div className={classes.pbi} style={{ marginTop: theme.spacing(2) }}>
                <Container maxWidth="xl">
                    <PowerBI pbi={[pbiEmbed, setPbiEmbed]} refPBI={refPBI} width={width} theme={theme} accessToken={accessToken} API_DEFAULT={API_DEFAULT} WORKSPACE_ID={WORKSPACE_ID} REPORT_ID={REPORT_ID[visorIndex]} setShowBackdrop={setShowBackdrop} />
                </Container>
            </div>
        </ThemeProvider>
    );
}