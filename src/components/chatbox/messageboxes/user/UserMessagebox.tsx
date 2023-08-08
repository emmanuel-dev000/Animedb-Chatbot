import { Card, CardHeader, Avatar, CardContent, Typography, CardActions } from "@mui/material";

interface UserMessageboxProps {
    text: string;
    createdAt: string;
}

export default function UserMessageBox({ ...props }: UserMessageboxProps) {
    return (
        <Card
            elevation={1}
            sx={{
                position: "relative",
                left: 100,
                width: "250px",
                borderRadius: 0,
                marginY: 5,
            }}>
            <CardHeader
                title="User"
                avatar={ <Avatar>U</Avatar> }/>
            <CardContent>
                <Typography
                    variant="subtitle1"
                    sx={{
                        wordWrap: "break-word",
                    }}
                >
                    { props.text }
                </Typography>
            </CardContent>
            <CardActions>
                <Typography
                    sx={{
                        color: "text.secondary",
                        fontSize: 14,
                    }}>
                    { props.createdAt }
                </Typography>
            </CardActions>
        </Card>
    );
}