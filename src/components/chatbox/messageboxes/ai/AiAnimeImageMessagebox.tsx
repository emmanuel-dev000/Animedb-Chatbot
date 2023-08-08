import { Card, CardHeader, CardActionArea, CardContent, CardMedia, Typography, CardActions, Box } from "@mui/material";
import { CHATBOT_NAME } from "../../ai/chatbotname";
import { useState } from "react";
import AvatarEmoji from "../../ai/AvatarEmoji";
import { AvatarType } from "../../../../types/enums";

interface AiAnimeImageMessageboxProps {
    title: string;
    imageUrl: string;
    createdAt: string;
    onAnimeImageClicked: () => Promise<void>;
}

export default function AiAnimeImageMessagebox({ ...props }: AiAnimeImageMessageboxProps) {
    const [mouseHover, setMouseHover] = useState<boolean>(false);
    
    return (
        <Card
            sx={{
                marginX: 2,
                marginY: 5,
                width: "250px",
                borderRadius: 0,
            }}>
            <CardHeader
                title= { CHATBOT_NAME }
                avatar={ <AvatarEmoji avatarType={AvatarType.HAPPY}/> }/>
            <CardActionArea
                onMouseEnter={() => {
                    setMouseHover(true);
                }}
                onMouseLeave={() => {
                    setMouseHover(false);
                }}
                onClick={async () => {
                    await props.onAnimeImageClicked();
                }}>
                <CardContent>
                    <CardMedia
                        component="img"
                        height="300"
                        image={ props.imageUrl }
                        alt={ props.title }
                    />
                    <center>
                        <Typography variant="subtitle2">
                            { props.title }
                        </Typography>
                    </center>
                </CardContent>
                <Box
                    sx={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "rgba(7, 90, 209, 0.3)",
                        opacity: mouseHover ? 1 : 0,
                        transition: "opacity 0.3s ease-in-out",
                    }}
                />
            </CardActionArea>
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