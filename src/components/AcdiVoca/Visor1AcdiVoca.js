import React, { useState, useRef } from "react";
import LogoAcdiVoca from "../../images/logo-AcdiVoca.png";
import { Link } from "react-router-dom";
import { AppBar, Container, Toolbar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useWindowDimensions from '../../styles/useWindowDimensions';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

import PowerBI from '../PowerBI';

const WORKSPACE_ID = '5ef31171-e924-4157-b539-d714c2b0137d';
const REPORT_ID = '4be3b6ab-7ee4-43d3-a15c-b1131c9c48b7';

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
            width: 200
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

export default function Visor1AcdiVoca(props) {
    const { theme, API_DEFAULT, setShowBackdrop, setAuth, clientUUID } = props;
    const [accessToken, setAccessToken] = props.accessToken;
    const [username, setUsername] = props.username;
    const classes = useStyles();
    const refPBI = useRef(null);
    const [pbiEmbed, setPbiEmbed] = useState({});

    const { width } = useWindowDimensions(refPBI, pbiEmbed);

    return (
        <React.Fragment>
            <AppBar position="static" style={{ background: "linear-gradient(to right, #ededec, #f6f6f5)" }}>
                <Toolbar>
                    <div className={classes.logoSpacing}>
                        <a style={{ display: "contents" }} href={"https://www.acdivoca.org/"}>
                            <img src={LogoAcdiVoca} alt="logo-AcdiVoca" className={classes.logo2} />
                        </a>
                    </div>
                    <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 500, color:'#4c4c4c' }}>
                        
                    </Typography>
                    <React.Fragment>
                        <Typography className={classes.username} style={{ fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic", color: "gray" }} variant='body1'>@{username.toLowerCase()}</Typography>
                        <IconButton style={{ marginRight: theme.spacing(1) }} component={Link} edge='start' color='default' to={`/client/${clientUUID}/home`}>
                            <HomeIcon />
                        </IconButton>
                        <IconButton edge='start' color='default' onClick={() => { localStorage.removeItem('token-AcdiVoca'); localStorage.removeItem('auth-AcdiVoca'); localStorage.removeItem('username-AcdiVoca'); setAccessToken(''); setAuth(false); setUsername(''); }}>
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