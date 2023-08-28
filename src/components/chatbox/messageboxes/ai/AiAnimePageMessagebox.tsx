import { Card, CardHeader, CardContent, Typography, Pagination, CardActions } from "@mui/material";
import { CHATBOT_NAME } from "../../ai/chatbotname";
import axios from "axios";
import { useState, useEffect } from "react";
import { AnimePage, AnimeResponse } from "../../../../types/types";
import { GetAnimeById } from "../../../../hooks/HttpAnime";
import AvatarEmoji from "../../ai/AvatarEmoji";
import { AvatarType } from "../../../../types/enums";
import { LIST_RETRIEVE_SUCCESS_MESSAGE } from "../../ai/messages";

type SetAnimeInputs = (anime: AnimeResponse) => void;

interface AiAnimePageMessageboxProps {
    createdAt: string;
    setAnimeInputs: SetAnimeInputs;
    handleOpenViewForm: () => void;
}

export default function AiAnimePageMessagebox({ ...props }: AiAnimePageMessageboxProps) {
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [animePage, setAnimePage] = useState<AnimePage>();
    const DEFAULT_PAGE_SIZE = 5;
    useEffect(() => {
        // axios.get(`http://localhost:8080/api/v1/anime/?pageNumber=${ pageNumber }&pageSize=${ DEFAULT_PAGE_SIZE }`)
        axios.get(`https://animedb-yksz.onrender.com/api/v1/anime/?pageNumber=${ pageNumber }&pageSize=${ DEFAULT_PAGE_SIZE }`)
            .then(res => {
                setAnimePage(res.data);
            })
            .catch(err => alert(err));
    }, [pageNumber]);
    
    return (
        <Card
            sx={{
                marginX: 2,
                marginY: 5,
                width: "250px",
                borderRadius: 0,
            }}>
            <CardHeader
                title={ CHATBOT_NAME }
                avatar={ <AvatarEmoji avatarType={AvatarType.HAPPY}/> }/>
            <CardContent>
                <Typography variant="subtitle1">
                    { LIST_RETRIEVE_SUCCESS_MESSAGE }
                    <ol>
                        {
                            animePage?.animeContentList.map(anime => {
                                return(
                                    <li key={anime.id}>
                                        <Typography
                                            component="span" // IMPORTANT!
                                            sx={{
                                                color: "Highlight",
                                                cursor: "pointer",
                                                "&:hover": {
                                                    textDecoration: "underline",
                                                }
                                            }}
                                            onClick={ async () => {
                                                const animeFullDetails = await GetAnimeById(anime.id); 
                                                props.setAnimeInputs(animeFullDetails);
                                                props.handleOpenViewForm();
                                            }}>
                                            { anime.title }
                                        </Typography>
                                    </li>
                                );
                            })
                        }
                    </ol>
                </Typography>
                <Pagination
                    color="primary"
                    count={ animePage?.totalPages }
                    hidePrevButton={true}
                    hideNextButton={true}
                    onChange={(e, page) => {
                        console.log(e.cancelable); // To avoid linting error: Unused Variable.
                        setPageNumber(page - 1);
                    }}
                />
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