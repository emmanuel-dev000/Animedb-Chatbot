import { Paper, Typography } from "@mui/material";
import { CHATBOT_NAME } from "./ai/chatbotname";

export default function Header() {
    return(
        <Paper
            elevation={2}
            sx={{
                borderRadius: 0,
                position: "absolute",
                top: 0,
                width: "100%",
                height: "50px",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Typography
                variant="h5"
                component="h6"
                color="GrayText"
                sx={{
                    marginLeft: 2,
                    marginY: 0.5,
                }}>
                😉 { CHATBOT_NAME }
            </Typography>
        </Paper>
    );
}