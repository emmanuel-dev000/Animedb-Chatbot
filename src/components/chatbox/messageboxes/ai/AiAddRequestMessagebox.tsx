import { Card, CardHeader, CardContent, Typography, Button, CardActions } from "@mui/material";
import AvatarEmoji from "../../ai/AvatarEmoji";
import { AvatarType } from "../../../../types/enums";
import { CHATBOT_NAME } from "../../ai/chatbotname";
import { REQUEST_ADD_ANIME_MESSAGE } from "../../ai/messages";

interface AiAddRequestMessageboxProps {
    createdAt: string;
    onOpenButtonClicked: () => void;
}

export default function AddAnimeRequestMessagebox({ ...props } : AiAddRequestMessageboxProps) {
    return (
        <Card
            sx={{
                marginX: 2,
                marginY: 5,
                width: "250px",
                borderRadius: 0,
            }}>
            <CardHeader
                title={CHATBOT_NAME}
                avatar={ 
                    <AvatarEmoji avatarType={ AvatarType.NERD }/>
                }/>
            <CardContent>
                <Typography
                    variant="subtitle1"
                    sx={{
                        wordWrap: "break-word",
                    }}>
                    { REQUEST_ADD_ANIME_MESSAGE }
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => {
                        props.onOpenButtonClicked();
                    }}>
                    Open 📬
                </Button>
            </CardContent>
            <CardActions>
                <Typography
                    sx={{
                        color: "text.secondary",
                        fontSize: 14,
                    }}>
                    {props.createdAt}
                </Typography>
            </CardActions>
        </Card>
    );
}