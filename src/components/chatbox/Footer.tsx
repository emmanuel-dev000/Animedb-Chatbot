import { Typography } from "@mui/material";

export default function Footer() {
    return (
        <center>
            <Typography
                variant="body2"
                color="InactiveCaptionText"
                gutterBottom
                sx={{
                    fontSize: 14,
                }}>
                Made by Emmanuel Pangan (July 2023)
            </Typography>
        </center>
    );
}