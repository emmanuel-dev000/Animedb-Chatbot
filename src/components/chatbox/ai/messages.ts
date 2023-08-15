
export const USER_EXCEED_MAX_INPUT_MESSAGE = "(╯▔皿▔)╯";
export const ANIME_ADDED_SUCCESS_MESSAGE = "Successfully added to my database. Thanks user!";
export const ANIME_UPDATED_SUCCESS_MESSAGE = "Anime updated to my database. Thanks user!";
export const ANIME_DELETE_SUCCESS_MESSAGE = "Anime was thrown to the trash bin and desposed from my database.";
export const EDIT_FORM_YESNO_MESSAGE = "Do you really wanna edit this anime?";
export const LIST_RETRIEVE_SUCCESS_MESSAGE = "Fresh from the database anime list.";
export const LIST_UPDATED_SUCCESS_MESSAGE = "And here's the new anime list.";
export const REQUEST_ADD_ANIME_MESSAGE = "Freshly delivered form.";
export const OPEN_TAGS_DB = "Requesting for Tags Database?";

const apologyList = [
    "I'm so sorry user, there's no command for that.",
    "That prompt was not added to my database.",
    "My system is only limited to the programmed keywords.",
    "Please refer to the instructions user.",
]

export function RandomApology() {
    const id = Math.floor(Math.random() * apologyList.length);
    return apologyList[id];
}