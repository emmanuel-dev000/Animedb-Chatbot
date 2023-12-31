import { Slide, Box, AppBar, Toolbar, IconButton, Typography, Button, TextField, FormGroup, Checkbox, FormControlLabel } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { DeleteAnimeById, EditAnimeById, GetAnimeImageDetailById } from "../../../hooks/HttpAnime";
import { ChatboxState } from "../../../types/enums";
import { AnimeImageDetail, AnimeRequest, AnimeResponse, Genre, Tag } from "../../../types/types";
import { Spacing } from "../Spacing";
import { UpdateTagListInAnimeById } from "../../../hooks/HttpTag";
import { UpdateGenreListInAnimeById } from "../../../hooks/HttpGenre";

interface EditFormProps {
    openEditForm: boolean; 
    anime: AnimeResponse;
    chatboxState: ChatboxState;
    handleCloseEditForm: () => void; 
    DisableSendButton: () => void; 
    onCloseEditForm: () => void; 
    onEditError: () => void; 
    onEditSuccess: (animeImageDetail: AnimeImageDetail) => void;
    onDeleteSuccess: (deleteMessage: string) => void; 
    setAnimeTitle: React.Dispatch<React.SetStateAction<string>>; 
    setAnimeStudio: React.Dispatch<React.SetStateAction<string>>; 
    setAnimeEpisodes: React.Dispatch<React.SetStateAction<number>>; 
    setAnimeDuration: React.Dispatch<React.SetStateAction<string>>; 
    setAnimeRating: React.Dispatch<React.SetStateAction<number>>; 
    setAnimeImageUrl: React.Dispatch<React.SetStateAction<string>>; 
    setAnimeJapaneseTitle: React.Dispatch<React.SetStateAction<string>>; 
    setAnimeJapaneseTitleHiragana: React.Dispatch<React.SetStateAction<string>>; 
    setAnimeDateAired: React.Dispatch<React.SetStateAction<string>>; 
    setAnimeDateFinished: React.Dispatch<React.SetStateAction<string>>; 
    setAnimeSynopsis: React.Dispatch<React.SetStateAction<string>>;
    setAnimeJapaneseSynopsis: React.Dispatch<React.SetStateAction<string>>;
    tagList: Array<Tag>; 
    selectedTagList: Array<Tag>; 
    setSelectedTagList: React.Dispatch<React.SetStateAction<Array<Tag>>>;
    genreList: Array<Genre>; 
    selectedGenreList: Array<Genre>; 
    setSelectedGenreList: React.Dispatch<React.SetStateAction<Array<Genre>>>;
}

export default function EditForm({ ...props } : EditFormProps) {    
    return (
        <Slide
            direction="up"
            in={props.openEditForm}
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
                { Header(props) }

                { Form(props) }
            </Box>
        </Slide>
    );
}

function Header({ ...props }: EditFormProps) {
    return <AppBar position="static">
        <Toolbar>
            <IconButton
                color="inherit"
                edge="start"
                onClick={() => {
                    props.handleCloseEditForm();
                    props.setSelectedTagList([]);
                    props.setSelectedGenreList([]);
                }}
            >
                <CloseSharpIcon />
            </IconButton>
            <Typography
                sx={{
                    marginLeft: 0.5,
                    flexGrow: 1,
                }}>
                {"Edit"}
            </Typography>
            <Button
                color="inherit"
                onClick={async () => {
                    props.DisableSendButton();

                    const anime: AnimeRequest = {
                        title: props.anime.title,
                        rating: props.anime.rating,
                        studio: props.anime.studio,
                        episodes: props.anime.episodes,
                        duration: props.anime.duration,
                        imageUrl: props.anime.imageUrl,
                        synopsis: props.anime.synopsis,

                        dateAired: props.anime.dateAired,
                        dateFinished: props.anime.dateFinished,

                        japaneseTitle: props.anime.japaneseTitle,
                        japaneseTitleHiragana: props.anime.japaneseTitleHiragana,
                        japaneseSynopsis: props.anime.japaneseSynopsis
                    };

                    if (props.chatboxState === ChatboxState.EDIT) {
                        const animeResponse = await EditAnimeById(props.anime.id, anime);
                        if (animeResponse == null) {
                            props.onEditError();
                            return;
                        }

                        const updateTagAnimeResponse = await UpdateTagListInAnimeById(props.anime.id, props.selectedTagList);
                        if (updateTagAnimeResponse == null) {
                            props.onEditError();
                            return;
                        }

                        const updateGenreAnimeResponse = await UpdateGenreListInAnimeById(props.anime.id, props.selectedGenreList);
                        if (updateGenreAnimeResponse == null) {
                            props.onEditError();
                            return;
                        }

                        const animeImageDetail = await GetAnimeImageDetailById(props.anime.id);
                        props.onEditSuccess(animeImageDetail);
                    }

                    props.setSelectedTagList([]);
                    props.setSelectedGenreList([]);
                    props.onCloseEditForm();
                    return;
                } }>
                Save
            </Button>
        </Toolbar>
    </AppBar>;
}

function Form({ ...props }: EditFormProps) {
    return <Box
        sx={{
            marginTop: 2,
            padding: 2,
            maxHeight: 650,
            overflowY: "scroll",
        }}>

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
            value={props.anime.title}
            onChange={e => props.setAnimeTitle(e.target.value)}
            sx={{
                marginY: 1,
            }} />
        <TextField
            label="Studio"
            variant="standard"
            fullWidth
            id="animeStudio"
            value={props.anime.studio}
            onChange={e => {
                props.setAnimeStudio(e.target.value);
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
            value={props.anime.episodes}
            onChange={e => {
                props.setAnimeEpisodes(Number.parseInt(e.target.value));
            } }
            sx={{
                marginY: 1,
            }} />
        <TextField
            label="Duration"
            variant="standard"
            fullWidth
            id="animeDuration"
            value={props.anime.duration}
            onChange={e => {
                props.setAnimeDuration(e.target.value);
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
            value={props.anime.rating}
            onChange={e => {
                props.setAnimeRating(Number.parseInt(e.target.value));
            } }
            sx={{
                marginY: 1,
            }} />
        <TextField
            label="Image URL"
            variant="standard"
            fullWidth
            id="animeImageUrl"
            value={props.anime.imageUrl}
            onChange={e => {
                props.setAnimeImageUrl(e.target.value);
            } }
            sx={{
                marginY: 1,
            }} />

        <Spacing />

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
            value={props.anime.japaneseTitle}
            onChange={e => {
                props.setAnimeJapaneseTitle(e.target.value);
            } }
            sx={{
                marginY: 1,
            }} />
        <TextField
            label="Japanese Title Hiragana"
            variant="standard"
            fullWidth
            id="animeJapaneseTitleHiragana"
            value={props.anime.japaneseTitleHiragana}
            onChange={e => {
                props.setAnimeJapaneseTitleHiragana(e.target.value);
            } }
            sx={{
                marginY: 1,
            }} />

        <Spacing />

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
            value={props.anime.dateAired}
            onChange={e => {
                props.setAnimeDateAired(e.target.value);
            } }
            sx={{
                marginY: 1,
            }} />
        <TextField
            label="Date Finished Airing"
            variant="standard"
            fullWidth
            id="animeDateFinished"
            value={props.anime.dateFinished}
            onChange={e => {
                props.setAnimeDateFinished(e.target.value);
            } }
            sx={{
                marginY: 1,
            }} />

        <Spacing />

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
            value={props.anime.synopsis}
            onChange={e => {
                props.setAnimeSynopsis(e.target.value);
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
            value={props.anime.japaneseSynopsis}
            onChange={e => {
                props.setAnimeJapaneseSynopsis(e.target.value);
            } }
            sx={{
                marginY: 1,
            }} />

        <Spacing />

        <Typography
            variant="button"
            display="block"
            gutterBottom>
            Tags
        </Typography>
        <FormGroup row>
        {
            props.tagList.map((tag) => {
                return (
                    tag && (
                        <FormControlLabel
                            key={ tag.id }
                            label={ tag.name } 
                            control={
                                <Checkbox 
                                    defaultChecked = { IsTagIncluded(props.anime.tagList, tag) }
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            props.selectedTagList.push(tag);
                                            props.setSelectedTagList(props.selectedTagList);
                                        }

                                        if (!e.target.checked) {
                                            const index = FindTagIndex(props.selectedTagList, tag);
                                            if (index === undefined) {
                                                alert("Undefined");
                                                return;
                                            }

                                            const REMOVE_ONE_ELEMENT_ONLY = 1;
                                            props.selectedTagList.splice(index, REMOVE_ONE_ELEMENT_ONLY);
                                            props.setSelectedTagList(props.selectedTagList);
                                        }
                                    }}
                                />
                            } 
                        />
                    )
                );
            })
        }
        </FormGroup>

        <Spacing />

        <Typography
            variant="button"
            display="block"
            gutterBottom>
            Genres
        </Typography>
        <FormGroup row>
        {
            props.genreList.map((genre) => {
                return (
                    <FormControlLabel
                        key={ genre.id }
                        label={ genre.name } 
                        control={
                            <Checkbox 
                                defaultChecked = { IsGenreIncluded(props.anime.genreList, genre) }
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        props.selectedGenreList.push(genre);
                                        props.setSelectedGenreList(props.selectedGenreList);
                                    }

                                    if (!e.target.checked) {
                                        const index = FindGenreIndex(props.selectedGenreList, genre);
                                        if (index === undefined) {
                                            alert("Undefined");
                                            return;
                                        }

                                        const REMOVE_ONE_ELEMENT_ONLY = 1;
                                        props.selectedGenreList.splice(index, REMOVE_ONE_ELEMENT_ONLY);
                                        props.setSelectedGenreList(props.selectedGenreList);
                                    }

                                    console.log(" ");
                                    console.log("------ UPDATED GENRES -----");
                                    console.log(" ");
                                    props.selectedGenreList.map(genre => {
                                        console.log(genre.id + " " + genre.name );
                                    });
                                    console.log(" ");
                                    console.log("------END-----");
                                    console.log(" ");
                                }}
                            />
                        } 
                    />
                );
            })
        }
        </FormGroup>

        <Typography
            variant="button"
            display="block"
            gutterBottom>
            Danger Zone
        </Typography>
        <Button
            variant="contained"
            color="error"
            fullWidth
            endIcon={ <DeleteForeverSharpIcon /> }
            onClick={async () => {
                const deleteMessage = await DeleteAnimeById(props.anime.id);
                if (deleteMessage) {
                    props.onDeleteSuccess(deleteMessage);
                }

                props.onCloseEditForm();
            }}>
                Delete
        </Button>
    </Box>;
}

function IsTagIncluded(tagList: Array<Tag>, tag: Tag) : boolean {
    for (let index = 0; index < tagList.length; index++) {
        const t = tagList[index];
        if (t.id === tag.id) {
            return true;
        }
    }

    return false;
}

function IsGenreIncluded(genreList: Array<Genre>, genre: Genre) : boolean {
    for (let index = 0; index < genreList.length; index++) {
        const g = genreList[index];
        if (g.id === genre.id) {
            return true;
        }
    }

    return false;
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