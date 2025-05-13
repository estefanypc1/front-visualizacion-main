import { Box, Typography, Link } from "@mui/material";

export default function Copyright(props) {
    return (
        <Box mt={8} mb={3} style={{ marginLeft: props.ml }}>
            <Typography variant="body2" align="center" sx={{ color: "#616161" }}>
                {"Copyright © "}
                <Link variant="body2" color="inherit" underline="hover" href="https://www.centronacionaldeconsultoria.com/">
                    Centro Nacional de Consultoría (CNC)
                </Link>{" "}
                {new Date().getFullYear()}
            </Typography>
        </Box>
    );
}