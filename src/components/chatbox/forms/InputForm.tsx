import { Slide, Box, AppBar, Toolbar, IconButton, Typography, Button, TextField, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { AddNewAnime } from "../../../hooks/HttpAnime";
import { ChatboxState } from "../../../types/enums";
import { AnimeRequest, AnimeResponse, Genre, Tag } from "../../../types/types";
import { Spacing } from "../Spacing";
import { useEffect, useState } from "react";
import axios from "axios";
import { UpdateTagListInAnimeById } from "../../../hooks/HttpTag";
import { UpdateGenreListInAnimeById } from "../../../hooks/HttpGenre";

interface InputFormProps {
    openInputForm: boolean;
    header: string;
    chatboxState: ChatboxState;
    onCloseButtonClicked: () => void;
    onSaveAnimeSuccess: () => void;
    onSaveStateAdd: (anime: AnimeResponse) => void;
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
    
    const [tagList, setTagList] = useState<Array<Tag>>([]);
    const [selectedTagList, setSelectedTagList] = useState<Array<Tag>>([]);

    useEffect(() => {
        // axios.get("http://localhost:8080/api/v1/tags")
        axios.get("https://animedb-yksz.onrender.com/api/v1/tags")
            .then(res => {
                setTagList(res.data);
            });
    }, [tagList]);

    const [genreList, setGenreList] = useState<Array<Genre>>([]);
    const [selectedGenreList, setSelectedGenreList] = useState<Array<Genre>>([]);

    useEffect(() => {
        // axios.get("http://localhost:8080/api/v1/genres")
        axios.get("https://animedb-yksz.onrender.com/api/v1/genres")
            .then(res => {
                setGenreList(res.data);
            });
    }, [genreList]);
    
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
                        {
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
                            japaneseSynopsis: animeJapaneseSynopsis,
                        },
                        selectedTagList,
                        setSelectedTagList,
                        selectedGenreList,
                        setSelectedGenreList
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
                        setAnimeJapaneseSynopsis,
                        tagList,
                        selectedTagList,
                        setSelectedTagList,
                        genreList,
                        selectedGenreList,
                        setSelectedGenreList
                    )}
            </Box>
        </Slide>
    );
}


function Header(
    { ...props } : InputFormProps, 
    anime: AnimeRequest,
    selectedTagList: Array<Tag>,
    setSelectedTagList: React.Dispatch<React.SetStateAction<Array<Tag>>>,
    selectedGenreList: Array<Genre>,
    setSelectedGenreList: React.Dispatch<React.SetStateAction<Array<Genre>>>,
    ) {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={() => {
                        props.onCloseButtonClicked();
                        setSelectedTagList([]);
                        setSelectedGenreList([]);
                    }}
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
                        if (props.chatboxState === ChatboxState.ADD) {
                            const animeResponse = await AddNewAnime(anime);
                            if (animeResponse == null) {
                                alert("Error");
                                return;
                            }

                            const tagListAddResponse = await UpdateTagListInAnimeById(animeResponse.id, selectedTagList);
                            if (tagListAddResponse == null) {
                                alert("Error");
                                return;
                            }

                            const genreListAddResponse = await UpdateGenreListInAnimeById(animeResponse.id, selectedGenreList);
                            if (genreListAddResponse == null) {
                                alert("Error");
                                return;
                            }

                            props.onSaveStateAdd(genreListAddResponse);
                        }

                        props.onSaveAnimeSuccess();
                        setSelectedTagList([]);
                        setSelectedGenreList([]);
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
    setAnimeJapaneseSynopsis: React.Dispatch<React.SetStateAction<string>>,
    tagList: Array<Tag>,
    selectedTagList: Array<Tag>,
    setSelectedTagList: React.Dispatch<React.SetStateAction<Array<Tag>>>,
    genreList: Array<Genre>,
    selectedGenreList: Array<Genre>,
    setSelectedGenreList: React.Dispatch<React.SetStateAction<Array<Genre>>>,
    ) {
    return (
        <Box
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

                <Spacing />

                {/* TAGS */}
                <Typography
                    variant="button"
                    display="block"
                    gutterBottom>
                    Tags
                </Typography>
                <FormGroup row>
                {
                    tagList.map((tag) => {
                        return (
                            tag && (
                                <FormControlLabel
                                key={ tag.id }
                                    label={ tag.name } 
                                    control={
                                        <Checkbox 
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    selectedTagList.push(tag);
                                                    setSelectedTagList(selectedTagList);
                                                }

                                                if (!e.target.checked) {
                                                    const index = FindTagIndex(selectedTagList, tag);
                                                    if (index === undefined) {
                                                        alert("Undefined");
                                                        return;
                                                    }

                                                    const REMOVE_ONE_ELEMENT_ONLY = 1;
                                                    selectedTagList.splice(index, REMOVE_ONE_ELEMENT_ONLY);
                                                    setSelectedTagList(selectedTagList);
                                                }

                                                console.log("------UPDATED-----");
                                                console.log(" ");
                                                selectedTagList.map(tag => {
                                                    console.log(tag.id + " " + tag.name );
                                                });
                                                console.log(" ");
                                                console.log("------END-----");
                                            }}
                                        />
                                    } 
                                />
                            )
                        );
                    })
                }
                </FormGroup>
                {/* GENRES */}
                <Typography
                    variant="button"
                    display="block"
                    gutterBottom>
                    Genres
                </Typography>
                <FormGroup row>
                {
                    genreList.map((genre) => {
                        return (
                            genre && (
                                <FormControlLabel
                                    key={ genre.id }
                                    label={ genre.name } 
                                    control={
                                        <Checkbox 
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    selectedGenreList.push(genre);
                                                    setSelectedGenreList(selectedGenreList);
                                                }

                                                if (!e.target.checked) {
                                                    const index = FindGenreIndex(selectedGenreList, genre);
                                                    if (index === undefined) {
                                                        alert("Undefined");
                                                        return;
                                                    }

                                                    const REMOVE_ONE_ELEMENT_ONLY = 1;
                                                    selectedGenreList.splice(index, REMOVE_ONE_ELEMENT_ONLY);
                                                    setSelectedGenreList(selectedGenreList);
                                                }

                                                console.log("------UPDATED-----");
                                                console.log(" ");
                                                selectedGenreList.map(genre => {
                                                    console.log(genre.id + " " + genre.name );
                                                });
                                                console.log(" ");
                                                console.log("------END-----");
                                            }}
                                        />
                                    } 
                                />
                            )
                        );
                    })
                }
                </FormGroup>
        </Box>
    );
}

function FindTagIndex(tagList: Array<Tag>, tag: Tag) : number | undefined {
    for (let index = 0; index < tagList.length; index++) {
        const t = tagList[index];
        if (t.id === tag.id) {
            return index;
        }
    }

    return undefined;
}

function FindGenreIndex(genreList: Array<Genre>, genre: Genre) : number | undefined {
    for (let index = 0; index < genreList.length; index++) {
        const g = genreList[index];
        if (g.id === genre.id) {
            return index;
        }
    }

    return undefined;
}