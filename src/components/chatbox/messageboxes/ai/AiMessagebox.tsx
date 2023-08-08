import { Card, CardHeader, CardContent, Typography, CardActions } from "@mui/material";
import { AvatarType } from "../../../../types/enums";
import AvatarEmoji from "../../ai/AvatarEmoji";

interface AiMessageboxProps {
    text: string;
    createdAt: string;
    avatarType: AvatarType;
}

export default function AiMessagebox({ ...props }: AiMessageboxProps) {
    return (
        <Card
            sx={{
                marginX: 2,
                marginY: 5,
                width: "250px",
                borderRadius: 0,
            }}>
            <CardHeader
                title="animedbchat"
                avatar={ <AvatarEmoji avatarType={ props.avatarType }/> }/>
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