import React, { useState } from "react";
import { Backdrop, CircularProgress, Snackbar, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Redirect, Switch, Route } from "react-router-dom";

import CCB from "./CCB/CCB";
import MinTIC from "./MinTIC/MinTIC";
import Corferias from "./Corferias/Corferias";
import Equans from "./Equans/Equans";
import Acueducto from "./Acueducto/Acueducto";
import Asobancaria from "./Asobancaria/Asobancaria";
import Cerrejon from "./Cerrejon/Cerrejon";
import Telemedellin from "./Telemedellin/Telemedellin";
import Politica from "./Politica/Politica";
import ICFES from "./ICFES/ICFES";
import Claro360 from "./Claro360/Claro360";
import Claro360User from "./Claro360Líderes/Claro360Lider";
import BancoRepublica from "./BancoRepublica/BancoRepublica";
import MiBanco from "./MiBanco/MiBanco";
import SDP from "./SDP/SDP";
import MutualSer from "./MutualSer/MutualSer";
import CNC from "./CNC/CNC";
import Coosalud from "./Coosalud/Coosalud";
import Construferia from "./Construferia/Construferia";
import Autonal from "./Autonal/Autonal";
import CCCE from "./CCCE/CCCE";
import VisualCNC from "./VisualCNC/VisualCNC";
import PMA from "./PMA/PMA";
import MinJusticia from "./MinJusticia/MinJusticia";
import AcdiVoca from "./AcdiVoca/AcdiVoca";
import Mundial from "./Mundial/Mundial";
import Caracol from "./Caracol/Caracol";
import Innpulsa from "./Innpulsa/Innpulsa";
import Rugby from "./Rugby/Rugby";
import Bcontactar from "./Bcontactar/Bcontactar";
import Viaciencia from "./Viaciencia/Viaciencia";
import Riopaila from "./Riopaila/Riopaila";
import Team from "./Team/Team";
import Viadata from "./Viadata/Viadata";
import SDM from "./SDM/SDM";
import Hocol from "./Hocol/Hocol";
import FNA from "./FNA/FNA";
import UCC from "./UCC/UCC";
import Radiopolis from "./Radiopolis/Radiopolis";
import VentasCNC from "./VentasCNC/VentasCNC"
import RutaN from "./RutaN/RutaN";
import JuntosAprendemos from "./JuntosAprendemos/JuntosAprendemos";
import ClaroNSU from "./ClaroNSU/ClaroNSU";
import Dentsu from "./Dentsu/Dentsu";
import Promigas from "./Promigas/Promigas";
import Comfandi from "./Comfandi/Comfandi";
import COP16 from "./COP16/COP16";
import MAICC from "./MAICC/MAICC";
import Atlantico from "./Atlantico/Atlantico";
import ColegioSJDLV from "./ColegioSJDLV/ColegioSJDLV";
import Fontic from "./Fontic/Fontic";
import Ecopetrol from "./Ecopetrol/Ecopetrol";
import CasaLegado from "./CasaLegado/CasaLegado";
import CLUA from "./CLUA/CLUA";
import ProPacifico from "./ProPacifico/ProPacifico";
import Streaming from "./Streaming/Streaming";
import IDG from "./IDG/IDG";
import OTTs from "./OTTs/OTTs";
import CNC_empresas from "./CNC_empresas/CNC_empresas";
import DNP from "./DNP/DNP";
import DNP2 from "./DNP2/DNP2";
import Blu_radio from './Blu_Radio/Blu_Radio';
import Copyright from "./Copyright";
import WarnerBrasil from "./WarnerBrasil/WarnerBrasil";
import Rcn_radio from "./Rcn_radio/Rcn_radio";
import Olimpica from "./Olimpica/Olimpica";
import ClaroOtts from "./ClaroOtts/ClaroOtts";
import RcnBluRadP from "./RcnBluRadP/RcnBluRadP";
import Prisa from "./Prisa/Prisa";
import CincoEmisoras from "./CincoEmisoras/CincoEmisoras";
import LaboratorioMedios from "./LaboratorioMedios/LaboratorioMedios";
import SecIntSocial from "./SecIntSocial/SecIntSocial";
import Previsora from "./Previsora/Previsora";
import AlcaldiaBog from "./AlcaldiaBog/AlcaldiaBog";

const API_DEFAULT = "https://back-visualizacion-service-q2nhgfzuoq-uc.a.run.app";

const WarnerBrasilUUID = "209837de-9acc-4c4c-b9ad-1b45a259dc95"
const CCBUUID = "7f636194-8ea1-488f-b446-65cc66f0570a"
const MinTICUUID = "818e8006-0cb4-4dec-9045-b42648fec2f0"
const CorferiasUUID = "238ace3c-62c1-477b-bf3b-f0bc121b27a4"
const EquansUUID = "fff2cd8a-d1f9-43be-8f61-1477a747d6d7"
const AcueductoUUID = "371a4e29-b5e0-4ffe-ac0e-af2d169c65cc"
const TelemedellinUUID = "2de02482-0935-4eab-b1c6-238e041401a9"
const PoliticaUUID = "c5c254e3-ece9-4369-85c7-019b6dad61ad"
const AsobancariaUUID = "4089aa69-ca15-4ba8-984e-30a7c880c0b4"
const CerrejonUUID = "c1756ddd-f7bb-4937-894f-5fb2b5ccfaf1"
const ICFESUUID = "e856fc40-8b2b-4cd5-962c-38db291c520e"
const Claro360UUID = "406592b6-aa94-4524-8145-6ed747f150fd"
const Claro360UserUUID = "bee57f6b-482f-4cc4-9d38-fcb971d8c06e"
const ClaroOttsUUID = "9fc737a6-4fe8-4dec-9e0c-d3c0db164f0f"

const BancoRepublicaUUID = "790088e5-2fa9-4711-8538-c31cfde8c0ca"
const MiBancoUUID = "569431a0-9999-4b83-b782-76031d790f5f"
const SDPUUID = "69e31143-6dcd-41ec-9d9b-a322bb8e1d42"
const MutualSerUUID = "5d200c49-dd1d-4af0-8547-2439ae57b1a6"
const CNCUUID = "864d55f5-f1ac-4452-8751-52488508a630"
const CoosaludUUID = "4a4ac389-e0e7-495a-a520-615df5bd679c"
const ConstruferiaUUID = "9ec99421-e497-46fd-b1f2-5dfab177cb79"
const AutonalUUID = "9ddacc88-7427-40ba-99c4-a2892b7bedc2"
const CCCEUUID = "975ec390-3ce6-40cb-972d-1d3e9e954d13"
const VisualCNCUUID = "44ba4e99-b27f-480d-b718-ae3388702cf3"
const PMAUUID = "331e6097-e156-4128-b427-2a3ad9e4002d"
const MinJusticiaUUID = "eb30d8de-200d-4e78-bafa-8b5be1f70828"
const AcdiVocaUUID = "6d801da6-c2ae-45dc-bf1c-ef4f30f26294"
const MundialUUID = "4f2e9460-163e-4a43-bf04-08734f9df67c"
const CaracolUUID = "b9ac8e05-9939-4b33-998e-e0f5bee17601"
const InnpulsaUUID = "4476ef16-127b-48ec-a811-c89a02409ec7"
const RugbyUUID = "cd68d9c5-9a64-4b1b-8356-88c4fe86067b"
const BcontactarUUID = "c6110f57-b430-4504-b998-241a10bb9933"
const ViacienciaUUID = "8bc99a24-1ade-4d05-b68a-5c22e3790df4"
const RiopailaUUID = "a66092cf-848b-4536-8180-128de1e185b0"
const TeamUUID = "c93da537-4c76-4553-9742-88f1c8eb0ae0"
const ViadataUUID = "e3e716c8-d6cc-4f26-acbd-dff00617d85d"
const SDMUUID = "87e140af-9002-43df-8864-f47740b64118"
const HocolUUID = "5e3bc31f-1fa9-46f1-8824-dc1c6ead2dae"
const FNAUUID = "46a9b3fd-7db1-4cfb-ae72-992a751029cd"
const UCCUUID = "a91f69d3-62b5-464a-9f16-402791d53da3"
const RadiopolisUUID = "f788972a-2432-43bf-bfa9-a8bf4e6de68b"
const VentasCNCUUID = "5f9d13a3-88a7-4732-a65c-e80d1dc06eba"
const RutaNUUID = "b50ad1ed-42ff-4bc0-bc99-ab55ba7273b2"
const JuntosAprendemosUUID = "858b808c-b7eb-4b1d-a3c8-24da7db717b1"
const ClaroNSUUUID = "b5c42aab-e22a-44c7-9304-19acefe643c6"
const DentsuUUID = "74ac11b3-f4fe-4b49-bf0f-2d150d42d094"
const PromigasUUID = "3c8225e3-5ec8-4503-b861-ef252ac11f06"
const ComfandiUUID = "fe0d923d-32f0-4132-9c4d-06050b97eb18"
const COP16UUID = "7e2e5d69-e35e-4403-9e7b-0d8d65e9e22e"
const MAICCUUID = "1c7c6389-984f-483c-872b-4a3a7d22e7a0"
const AtlanticoUUID = "d7134f99-99c8-4122-8d80-3588b1c87add"
const ColegioSJDLVUUID = "8b27910b-68cc-4aed-abad-43995b30b316"
const FonticUUID = "a9b9dfb3-708f-4239-944d-952819f2e264"
const EcopetrolUUID = "34977d17-012f-4f14-922f-8f2dfc6cdcf7"
const CasaLegadoUUID = "a581f468-8918-467d-bfbc-e243eaf034f1"
const CLUAUUID = "dbaaf0e0-9996-48a3-b4c6-8cac209feefc"
const ProPacificoUUID = "55ecba54-29a6-4fc2-85ba-438e661aa474"
const StreamingUUID = "63d35416-13da-4743-b79a-a721aac3290d"
const IDGUUID = "b63a9851-da84-47ae-b8cb-79af7667fb11"
const OTTsUUID = "bb14d399-93cd-4834-902a-b83119966404"
const CNC_empresasUUID = "6ac8461b-7e62-4a87-9492-8c8bc315bbf0"
const DNPUUID = "56fb07be-d12d-4526-95ac-6ab66ad9b57b"
const DNP2UUID = "1a134625-6f44-4804-a298-2ea764d86b57"
const Blu_radioUUID = "981f0bfa-485f-4fa5-9c0b-88b75255c13f"
const Rcn_radioUUID = "419715a1-63a8-4ad8-ba38-1150fb6c4e25"
const OlimpicaUUID = "8c2b33db-cca9-42c5-9d40-25fc02d88b32"
const RcnBluRadPUUID = "2e85a8af-b476-49de-a3ec-85dd75c5106b"
const PrisaUUID = "5d228327-70ea-49aa-ae82-8c399348b664"
const CincoEmisorasUUID = "02d1eb5f-425f-4bdc-80b6-a3ac6f53fdca"
const LaboratorioMediosUUID = "791f4b17-1e68-4840-afbe-08b5d5572718"
const SecIntSocialUUID = "17988c62-d54d-444a-9819-cd806253cfdc"
const PrevisoraUUID = "8d502da8-e169-43e7-abe4-481d15586c95"
const AlcaldiaBogUUID = "34a0163e-dacb-4942-9888-bf4c928210ca"

const useStyles = makeStyles((theme) => ({

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

export default function Main(props) {
    const { theme } = props;
    const classes = useStyles();

    const [mlCopyright, setMLCopyright] = useState(0);

    const [showBackdrop, setShowBackdrop] = useState(false);
    const [snack, setSnack] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');

    return (
        <React.Fragment>
            <Switch>
            <Route exact path="/" />
            {/* Previsora */}
            <Route path={`/client/${PrevisoraUUID}`} >
                    <Previsora
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={PrevisoraUUID}
                    />
                </Route>
            {/* AlcaldiaBog */}
            <Route path={`/client/${AlcaldiaBogUUID}`} >
                    <AlcaldiaBog
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={AlcaldiaBogUUID}
                    />
                </Route>
            {/* SecIntSocial */}
            <Route path={`/client/${SecIntSocialUUID}`} >
                    <SecIntSocial
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={SecIntSocialUUID}
                    />
                </Route>
            {/* LaboratorioMedios */}
            <Route path={`/client/${LaboratorioMediosUUID}`} >
                    <LaboratorioMedios
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={LaboratorioMediosUUID}
                    />
                </Route>
            {/* CincoEmisoras */}
                <Route path={`/client/${CincoEmisorasUUID}`} >
                    <CincoEmisoras
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={CincoEmisorasUUID}
                    />
                </Route>
                {/* Prisa */}
                <Route path={`/client/${PrisaUUID}`} >
                    <Prisa
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={PrisaUUID}
                    />
                </Route>
                {/* RcnBluRadP */}
                <Route path={`/client/${RcnBluRadPUUID}`} >
                    <RcnBluRadP
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={RcnBluRadPUUID}
                    />
                </Route>
                <Route exact path="/" />
                {/* WarnerBrasil */}
                <Route path={`/client/${WarnerBrasilUUID}`} >
                    <WarnerBrasil
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={WarnerBrasilUUID}
                    />
                </Route>
                {/* CCB */}
                <Route path={`/client/${CCBUUID}`} >
                    <CCB
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={CCBUUID}
                    />
                </Route>
                {/* MinTIC */}
                <Route path={`/client/${MinTICUUID}`} >
                    <MinTIC
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={MinTICUUID}
                    />
                
                </Route>
                <Route path={`/client/${ClaroOttsUUID}`} >
                    <ClaroOtts
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={ClaroOttsUUID}
                    />
                </Route>
                {/* Corferias */}
                <Route path={`/client/${CorferiasUUID}`} >
                    <Corferias
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={CorferiasUUID}
                        setMLCopyright={setMLCopyright}
                    />
                </Route>
                {/* Equans */}
                <Route path={`/client/${EquansUUID}`} >
                    <Equans
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={EquansUUID}
                    />
                </Route>
                {/* Acueducto */}
                <Route path={`/client/${AcueductoUUID}`} >
                    <Acueducto
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={AcueductoUUID}
                    />
                </Route>
                {/* Telemedellin */}
                <Route path={`/client/${TelemedellinUUID}`} >
                    <Telemedellin
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={TelemedellinUUID}
                    />
                </Route>
                {/* Politica */}
                <Route path={`/client/${PoliticaUUID}`} >
                    <Politica
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={PoliticaUUID}
                    />
                </Route>
                {/* Asobancaria */}
                <Route path={`/client/${AsobancariaUUID}`} >
                    <Asobancaria
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={AsobancariaUUID}
                    />
                </Route>
                {/* Cerrejon */}
                <Route path={`/client/${CerrejonUUID}`} >
                    <Cerrejon
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={CerrejonUUID}
                    />
                </Route>
                {/* ICFES */}
                <Route path={`/client/${ICFESUUID}`} >
                    <ICFES
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={ICFESUUID}
                    />
                </Route>
                {/* Claro 360 General */}
                <Route path={`/client/${Claro360UUID}`} >
                    <Claro360
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={Claro360UUID}
                    />
                </Route>
                {/* Claro 360 Usuario individual */}
                <Route path={`/client/${Claro360UserUUID}`} >
                    <Claro360User
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={Claro360UserUUID}
                    />
                </Route>
                {/* Banco de la República */}
                <Route path={`/client/${BancoRepublicaUUID}`} >
                    <BancoRepublica
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={BancoRepublicaUUID}
                    />
                </Route>
                {/* MiBanco */}
                <Route path={`/client/${MiBancoUUID}`} >
                    <MiBanco
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={MiBancoUUID}
                    />
                </Route>
                {/* SDP */}
                <Route path={`/client/${SDPUUID}`} >
                    <SDP
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={SDPUUID}
                    />
                </Route>
                {/* MutualSer */}
                <Route path={`/client/${MutualSerUUID}`} >
                    <MutualSer
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={MutualSerUUID}
                    />
                </Route>
                {/* CNC */}
                <Route path={`/client/${CNCUUID}`} >
                    <CNC
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={CNCUUID}
                    />
                </Route>
                {/* Coosalud */}
                <Route path={`/client/${CoosaludUUID}`} >
                    <Coosalud
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={CoosaludUUID}
                    />
                </Route>
                {/* Construferia */}
                <Route path={`/client/${ConstruferiaUUID}`} >
                    <Construferia
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={ConstruferiaUUID}
                    />
                </Route>
                {/* Autonal */}
                <Route path={`/client/${AutonalUUID}`} >
                    <Autonal
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={AutonalUUID}
                    />
                </Route>
                {/* CCCE */}
                <Route path={`/client/${CCCEUUID}`} >
                    <CCCE
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={CCCEUUID}
                    />
                </Route>
                {/* Visual CNC */}
                <Route path={`/client/${VisualCNCUUID}`} >
                    <VisualCNC
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={VisualCNCUUID}
                    />
                </Route>
                {/* PMA */}
                <Route path={`/client/${PMAUUID}`} >
                    <PMA
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={PMAUUID}
                    />
                </Route>
                {/* MinJusticia */}
                <Route path={`/client/${MinJusticiaUUID}`} >
                    <MinJusticia
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={MinJusticiaUUID}
                    />
                 </Route>
                {/* AcdiVoca */}
                <Route path={`/client/${AcdiVocaUUID}`} >
                    <AcdiVoca
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={AcdiVocaUUID}
                    />
                </Route>
                {/* Mundial */}
                <Route path={`/client/${MundialUUID}`} >
                    <Mundial
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={MundialUUID}
                    />
                </Route>
                {/* Caracol */}
                <Route path={`/client/${CaracolUUID}`} >
                    <Caracol
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={CaracolUUID}
                    />
                </Route>
                {/* Innpulsa */}
                <Route path={`/client/${InnpulsaUUID}`} >
                    <Innpulsa
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={InnpulsaUUID}
                    />
                </Route>
                {/* Rugby */}
                <Route path={`/client/${RugbyUUID}`} >
                    <Rugby
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={RugbyUUID}
                    />
                    </Route>
                {/* Bcontactar */}
                <Route path={`/client/${BcontactarUUID}`} >
                    <Bcontactar
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={BcontactarUUID}
                    />
                </Route>
                {/* Viaciencia */}
                <Route path={`/client/${ViacienciaUUID}`} >
                    <Viaciencia
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={ViacienciaUUID}
                    />
                </Route>
                {/* Riopaila */}
                <Route path={`/client/${RiopailaUUID}`} >
                    <Riopaila
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={RiopailaUUID}
                    />
                </Route>
                {/* Team */}
                <Route path={`/client/${TeamUUID}`} >
                    <Team
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={TeamUUID}
                    />
                </Route>
                {/* Viadata */}
                <Route path={`/client/${ViadataUUID}`} >
                    <Viadata
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={ViadataUUID}
                    />
                </Route>
                {/* SDM */}
                <Route path={`/client/${SDMUUID}`} >
                    <SDM
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={SDMUUID}
                    />
                </Route>
                {/* Hocol */}
                <Route path={`/client/${HocolUUID}`} >
                    <Hocol
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={HocolUUID}
                    />
                </Route>
                {/* FNA */}
                <Route path={`/client/${FNAUUID}`} >
                    <FNA
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={FNAUUID}
                    />
                    </Route>
                {/* UCC */}
                <Route path={`/client/${UCCUUID}`} >
                    <UCC
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={UCCUUID}
                    />
                </Route>
                {/* Radiopolis */}
                <Route path={`/client/${RadiopolisUUID}`} >
                    <Radiopolis
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={RadiopolisUUID}
                    />
                </Route>
                {/* VentasCNC */}
                <Route path={`/client/${VentasCNCUUID}`} >
                    <VentasCNC
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={VentasCNCUUID}
                    />
                </Route>
                {/* Ruta N */}
                <Route path={`/client/${RutaNUUID}`} >
                    <RutaN
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={RutaNUUID}
                    />
                </Route>
                {/* Juntos Aprendemos */}
                <Route path={`/client/${JuntosAprendemosUUID}`} >
                    <JuntosAprendemos
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={JuntosAprendemosUUID}
                    />
                </Route>
                {/* Claro NSU */}
                <Route path={`/client/${ClaroNSUUUID}`} >
                    <ClaroNSU
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={ClaroNSUUUID}
                    />
                </Route>
                {/* Dentsu */}
                <Route path={`/client/${DentsuUUID}`} >
                    <Dentsu
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={DentsuUUID}
                    />
                </Route>
                {/* Promigas */}
                <Route path={`/client/${PromigasUUID}`} >
                    <Promigas
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={PromigasUUID}
                    />
                </Route>
                {/* Comfandi */}
                <Route path={`/client/${ComfandiUUID}`} >
                    <Comfandi
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={ComfandiUUID}
                    />
                    </Route>
                {/* COP16 */}
                <Route path={`/client/${COP16UUID}`} >
                    <COP16
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={COP16UUID}
                    />
                </Route>
                {/* MAICC */}
                <Route path={`/client/${MAICCUUID}`} >
                    <MAICC
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={MAICCUUID}
                    />
                </Route>
                {/* Atlantico */}
                <Route path={`/client/${AtlanticoUUID}`} >
                    <Atlantico
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={AtlanticoUUID}
                    />
                </Route>
                {/* ColegioSJDLV */}
                  <Route path={`/client/${ColegioSJDLVUUID}`} >
                    <ColegioSJDLV
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={ColegioSJDLVUUID}
                    />
                </Route>
                {/* Fontic */}
                  <Route path={`/client/${FonticUUID}`} >
                    <Fontic
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={FonticUUID}
                    />
                </Route>
                {/* Ecopetrol */}
                  <Route path={`/client/${EcopetrolUUID}`} >
                    <Ecopetrol
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={EcopetrolUUID}
                    />
                </Route>
                {/* CasaLegado */}
                <Route path={`/client/${CasaLegadoUUID}`} >
                    <CasaLegado
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={CasaLegadoUUID}
                    />
                </Route>
                {/* CLUA */}
                <Route path={`/client/${CLUAUUID}`} >
                    <CLUA
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={CLUAUUID}
                    />
                </Route>
                {/* ProPacifico */}
                <Route path={`/client/${ProPacificoUUID}`} >
                    <ProPacifico
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={ProPacificoUUID}
                    />
                </Route>
                {/* Streaming */}
                <Route path={`/client/${StreamingUUID}`} >
                    <Streaming
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={StreamingUUID}
                    />
                </Route>
                {/* IDG */}
                <Route path={`/client/${IDGUUID}`} >
                    <IDG
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={IDGUUID}
                    />
                </Route>
                {/* OTTs */}
                <Route path={`/client/${OTTsUUID}`} >
                    <OTTs
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={OTTsUUID}
                    />
                </Route>
                {/* CNC_empresas */}
                <Route path={`/client/${CNC_empresasUUID}`} >
                    <CNC_empresas
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={CNC_empresasUUID}
                    />
                </Route>
                {/* DNP */}
                <Route path={`/client/${DNPUUID}`} >
                    <DNP
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={DNPUUID}
                    />
                </Route>
                {/* DNP2 */}
                <Route path={`/client/${DNP2UUID}`} >
                    <DNP2
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={DNP2UUID}
                    />
                </Route>
                {/* Blu_radio */}
                <Route path={`/client/${Blu_radioUUID}`} >
                    <Blu_radio
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={Blu_radioUUID}
                    />
                </Route>
                {/* Rcn_radio */}
                <Route path={`/client/${Rcn_radioUUID}`} >
                    <Rcn_radio
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={Rcn_radioUUID}
                    />
                </Route>
                {/* Olimpica */}
                <Route path={`/client/${OlimpicaUUID}`} >
                    <Olimpica
                        theme={theme}
                        API_DEFAULT={API_DEFAULT}
                        setShowBackdrop={setShowBackdrop}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setSnack={setSnack}
                        clientUUID={OlimpicaUUID}
                    />
                </Route>
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
            <Copyright ml={mlCopyright} />
            <Backdrop style={{ zIndex: 1301 }} className={classes.backdrop} open={showBackdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={snack}
                autoHideDuration={6000}
                onClose={() => setSnack(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={() => setSnack(false)} severity={severity} variant="filled">
                    {message}
                </Alert>
            </Snackbar>
        </React.Fragment >
    );
}