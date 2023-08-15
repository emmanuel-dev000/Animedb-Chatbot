import { Card, CardHeader, CardContent, Typography, Button, CardActions } from "@mui/material";
import { AvatarType } from "../../../../types/enums";
import AvatarEmoji from "../../ai/AvatarEmoji";
import { CHATBOT_NAME } from "../../ai/chatbotname";
import { OPEN_TAGS_DB } from "../../ai/messages";

interface Props {
    createdAt: string;
    onOpenButtonClicked: () => void;
}

export default function AiRequestTagDatabaseToMessageList({ ...props } : Props) {
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
                    <AvatarEmoji avatarType={ AvatarType.DEFAULT }/>
                }/>
            <CardContent>
                <Typography
                    variant="subtitle1"
                    sx={{
                        wordWrap: "break-word",
                    }}>
                    { OPEN_TAGS_DB }
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => {
                        props.onOpenButtonClicked();
                    }}>
                    Open 💾
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