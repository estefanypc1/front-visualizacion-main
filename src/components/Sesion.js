import React, { useState, useRef } from "react";
import { Avatar, Typography, Button, Grid, TextField, Card, CardContent, InputAdornment, IconButton } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Sesion(props) {
    const inputRef = useRef();

    const { theme, validateSession } = props;
    const [errors, setErrors] = props.errors;
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const [isClick, setIsClick] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(0);

    return (
        <Card>
            <CardContent>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ marginBottom: theme.spacing(4) }}
                >
                    <Grid item>
                        <Avatar style={{ margin: theme.spacing(1), backgroundColor: "#B71C1C" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">Inicio de sesión</Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="column"
                    justify="center"
                >
                    <Grid item xs style={{ marginBottom: theme.spacing(2) }}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            label="Usuario"
                            autoFocus={true}
                            value={user}
                            onKeyPress={(e) => {
                                if (e.key === "Enter")
                                    validateSession(user, password);
                            }}
                            onChange={(e) => { setUser(e.target.value); errors[0] = false; setErrors([...errors]) }}
                            error={errors[0]}
                        />
                    </Grid>
                    <Grid item xs style={{ marginBottom: theme.spacing(4) }}>
                        <TextField
                            inputRef={inputRef}
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            size="small"
                            variant="outlined"
                            label="Contraseña"
                            value={password}
                            onKeyPress={(e) => {
                                if (e.key === "Enter")
                                    validateSession(user, password);
                            }}
                            onSelect={() => { if (isClick) { inputRef.current.selectionStart = cursorPosition; setIsClick(false) } }}
                            onChange={(e) => { setPassword(e.target.value); errors[1] = false; setErrors([...errors]) }}
                            error={errors[1]}
                            InputProps={{
                                endAdornment: (
                                    < InputAdornment position="end" >
                                        <IconButton
                                            size="small"
                                            onClick={() => setShowPassword(!showPassword)}
                                            onMouseDown={(event) => { event.preventDefault(); setCursorPosition(inputRef.current.selectionStart); setIsClick(document.activeElement === inputRef.current) }}
                                        >
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs>
                        <Button fullWidth={true} variant="contained" color="primary" onClick={() => validateSession(user, password)}>Iniciar sesión</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default Sesion;