import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import MessageStack from "./MessageStack";
import { AnimeImageDetail, AnimeResponse, Genre, Tag } from "../../types/types";
import Header from "./Header";
import { Now } from "../../datetime/DateTime";
import { AvatarType, ChatboxState } from "../../types/enums";
import React from "react";
import { ANIME_ADDED_SUCCESS_MESSAGE, ANIME_DELETE_SUCCESS_MESSAGE, ANIME_UPDATED_SUCCESS_MESSAGE, EDIT_FORM_YESNO_MESSAGE, OPEN_GENRES_DB, OPEN_TAGS_DB, RandomApology } from "./ai/messages";
import RandomId from "./utilities/RandomId";
import ViewForm from "./forms/ViewForm";
import InputForm from "./forms/InputForm";
import { DeleteAnimeById, GetAnimeById, GetAnimeImageDetailById } from "../../hooks/HttpAnime";
import Input from "./input/Input";
import AddAnimeRequestMessagebox from "./messageboxes/ai/AiAddRequestMessagebox";
import AiAnimeImageMessagebox from "./messageboxes/ai/AiAnimeImageMessagebox";
import AiMessagebox from "./messageboxes/ai/AiMessagebox";
import UserMessageBox from "./messageboxes/user/UserMessagebox";
import AiAnimePageMessagebox from "./messageboxes/ai/AiAnimePageMessagebox";
import axios from "axios";
import EditForm from "./forms/EditForm";
import AiRequestOpenDatabaseToMessageList from "./messageboxes/ai/AiRequestTagDatabaseToMessageList";
import TagDbForm from "./forms/TagDbForm";
import GenreDbForm from "./forms/GenreDbForm";


export default function Chatbox() {
    const [input, setInput] = useState<string>("");
    const [inputLength, setInputLength] = useState<number>(0);
    const [messageList, setMessageList] = useState<Array<React.JSX.Element>>([]);
    const [isSendButtonDisabled, setSendButtonDisabled] = useState<boolean>(false);

    const [chatboxState, setChatboxState] = useState<ChatboxState>(ChatboxState.IDLE);
    const [openInputForm, setOpenInputForm] = useState<boolean>(false);
    const [openEditForm, setOpenEditForm] = useState<boolean>(false);
    const [openViewForm, setOpenViewForm] = useState<boolean>(false);
    const [openTagDbForm, setOpenTagDbForm] = useState<boolean>(false);
    const [openGenreDbForm, setOpenGenreDbForm] = useState<boolean>(false);
    
    const [animeId, setAnimeId] = useState<string>("");
    const [animeTitle, setAnimeTitle] = useState<string>("");
    const [animeRating, setAnimeRating] = useState<number>(0);
    const [animeStudio, setAnimeStudio] = useState<string>("");
    const [animeDuration, setAnimeDuration] = useState<string>("");
    const [animeEpisodes, setAnimeEpisodes] = useState<number>(0);
    const [animeSynopsis, setAnimeSynopsis] = useState<string>("");
    const [animeImageUrl, setAnimeImageUrl] = useState<string>("");
    
    const [animeDateAired, setAnimeDateAired] = useState<string>("");
    const [animeDateFinished, setAnimeDateFinished] = useState<string>("");

    const [animeTagList, setAnimeTagList] = useState<Array<Tag>>([]);
    const [animeGenreList, setAnimeGenreList] = useState<Array<Genre>>([]);
    
    const [animeJapaneseTitle, setAnimeJapaneseTitle] = useState<string>("");
    const [animeJapaneseTitleHiragana, setAnimeJapaneseTitleHiragana] = useState<string>("");
    const [animeJapaneseSynopsis, setAnimeJapaneseSynopsis] = useState<string>("");

    const [tagList, setTagList] = useState<Array<Tag>>([]);
    const [selectedTagList, setSelectedTagList] = useState<Array<Tag>>([]);

    const [genreList, setGenreList] = useState<Array<Genre>>([]);
    const [selectedGenreList, setSelectedGenreList] = useState<Array<Genre>>([]);

    useEffect(() => {
        if (animeId == null || animeId === "") return;
        // console.log(`http://localhost:8080/api/v1/anime/${ animeId }`);
        console.log(`https://animedb-yksz.onrender.com/api/v1/anime/${ animeId }`);
            // axios.get(`http://localhost:8080/api/v1/anime/${ animeId }`)
            axios.get(`https://animedb-yksz.onrender.com/api/v1/anime/${ animeId }`)
                .then(res => {
                    SetAnimeInputs(res.data)
                })
                .catch(err => alert(err));
    }, [animeId]);

    useEffect(() => {
        // console.log("http://localhost:8080/api/v1/tags");
        console.log("https://animedb-yksz.onrender.com/api/v1/tags");
        // axios.get("http://localhost:8080/api/v1/tags")
        axios.get("https://animedb-yksz.onrender.com/api/v1/tags")
            .then(res => {
                setTagList(res.data);
            });
    }, []);

    useEffect(() => {
        if (animeId == null || animeId === "") return;
        // console.log(`http://localhost:8080/api/v1/anime/${ animeId }/tags`);
        console.log(`https://animedb-yksz.onrender.com/api/v1/anime/${ animeId }/tags`);
            // axios.get(`http://localhost:8080/api/v1/anime/${ animeId }/tags`)
            axios.get(`https://animedb-yksz.onrender.com/api/v1/anime/${ animeId }/tags`)
                .then(res => {
                    setSelectedTagList(res.data);
                })
                .catch(err => alert(err));
    }, [animeId]);

    useEffect(() => {
        // console.log("http://localhost:8080/api/v1/genres");
        console.log("https://animedb-yksz.onrender.com/api/v1/genres");
        // axios.get("http://localhost:8080/api/v1/genres")
        axios.get("https://animedb-yksz.onrender.com/api/v1/genres")
            .then(res => {
                setGenreList(res.data);
            });
    }, []);

    useEffect(() => {
        if (animeId == null || animeId === "") return;
        // console.log(`http://localhost:8080/api/v1/anime/${ animeId }/genres`);
        console.log(`https://animedb-yksz.onrender.com/api/v1/anime/${ animeId }/genres`);
            // axios.get(`http://localhost:8080/api/v1/anime/${ animeId }/genres`)
            axios.get(`https://animedb-yksz.onrender.com/api/v1/anime/${ animeId }/genres`)
                .then(res => {
                    setSelectedGenreList(res.data);
                })
                .catch(err => alert(err));
    }, [animeId]);
        
    function EnableSendButton() {
        setSendButtonDisabled(false);
    }

    function DisableSendButton() {
        setSendButtonDisabled(true);
    }

    function ResetInput() {
        setInput("");
        setInputLength(0);
    }

    const handleOpenInputForm = () => {
        setOpenInputForm(true);
    }

    const handleCloseInputForm = () => {
        setOpenInputForm(false);
    }

    const handleOpenViewForm = () => {
        setOpenViewForm(true);
    }

    const handleCloseViewForm = () => {
        setOpenViewForm(false);
    }

    const handleOpenEditForm = () => {
        setOpenEditForm(true);
    }

    const handleCloseEditForm = () => {
        setOpenEditForm(false);
    }

    const handleOpenTagDbForm = () => {
        setOpenTagDbForm(true);
    }

    const handleCloseTagDbForm = () => {
        setOpenTagDbForm(false);
    }

    const handleOpenGenreDbForm = () => {
        setOpenGenreDbForm(true);
    }

    const handleCloseGenreDbForm = () => {
        setOpenGenreDbForm(false);
    }

    function AddMessageToList(message: React.JSX.Element) {
        const MAX_MESSAGEBOX_LENGTH = 10;
        if (messageList.length > MAX_MESSAGEBOX_LENGTH) {
            messageList.shift();
        }

        messageList.push(message);
        setMessageList(messageList);
    }

    function SetAnimeInputs(anime: AnimeResponse) {
        setAnimeId(anime.id);
        setAnimeTitle(anime.title);
        setAnimeStudio(anime.studio);
        setAnimeRating(anime.rating);
        setAnimeEpisodes(anime.episodes);
        setAnimeDuration(anime.duration);
        setAnimeImageUrl(anime.imageUrl);

        setAnimeGenreList(anime.genreList);
        setAnimeTagList(anime.tagList);

        setAnimeJapaneseTitle(anime.japaneseTitle);
        setAnimeJapaneseTitleHiragana(anime.japaneseTitleHiragana);
        
        setAnimeSynopsis(anime.synopsis);
        setAnimeJapaneseSynopsis(anime.japaneseSynopsis);

        setAnimeDateAired(anime.dateAired);
        setAnimeDateFinished(anime.dateFinished);
    }

    function ResetAnimeInputs() {
        setAnimeId("");
        setAnimeTitle("");
        setAnimeStudio("");
        setAnimeRating(0);
        setAnimeEpisodes(0);
        setAnimeDuration("");
        setAnimeImageUrl("");

        setAnimeJapaneseTitle("");
        setAnimeJapaneseTitleHiragana("");

        setAnimeGenreList([]);
        setAnimeTagList([]);
        
        setAnimeSynopsis("");
        setAnimeJapaneseSynopsis("");

        setAnimeDateAired("");
        setAnimeDateFinished("");
    }

    function AddAiMessageboxToMessageList(message: string, avatarType: AvatarType) {
        if (message === "")
            return;

        AddMessageToList(
            <AiMessagebox
                key={ "AiMessage" + RandomId() }
                createdAt={ Now() }
                text={ message }
                avatarType={ avatarType }/>
        );
    }

    function AddUserMessageboxToMessageList() {
        AddMessageToList(
            <UserMessageBox
                key={ "UserMessage" + RandomId() }
                createdAt={ Now() }
                text={ input }/>
        );
    }
    
    function AddAiAnimePageMessageboxToMessageList() {
        AddMessageToList(
            <AiAnimePageMessagebox
                key={ "AnimePage" + RandomId() }
                createdAt={Now()}
                handleOpenViewForm={handleOpenViewForm}
                setAnimeInputs={SetAnimeInputs}
            />
        );
    }
    
    function AddAiAnimeImageToMessageList(animeImage: AnimeImageDetail) {
        if (animeImage == null)
            return;

        AddMessageToList(
            <AiAnimeImageMessagebox 
                key={"AnimeImage" +  RandomId() + animeImage.id} 
                title={ animeImage.title } 
                imageUrl={ animeImage.imageUrl } 
                createdAt={ Now() }
                onAnimeImageClicked={async () => {
                    const anime = await GetAnimeById(animeImage.id);
                    SetAnimeInputs(anime);
                    handleOpenViewForm();
            }}/>
        );
    }

    function OnAddSuccess(anime: AnimeResponse) {
        const animeImageDetail : AnimeImageDetail = {
            id: anime.id,
            imageUrl: anime.imageUrl,
            title: anime.title
        };
        AddAiAnimeImageToMessageList(animeImageDetail);
        AddAiMessageboxToMessageList(ANIME_ADDED_SUCCESS_MESSAGE, AvatarType.HAPPY);
    }

    function OnEditSuccess(animeImage: AnimeImageDetail) {
        AddAiMessageboxToMessageList(ANIME_UPDATED_SUCCESS_MESSAGE, AvatarType.HAPPY);
        AddAiAnimeImageToMessageList(animeImage);
    }

    function AddAddRequestMessageboxToMessageList() {
        AddMessageToList(
            <AddAnimeRequestMessagebox 
                key={"AnimeRequestAdd" + RandomId()}
                createdAt={Now()}
                onOpenButtonClicked={() => {
                    setChatboxState(ChatboxState.ADD);
                    handleOpenInputForm();
                }}/>
        );
    }

    function AddEditRequestMessageboxToMessageList(animeId: string) {
        AddMessageToList(
            <AddAnimeRequestMessagebox 
                key={"AnimeRequestEdit" + RandomId()}
                createdAt={Now()}
                onOpenButtonClicked={() => {
                    setChatboxState(ChatboxState.EDIT);
                    setAnimeId(animeId);
                    handleOpenEditForm();
                }}/>
        );
    }

    function AddAiDeleteMessageboxToMessageList(deleteMessage: string) {
        AddMessageToList(
            <AiMessagebox 
                key={ "AnimeDelete" + RandomId() }
                avatarType={ AvatarType.HAPPY }
                createdAt={ Now() }
                text={ deleteMessage }
            /> 
        );
    }

    function AddAiRequestTagDatabaseToMessageList() {
        AddMessageToList(
            <AiRequestOpenDatabaseToMessageList
                key={ "TagDbRequest" + RandomId() }
                header={OPEN_TAGS_DB}
                createdAt={Now()}
                onOpenButtonClicked={() => {
                    handleOpenTagDbForm();
                }}
            />
        );
    }

    function AddAiRequestGenreDatabaseToMessageList() {
        AddMessageToList(
            <AiRequestOpenDatabaseToMessageList
                key={ "GenreDbRequest" + RandomId() }
                header={OPEN_GENRES_DB}
                createdAt={Now()}
                onOpenButtonClicked={() => {
                    handleOpenGenreDbForm();
                }}
            />
        );
    }

    return (
        <Box
            sx={{
                width: 375,
                height: 775,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                position: "absolute",
                backgroundColor: "aliceblue"
                }}>
            <Box
                sx={{
                    zIndex: 2,
                    position: "absolute",
                    width: "inherit",
                    height: "inherit",
                }}>

                <Header />

                <Input 
                    isButtonDisabled={isSendButtonDisabled} 
                    input={input} 
                    setInput={setInput}
                    inputLength={inputLength}
                    setInputLength={setInputLength}
                    onInputError={() => {
                        DisableSendButton();
                        AddUserMessageboxToMessageList();
                        AddAiMessageboxToMessageList(RandomApology(), AvatarType.ANXIOUS);
                        ResetInput();
                        EnableSendButton();
                    }}

                    onInputEqualsList={async () => {
                        DisableSendButton();
                        AddUserMessageboxToMessageList();
                        const inputArray = input.split(" ");
                        let pageNumber = Number.parseInt(inputArray[1]);
                        let pageSize = Number.parseInt(inputArray[2]);
                        if (isNaN(pageNumber) || isNaN(pageSize)) {
                            pageNumber = 0;
                            pageSize = 5;
                        }
                        
                        AddAiAnimePageMessageboxToMessageList();
                        ResetInput();
                        EnableSendButton();
                    }}

                    onInputEqualsShow={async () => {
                        DisableSendButton();
                        AddUserMessageboxToMessageList();
                        const inputArray = input.split(" ");
                        const animeId = inputArray[1];
                        const animeImage = await GetAnimeImageDetailById(animeId);
                        AddAiAnimeImageToMessageList(animeImage);
                        ResetInput();
                        EnableSendButton();
                    }}

                    onInputEqualsAdd={() => {
                        DisableSendButton();
                        AddUserMessageboxToMessageList();
                        AddAddRequestMessageboxToMessageList();
                        ResetInput();
                        EnableSendButton();
                    }}

                    onInputEqualsEdit={async () => {
                        DisableSendButton();
                        AddUserMessageboxToMessageList();
                        const inputArray = input.split(" ");
                        const animeId = inputArray[1];
                        const animeImageDetail = await GetAnimeImageDetailById(animeId);
                        AddAiMessageboxToMessageList(EDIT_FORM_YESNO_MESSAGE, AvatarType.NERD);
                        AddAiAnimeImageToMessageList(animeImageDetail);
                        AddEditRequestMessageboxToMessageList(animeImageDetail.id);
                        ResetInput();
                        EnableSendButton();
                    }}

                    onInputEqualsDelete={async () => {
                        DisableSendButton();
                        AddUserMessageboxToMessageList();
                        const inputArray = input.split(" ");
                        const animeId = inputArray[1];
                        if (!animeId) {
                            AddAiMessageboxToMessageList(RandomApology(), AvatarType.ANXIOUS);
                            ResetInput();
                            EnableSendButton();
                            return;
                        }

                        const deleteMessage = await DeleteAnimeById(animeId);
                        AddAiMessageboxToMessageList(`${ deleteMessage }`, AvatarType.HAPPY);
                        AddAiMessageboxToMessageList(`[${ animeId }] ${ ANIME_DELETE_SUCCESS_MESSAGE }`, AvatarType.HAPPY);
                        ResetInput();
                        EnableSendButton();
                    }}

                    onInputEqualsTag={() => {
                        DisableSendButton();
                        AddUserMessageboxToMessageList();
                        AddAiRequestTagDatabaseToMessageList();
                        ResetInput();
                        EnableSendButton();
                    }}

                    onInputEqualsGenre={() => {
                        DisableSendButton();
                        AddUserMessageboxToMessageList();
                        AddAiRequestGenreDatabaseToMessageList();
                        ResetInput();
                        EnableSendButton();
                    }}
                />
                <MessageStack messageList={ messageList } />
            </Box>

            <InputForm
                openInputForm={openInputForm}
                header={ "Add" } 
                chatboxState={chatboxState}
                onCloseButtonClicked = {() => {
                    setChatboxState(ChatboxState.IDLE);
                    ResetAnimeInputs();
                    handleCloseInputForm();
                }}
                onSaveAnimeSuccess = {() => {
                    setChatboxState(ChatboxState.IDLE);
                    handleCloseInputForm();
                    ResetAnimeInputs();
                    ResetInput();
                    EnableSendButton();
                }}
                onSaveStateAdd = {OnAddSuccess}
            />

            <ViewForm 
                openViewForm={openViewForm}
                onCloseButtonClicked={() => {
                    ResetAnimeInputs();
                    setChatboxState(ChatboxState.IDLE);
                    handleCloseViewForm();
                }}
                onEditButtonClicked={() => {
                    handleCloseViewForm();
                    setChatboxState(ChatboxState.EDIT);
                    handleOpenEditForm();
                }}
                anime={{
                    id: animeId,
                    title: animeTitle,
                    rating: animeRating,
                    synopsis: animeSynopsis,
                    japaneseTitle: animeJapaneseTitle,
                    japaneseTitleHiragana: animeJapaneseTitleHiragana,
                    japaneseSynopsis: animeJapaneseSynopsis,
                    dateAired: animeDateAired,
                    dateFinished: animeDateFinished,
                    episodes: animeEpisodes,
                    studio: animeStudio,
                    duration: animeDuration,
                    imageUrl: animeImageUrl,
                    genreList: animeGenreList,
                    tagList: animeTagList
                }}
            />

            <EditForm
                openEditForm={openEditForm}
                selectedTagList={selectedTagList}
                setSelectedTagList={setSelectedTagList}
                tagList={tagList}
                selectedGenreList={selectedGenreList}
                setSelectedGenreList={setSelectedGenreList}
                genreList={genreList}
                handleCloseEditForm={handleCloseEditForm}
                onEditError={() => alert("Error")}
                onEditSuccess={OnEditSuccess}
                DisableSendButton={DisableSendButton}
                setAnimeDateAired={setAnimeDateAired}
                setAnimeDateFinished={setAnimeDateFinished}
                setAnimeDuration={setAnimeDuration}
                setAnimeEpisodes={setAnimeEpisodes}
                setAnimeImageUrl={setAnimeImageUrl}
                setAnimeJapaneseSynopsis={setAnimeJapaneseSynopsis}
                setAnimeJapaneseTitle={setAnimeJapaneseTitle}
                setAnimeJapaneseTitleHiragana={setAnimeJapaneseTitleHiragana}
                setAnimeRating={setAnimeRating}
                setAnimeStudio={setAnimeStudio}
                setAnimeSynopsis={setAnimeSynopsis}
                setAnimeTitle={setAnimeTitle}
                chatboxState={chatboxState}
                onDeleteSuccess={AddAiDeleteMessageboxToMessageList}
                onCloseEditForm={() => {
                    setChatboxState(ChatboxState.IDLE);
                    handleCloseEditForm();
                    ResetAnimeInputs();
                    ResetInput();
                    EnableSendButton();
                }}
                anime={{
                    id: animeId,
                    title: animeTitle,
                    rating: animeRating,
                    synopsis: animeSynopsis,
                    japaneseTitle: animeJapaneseTitle,
                    japaneseTitleHiragana: animeJapaneseTitleHiragana,
                    japaneseSynopsis: animeJapaneseSynopsis,
                    dateAired: animeDateAired,
                    dateFinished: animeDateFinished,
                    episodes: animeEpisodes,
                    studio: animeStudio,
                    duration: animeDuration,
                    imageUrl: animeImageUrl,
                    genreList: animeGenreList,
                    tagList: animeTagList
                }}
            />

            <TagDbForm 
                openTagDbForm={openTagDbForm}
                onCloseButtonClicked={() => {
                    handleCloseTagDbForm();
                }}
            />

            <GenreDbForm
                openGenreDbForm={openGenreDbForm}
                onCloseButtonClicked={() => {
                    handleCloseGenreDbForm();
                }}
            />
        </Box>
    );
}