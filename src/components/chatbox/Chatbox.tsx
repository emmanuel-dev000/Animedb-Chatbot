import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import MessageStack from "./MessageStack";
import { AnimeImageDetail, AnimeResponse, Genre, Tag } from "../../types/types";
import Header from "./Header";
import { Now } from "../../datetime/DateTime";
import { AvatarType, ChatboxState } from "../../types/enums";
import React from "react";
import { ANIME_ADDED_SUCCESS_MESSAGE, ANIME_DELETE_SUCCESS_MESSAGE, EDIT_FORM_YESNO_MESSAGE, RandomApology } from "./ai/messages";
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


export default function Chatbox() {
    const [input, setInput] = useState<string>("");
    const [inputLength, setInputLength] = useState<number>(0);
    const [messageList, setMessageList] = useState<Array<React.JSX.Element>>([]);
    const [isSendButtonDisabled, setSendButtonDisabled] = useState<boolean>(false);

    const [chatboxState, setChatboxState] = useState<ChatboxState>(ChatboxState.IDLE);
    const [openInputForm, setOpenInputForm] = useState<boolean>(false);
    const [openEditForm, setOpenEditForm] = useState<boolean>(false);
    const [openViewForm, setOpenViewForm] = useState<boolean>(false);
    
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

    useEffect(() => {
        if (animeId == null || animeId === "") return;
        console.log(`http://localhost:8080/api/v1/anime/${ animeId }`);
            axios.get(`http://localhost:8080/api/v1/anime/${ animeId }`)
                .then(res => {
                    SetAnimeInputs(res.data)
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
                />
                <MessageStack messageList={ messageList } />
            </Box>

            <InputForm
                openInputForm={openInputForm}
                header={chatboxState === ChatboxState.ADD ? "Add something" : "Edit"} 
                animeId={animeId} 
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
                onSaveStateAdd = { () => {
                    AddAiMessageboxToMessageList(ANIME_ADDED_SUCCESS_MESSAGE, AvatarType.HAPPY);
                } }
            />

            <ViewForm 
                openViewForm={openViewForm}
                onCloseButtonClicked={() => {
                    ResetAnimeInputs();
                    setChatboxState(ChatboxState.IDLE);
                    handleCloseViewForm();
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
                handleCloseEditForm={handleCloseEditForm}
                onEditError={() => alert("Error")}
                onEditSuccess={AddAiAnimeImageToMessageList}
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
                    japaneseSynopsis: animeSynopsis,
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
        </Box>
    );
}