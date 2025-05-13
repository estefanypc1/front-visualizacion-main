import React, { useState, useRef, useEffect } from "react";
import LogoCNC from "../../images/logo-cnc-rcn.png";
import { Link } from "react-router-dom";
import { AppBar, Container, Toolbar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useWindowDimensions from '../../styles/useWindowDimensions';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import PowerBI from '../PowerBI';

import ReportStyle from '../../styles/Report.module.css'

import Promise from 'bluebird';
import JsZip from 'jszip';
import FileSaver from 'file-saver';

const WORKSPACE_ID = 'fc403559-ce56-4846-9c8b-dc918ff7c60f';
const REPORT_ID = '850ea0af-0efe-4f01-bade-1479ee339c80';

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

export default function Visor1Rcn_radio(props) {
    const { theme, API_DEFAULT, setShowBackdrop, setMessage, setSeverity, setSnack, setAuth, clientUUID } = props;
    const [accessToken, setAccessToken] = props.accessToken;
    const [username, setUsername] = props.username;
    const classes = useStyles();
    const refPBI = useRef(null);
    const [pbiEmbed, setPbiEmbed] = useState({});

    const { width } = useWindowDimensions(refPBI, pbiEmbed);

    const [dataReports, setDataReports] = useState([])
    const [groupDays, setGroupDays] = useState([])
    const [click, setClick] = useState(true)

    const monthsAvailable = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

    const getReports = async (access) => {
        const res = await fetch(
            `${API_DEFAULT}/claro/reportes-streaming`, {
            headers: {
                "Authorization": "Token " + access
            }
        }
        )

        res.json().then(
            async data => {
                setDataReports(data)
            }
        )
    }

    useEffect(() => {
        getReports(accessToken)
    }, []);


    // Función para ordenar los reportes por fecha y nombre.
    const sortReports = (reports) => {
        return reports.sort((a, b) => {
            const firstDate = new Date(a.fecha_reporte);
            const secondDate = new Date(b.fecha_reporte);

            if (firstDate.getTime() === secondDate.getTime()) {
                const firstDocument = a.documento.split("/").slice(-1)[0];
                const secondDocument = b.documento.split("/").slice(-1)[0];
                return firstDocument.localeCompare(secondDocument);
            }

            return firstDate.getTime() - secondDate.getTime();
        });
    };

    const groupReports = (reports) => {
        const groups = reports.reduce((groups, report) => {
            const year = new Date(report.fecha_reporte + 'T00:00:00').getFullYear();
            if (!groups[year]) {
                groups[year] = [];
            }
            groups[year].push(report);
            return groups;
        }, {});

        const groupArrays = Object.keys(groups).map((year) => {
            return {
                year,
                reports: groups[year]
            };
        });

        const groupedData = []
        groupArrays.map((element) => {
            const groupDaysByMonth = element['reports'].reduce((p, c) => {

                let x = new Date(c.fecha_reporte + 'T00:00:00')
                let m = x.getMonth()
                let y = x.getFullYear()

                let idx = p[0].indexOf(m);

                if (idx > -1) {

                    p[1][idx].days.push(({
                        fecha_reporte: c.fecha_reporte,
                        documento: c.documento
                    }));

                } else {

                    p[0].push(m);

                    let tmp = {
                        month: m,
                        year: y,
                        days: [{
                            fecha_reporte: c.fecha_reporte,
                            documento: c.documento
                        },],
                    }

                    p[1].push(tmp);

                }

                return p;
            }, [[], []])[1]; // -->  Para el resultado nos interesa solo segundo elemento
            groupedData.push(groupDaysByMonth)
        })
        return groupedData
    }

    const sortReportsAllOrganizations = () => {
        const sortedReports = sortReports(dataReports)
        setDataReports(sortedReports)
    }

    const groupReportsByYearAndMonthAllOrganizations = () => {
        const groupedData = groupReports(dataReports)
        setGroupDays(groupedData)
    }

    const loadReports = () => {
        if (dataReports.length > 0) {
            sortReportsAllOrganizations();
            groupReportsByYearAndMonthAllOrganizations()
            setTimeout(() => addClick(), 0);
        }
    }

    const addClick = () => {
        if (click) {
            const groupMonths = [...document.getElementsByClassName(ReportStyle["layer-month-container"])]
            const groupDays = document.getElementsByClassName(ReportStyle["report-days-container"])
            const monthArrowIcon = document.getElementsByClassName(ReportStyle["month-arrow-icon"])

            const organizationName = [...document.getElementsByClassName(ReportStyle["name-container"])]
            const groupOrganization = [...document.getElementsByClassName(ReportStyle["report-group-container"])]
            const organizationArrowIcon = document.getElementsByClassName(ReportStyle["organization-arrow-icon"])

            if (dataReports.length > 0) {
                groupOrganization.map((group) => {
                    group.style.height = 'auto'
                })
            }
            organizationName.map((org, i) => {
                org.addEventListener('click', function () {
                    groupOrganization[i].classList.toggle(ReportStyle["active"])
                    organizationName[i].classList.toggle(ReportStyle["active"])
                    organizationArrowIcon[i].classList.toggle(ReportStyle["icon-rotate"])
                })
            })

            groupMonths.map((group, i) => {
                group.addEventListener('click', function () {
                    groupDays[i].classList.toggle(ReportStyle["active"])
                    monthArrowIcon[i].classList.toggle(ReportStyle["icon-rotate"])
                })
            })

            setClick(false)

        }
    }

    const reports = []
    const paintReports = groupDays.length > 0 ? groupDays.map((element) => {
        reports.push(element.map((r) => {
            return (
                <div className={ReportStyle["report-group-container"]}>

                    <div className={ReportStyle["report-month-container"]}>
                        <div className={ReportStyle["layer-month-container"]}></div>
                        <input type="checkbox" id={r.month + '' + r.year} /* onClick={selectCheckbox} */ name="checkbox"></input>
                        <label for={r.month + '' + r.year}> {`${monthsAvailable[r.month]} ${r.year}`} </label>
                        <div className={ReportStyle["month-arrow-icon"]} >
                            <ExpandMoreIcon style={{ fontSize: 32 }} />
                        </div>
                    </div>

                    <div className={ReportStyle["report-days-container"]}>
                        {r.days.map((d) => {
                            return (
                                <div className={ReportStyle["report-days-group"]}>
                                    <input type="checkbox" id={d.documento.split("/").slice(-1)[0]} value={d.documento} className="input-report" /* onClick={toggleCheckBoxDay} */ name="checkbox"></input>
                                    <label for={d.documento.split("/").slice(-1)[0]}>{d.documento.split("/").slice(-1)[0]}</label>
                                </div>
                            )
                        })}
                    </div>

                </div>
            )

        }))
    }) : null

    const showReport = () => {
        loadReports();
        const report = document.getElementById('report')
        report.classList.remove(ReportStyle["hide-report"])
        report.classList.toggle(ReportStyle["show-report"])
    }

    const hideReport = () => {
        const report = document.getElementById('report')
        report.classList.remove(ReportStyle["hide-report"])
        report.classList.toggle(ReportStyle["show-report"])
        hideReportAccordion();

        const checkboxes = [...document.getElementsByName("checkbox")]
        checkboxes.map((c) => {
            c.checked = false
        })
    }

    const hideReportAccordion = () => {
        const content = document.getElementsByClassName(ReportStyle["report-days-container"])
        for (let i = 0; i < content.length; i++) {
            content[i].classList.remove(ReportStyle['active'])
        }

        const icon = [...document.getElementsByName("chevron-down-outline")]
        icon.map((i) => {
            i.classList.remove(ReportStyle['icon-rotate'])
        })
    }

    let checked = []
    const downloadReports = () => {
        let inputs = document.getElementsByClassName("input-report")

        for (let i = 0; i < inputs.length; i++) {

            if (inputs[i].checked === true) {
                checked.push(inputs[i].value)
            }
        }
    }

    const download = url => {
        return fetch(url).then(resp => resp.blob());
    };

    const downloadByGroup = (urls, files_per_group = 5) => {
        return Promise.map(
            urls,
            async url => {
                return await download(url);
            },
            { concurrency: files_per_group }
        );
    }

    const exportZip = blobs => {
        const zip = JsZip();
        blobs.forEach((blob, i) => {
            zip.file(`${checked[i].split("/").slice(-1)[0]}`, blob);
        });
        zip.generateAsync({ type: 'blob' }).then(zipFile => {
            const fileName = `Reportes.zip`;
            return FileSaver.saveAs(zipFile, fileName);
        });
    }

    const downloadAndZip = urls => {
        setShowBackdrop(true);
        downloadReports();
        if (checked.length === 0) {
            setShowBackdrop(false);
            setMessage("Debe seleccionar al menos un reporte");
            setSeverity("error");
            setTimeout(() => { setSnack(true) }, 0);
        }
        else if (checked.length === 1) {
            downloadOneFile(checked)
        } else {
            return downloadByGroup(urls, 5).then(exportZip).then(cleanURL);
        }
    }

    const downloadOneFile = file => {
        let element = document.createElement('a');
        element.setAttribute('href', file)
        element.setAttribute('download', file);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        cleanURL()
    }

    const cleanURL = () => {
        checked = []
        setShowBackdrop(false);
    }

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
                        Reporte RCN Radio
                    </Typography>
                    <React.Fragment>
                        <Typography className={classes.username} style={{ fontSize: 14, fontWeight: 500, marginRight: theme.spacing(2), fontStyle: "italic" }} variant='body1'>@{username.toLowerCase()}</Typography>
                        <IconButton style={{ marginRight: theme.spacing(1) }} edge='start' color='inherit' onClick={() => showReport()} >
                            <CloudDownloadIcon />
                        </IconButton>
                        <IconButton style={{ marginRight: theme.spacing(1) }} component={Link} edge='start' color='inherit' to={`/client/${clientUUID}/home`}>
                            <HomeIcon />
                        </IconButton>
                        <IconButton edge='start' color='inherit' onClick={() => { localStorage.removeItem('token-Rcn_radio'); localStorage.removeItem('auth-Rcn_radio'); localStorage.removeItem('username-Rcn_radio'); setAccessToken(''); setAuth(false); setUsername(''); }}>
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

            <div className={ReportStyle["report"]} id="report">
                <div className={ReportStyle["layer-hide-menu"]} onClick={() => hideReport()}></div>
                <div className={ReportStyle["report-container"]} id="report-container">
                    <div className={ReportStyle["report-header"]}>
                        <h2>Seleccione el reporte que desea descargar</h2>
                    </div>
                    <div className={ReportStyle["reports-container-scroll"]}>
                        {reports.length > 0 ? reports : paintReports}
                    </div>

                    <div className={ReportStyle["report-button-container"]}>
                        <button className={ReportStyle["report-button-cancel"]} onClick={() => hideReport()}>CANCELAR</button>
                        <button id="btnDownload" className={ReportStyle["report-button-download"]} onClick={() => downloadAndZip(checked)}>DESCARGAR</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}