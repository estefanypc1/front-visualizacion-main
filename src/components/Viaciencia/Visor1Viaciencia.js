import React, { useState, useRef } from "react";
import LogoCNC from "../../images/logo-cnc-2.png";
import LogoViaciencia from "../../images/logo-viaciencia.png";
import { Link } from "react-router-dom";
import { AppBar, Container, Toolbar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useWindowDimensions from '../../styles/useWindowDimensions';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

import PowerBI from '../PowerBI';

const WORKSPACE_ID = '27ac2378-65e1-4d46-9e78-a8a9817d7805';
const REPORT_ID = 'c518e901-be83-4afd-8bb5-805a5b374079';

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

export default function Visor1Viaciencia(props) {
    const { theme, API_DEFAULT, setShowBackdrop, setAuth, clientUUID } = props;
    const [accessToken, setAccessToken] = props.accessToken;
    const [username, setUsername] = props.username;
    const classes = useStyles();
    const refPBI = useRef(null);
    const [pbiEmbed, setPbiEmbed] = useState({});

    const { width } = useWindowDimensions(refPBI, pbiEmbed);


    return (
        <React.Fragment>
            <AppBar position="static" style={{ background: "#e6e6e6" }}>
                <Toolbar>
                    <div className={classes.logoSpacing}>
                        <a style={{ display: "contents" }} href={"https://www.centronacionaldeconsultoria.com/"}>
                            <img src={LogoCNC} alt="logo-cnc" className={classes.logo} />
                        </a>
                    </div>
                    <div className={classes.logoSpacing2}>
                        <a style={{ display: "contents" }} href={"https://www.centronacionaldeconsultoria.com/"}>
                            <img src={LogoViaciencia} alt="logo-viaciencia" className={classes.logo} />
                        </a>
                    </div>
                    <Typography variant="h5" style={{ color: "black", flexGrow: 1, fontWeight: 500 }}>
                        
                    </Typography>
                    <React.Fragment>
                        <Typography className={classes.username} style={{ color: 'black', fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic" }} variant='body1'>@{username.toLowerCase()}</Typography>
                        <IconButton style={{ marginRight: theme.spacing(1) }} component={Link} edge='start' color='default' to={`/client/${clientUUID}/home`}>
                            <HomeIcon />
                        </IconButton>
                        <IconButton edge='start' color='default' onClick={() => { localStorage.removeItem('token-viaciencia'); localStorage.removeItem('auth-viaciencia'); localStorage.removeItem('username-viaciencia'); setAccessToken(''); setAuth(false); setUsername(''); }}>
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

