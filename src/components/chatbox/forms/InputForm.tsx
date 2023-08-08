import { Slide, Box, AppBar, Toolbar, IconButton, Typography, Button, TextField } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { AddNewAnime } from "../../../hooks/HttpAnime";
import { ChatboxState } from "../../../types/enums";
import { AnimeRequest } from "../../../types/types";
import { Spacing } from "../Spacing";
import { useState } from "react";

interface InputFormProps {
    openInputForm: boolean;
    header: string;
    animeId: string;
    chatboxState: ChatboxState;
    onCloseButtonClicked: () => void;
    onSaveAnimeSuccess: () => void;
    onSaveStateAdd: () => void;
}

export default function InputForm({ ...props }: InputFormProps) {
    const [animeTitle, setAnimeTitle] = useState<string>("");
    const [animeRating, setAnimeRating] = useState<number>(0);
    const [animeStudio, setAnimeStudio] = useState<string>("");
    const [animeDuration, setAnimeDuration] = useState<string>("");
    const [animeEpisodes, setAnimeEpisodes] = useState<number>(0);
    const [animeSynopsis, setAnimeSynopsis] = useState<string>("");
    const [animeImageUrl, setAnimeImageUrl] = useState<string>("");
    
    const [animeDateAired, setAnimeDateAired] = useState<string>("");
    const [animeDateFinished, setAnimeDateFinished] = useState<string>("");

    const [animeJapaneseTitle, setAnimeJapaneseTitle] = useState<string>("");
    const [animeJapaneseTitleHiragana, setAnimeJapaneseTitleHiragana] = useState<string>("");
    const [animeJapaneseSynopsis, setAnimeJapaneseSynopsis] = useState<string>("");

    return (
        <Slide
            direction="up"
            in={props.openInputForm}
            mountOnEnter
            unmountOnExit>

            <Box
                sx={{
                    zIndex: 3,
                    width: 375,
                    height: 775,
                    backgroundColor: "aliceblue",
                    position: "fixed",
                }}
            >
                { 
                    Header(
                        props, 
                        animeTitle, 
                        animeRating, 
                        animeStudio, 
                        animeEpisodes, 
                        animeDuration, 
                        animeImageUrl, 
                        animeSynopsis, 
                        animeDateAired, 
                        animeDateFinished, 
                        animeJapaneseTitle, 
                        animeJapaneseTitleHiragana, 
                        animeJapaneseSynopsis
                    )
                }

                {
                    Form(
                        animeTitle, 
                        setAnimeTitle, 
                        animeStudio, 
                        setAnimeStudio, 
                        animeEpisodes, 
                        setAnimeEpisodes, 
                        animeDuration, 
                        setAnimeDuration, 
                        animeRating, 
                        setAnimeRating, 
                        animeImageUrl, 
                        setAnimeImageUrl, 
                        animeJapaneseTitle, 
                        setAnimeJapaneseTitle, 
                        animeJapaneseTitleHiragana, 
                        setAnimeJapaneseTitleHiragana, 
                        animeDateAired, 
                        setAnimeDateAired, 
                        animeDateFinished, 
                        setAnimeDateFinished, 
                        animeSynopsis, 
                        setAnimeSynopsis, 
                        animeJapaneseSynopsis, 
                        setAnimeJapaneseSynopsis
                    )}
            </Box>
        </Slide>
    );
}


function Header(props: { openInputForm: boolean; header: string; animeId: string; chatboxState: ChatboxState; onCloseButtonClicked: () => void; onSaveAnimeSuccess: () => void; onSaveStateAdd:  () => void; }, animeTitle: string, animeRating: number, animeStudio: string, animeEpisodes: number, animeDuration: string, animeImageUrl: string, animeSynopsis: string, animeDateAired: string, animeDateFinished: string, animeJapaneseTitle: string, animeJapaneseTitleHiragana: string, animeJapaneseSynopsis: string) {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={() => props.onCloseButtonClicked()}
                >
                    <CloseSharpIcon />
                </IconButton>
                <Typography
                    sx={{
                        marginLeft: 0.5,
                        flexGrow: 1,
                    }}>
                    { props.header }
                </Typography>
                <Button
                    color="inherit"
                    onClick={async () => {

                        const anime: AnimeRequest = {
                            title: animeTitle,
                            rating: animeRating,
                            studio: animeStudio,
                            episodes: animeEpisodes,
                            duration: animeDuration,
                            imageUrl: animeImageUrl,
                            synopsis: animeSynopsis,

                            dateAired: animeDateAired,
                            dateFinished: animeDateFinished,

                            japaneseTitle: animeJapaneseTitle,
                            japaneseTitleHiragana: animeJapaneseTitleHiragana,
                            japaneseSynopsis: animeJapaneseSynopsis
                        };
                        
                        if (props.chatboxState === ChatboxState.ADD) {
                            const animeResponse = await AddNewAnime(anime);
                            if (animeResponse == null) {
                                alert("Error");
                                return;
                            }

                            props.onSaveStateAdd();
                        }

                        props.onSaveAnimeSuccess();
                        return;
                    }}>
                    Save
                </Button>
            </Toolbar>
        </AppBar>
    );
}

function Form(
    animeTitle: string, 
    setAnimeTitle: React.Dispatch<React.SetStateAction<string>>, 
    animeStudio: string, 
    setAnimeStudio: React.Dispatch<React.SetStateAction<string>>,
    animeEpisodes: number, 
    setAnimeEpisodes: React.Dispatch<React.SetStateAction<number>>,
    animeDuration: string, 
    setAnimeDuration: React.Dispatch<React.SetStateAction<string>>,
    animeRating: number, 
    setAnimeRating: React.Dispatch<React.SetStateAction<number>>,
    animeImageUrl: string, 
    setAnimeImageUrl: React.Dispatch<React.SetStateAction<string>>,
    animeJapaneseTitle: string, 
    setAnimeJapaneseTitle: React.Dispatch<React.SetStateAction<string>>,
    animeJapaneseTitleHiragana: string, 
    setAnimeJapaneseTitleHiragana: React.Dispatch<React.SetStateAction<string>>,
    animeDateAired: string, 
    setAnimeDateAired: React.Dispatch<React.SetStateAction<string>>,
    animeDateFinished: string, 
    setAnimeDateFinished: React.Dispatch<React.SetStateAction<string>>,
    animeSynopsis: string, 
    setAnimeSynopsis: React.Dispatch<React.SetStateAction<string>>,
    animeJapaneseSynopsis: string, 
    setAnimeJapaneseSynopsis: React.Dispatch<React.SetStateAction<string>>
    ) {
    return <Box
        sx={{
            marginTop: 2,
            padding: 2,
            maxHeight: 650,
            overflowY: "scroll",
        }}>

        {/* BASIC DETAILS */}
        <Typography
            variant="button"
            display="block"
            gutterBottom>
            Basic Details
        </Typography>
        <TextField
            label="Title"
            variant="standard"
            autoFocus
            fullWidth
            id="animeTitle"
            value={animeTitle}
            onChange={e => setAnimeTitle(e.target.value)}
            sx={{
                marginY: 1,
            }} />
        <TextField
            label="Studio"
            variant="standard"
            fullWidth
            id="animeStudio"
            value={animeStudio}
            onChange={e => {
                setAnimeStudio(e.target.value);
            } }
            sx={{
                marginY: 1,
            }} />
        <TextField
            label="Episodes"
            type="number"
            variant="standard"
            fullWidth
            id="animeEpisodes"
            value={animeEpisodes}
            onChange={e => {
                setAnimeEpisodes(Number.parseInt(e.target.value));
            } }
            sx={{
                marginY: 1,
            }} />
        <TextField
            label="Duration"
            variant="standard"
            fullWidth
            id="animeDuration"
            value={animeDuration}
            onChange={e => {
                setAnimeDuration(e.target.value);
            } }
            sx={{
                marginY: 1,
            }} />
        <TextField
            label="Rating"
            type="number"
            variant="standard"
            fullWidth
            id="animeRating"
            value={animeRating}
            onChange={e => {
                setAnimeRating(Number.parseInt(e.target.value));
            } }
            sx={{
                marginY: 1,
            }} />
        <TextField
            label="Image URL"
            variant="standard"
            fullWidth
            id="animeImageUrl"
            value={animeImageUrl}
            onChange={e => {
                setAnimeImageUrl(e.target.value);
            } }
            sx={{
                marginY: 1,
            }} />

        <Spacing />

        {/* JAPANESE */}
        <Typography
            variant="button"
            display="block"
            gutterBottom>
            Japanese
        </Typography>
        <TextField
            label="Japanese Title"
            variant="standard"
            fullWidth
            id="animeJapaneseTitle"
            value={animeJapaneseTitle}
            onChange={e => {
                setAnimeJapaneseTitle(e.target.value);
            } }
            sx={{
                marginY: 1,
            }} />
        <TextField
            label="Japanese Title Hiragana"
            variant="standard"
            fullWidth
            id="animeJapaneseTitleHiragana"
            value={animeJapaneseTitleHiragana}
            onChange={e => {
                setAnimeJapaneseTitleHiragana(e.target.value);
            } }
            sx={{
                marginY: 1,
            }} />

        <Spacing />

        {/* DATE AIRED AND FINISHED */}
        <Typography
            variant="button"
            display="block"
            gutterBottom>
            Date Aired and Finished
        </Typography>
        <TextField
            label="Date Aired"
            variant="standard"
            fullWidth
            id="animeDateAired"
            value={animeDateAired}
            onChange={e => {
                setAnimeDateAired(e.target.value);
            } }
            sx={{
                marginY: 1,
            }} />
        <TextField
            label="Date Finished Airing"
            variant="standard"
            fullWidth
            id="animeDateFinished"
            value={animeDateFinished}
            onChange={e => {
                setAnimeDateFinished(e.target.value);
            } }
            sx={{
                marginY: 1,
            }} />

        <Spacing />

        {/* SYNOPSIS */}
        <Typography
            variant="button"
            display="block"
            gutterBottom>
            Synopsis
        </Typography>
        <TextField
            label="Synopsis"
            variant="standard"
            fullWidth
            multiline
            rows={3}
            id="animeSynopsis"
            value={animeSynopsis}
            onChange={e => {
                setAnimeSynopsis(e.target.value);
            } }
            sx={{
                marginY: 1,
            }} />
        <TextField
            label="Japanese Synopsis"
            variant="standard"
            fullWidth
            multiline
            rows={3}
            id="animeJapaneseSynopsis"
            value={animeJapaneseSynopsis}
            onChange={e => {
                setAnimeJapaneseSynopsis(e.target.value);
            } }
            sx={{
                marginY: 1,
            }} />
    </Box>;
}