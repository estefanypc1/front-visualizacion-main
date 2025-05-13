import React, { useState, useRef } from "react";
import LogoCNC from "../../images/logo-cnc.png";
import { Link } from "react-router-dom";
import { AppBar, Container, Toolbar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useWindowDimensions from '../../styles/useWindowDimensions';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

import PowerBI from '../PowerBI';

const WORKSPACE_ID = '06697efb-6be7-4cb3-9ec0-498e9a7b717f';
const REPORT_ID = 'aafa02a1-9ee0-40ca-9810-f88bffc48ccf';

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
            width: 135
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

export default function Visor1MAICC(props) {
    const { theme, API_DEFAULT, setShowBackdrop, setAuth, clientUUID } = props;
    const [accessToken, setAccessToken] = props.accessToken;
    const [username, setUsername] = props.username;
    const classes = useStyles();
    const refPBI = useRef(null);
    const [pbiEmbed, setPbiEmbed] = useState({});

    const { width } = useWindowDimensions(refPBI, pbiEmbed);

    return (
        <React.Fragment>
            <AppBar position="static" style={{ background: "linear-gradient(to right, #024e97, #2674bb)" }}>
                <Toolbar>
                    <div className={classes.logoSpacing2}>
                        <a style={{ display: "contents" }} href={"https://www.centronacionaldeconsultoria.com/"}>
                            <img src={LogoCNC} alt="logo-cnc" className={classes.logo} />
                        </a>
                    </div>
                    <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 500 }}>
                        
                    </Typography>
                    <React.Fragment>
                        <Typography className={classes.username} style={{ fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic" }} variant='body1'>@{username.toLowerCase()}</Typography>
                        <IconButton style={{ marginRight: theme.spacing(1) }} component={Link} edge='start' color='inherit' to={`/client/${clientUUID}/home`}>
                            <HomeIcon />
                        </IconButton>
                        <IconButton edge='start' color='inherit' onClick={() => { localStorage.removeItem('token-MAICC'); localStorage.removeItem('auth-MAICC'); localStorage.removeItem('username-MAICC'); setAccessToken(''); setAuth(false); setUsername(''); }}>
                            <LogoutIcon />
                        </IconButton>
                    </React.Fragment>
                </Toolbar>
            </AppBar>
            <div style={{ marginTop: theme.spacing(2) }}>
                <Container maxWidth="xl">
                    <PowerBI pbi={[pbiEmbed, setPbiEmbed]} refPBI={refPBI} width={width} theme={theme} accessToken={accessToken} API_DEFAULT={API_DEFAULT} WORKSPACE_ID={WORKSPACE_ID} REPORT_ID={REPORT_ID} setShowBackdrop={setShowBackdrop} />
                </Container>
            </div>
        </React.Fragment>
    );
}