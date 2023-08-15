import { USER_EXCEED_MAX_INPUT_MESSAGE } from "../ai/messages";

export function IsInputNotEqualsToAnyCommand(input: string) {
    return !IsInputEqualsList(input)
        && !IsInputEqualsDelete(input)
        && !IsInputEqualsEdit(input)
        && !IsInputEqualsAdd(input) 
        && !IsInputEqualsShow(input)
        && !IsInputEqualsTags(input);
}

export function IsInputEqualsTags(input: string) {
    return input.includes("Tag")
        || input.includes("tag")
        || input.includes("Tags")
        || input.includes("tags");
}

export function IsInputEqualsEdit(input: string) {
    return input.includes("Edit")
        || input.includes("edit");
}

export function IsInputEqualsAdd(input: string) {
    return input.includes("Add")
        || input.includes("add");
}

export function IsInputEqualsShow(input: string) {
    return input.includes("Show")
        || input.includes("show")
        || input.includes("sh");
}

export function IsInputEqualsDelete(input: string) {
    return input.includes("Delete")
        || input.includes("delete")
        || input.includes("del")
        || input.includes("Remove")
        || input.includes("remove")
        || input.includes("rm");
}

export function IsInputEqualsList(input: string) {
    return input.includes("List")
        || input.includes("list")
        || input.includes("ls");
}

export const INPUT_LENGTH_MAX = 150;
export function InputLengthCounterByInput(inputLength: number) {
    return (inputLength <= INPUT_LENGTH_MAX) ?
        `(${inputLength}/${INPUT_LENGTH_MAX})`
        : USER_EXCEED_MAX_INPUT_MESSAGE;
}

export function ButtonColorByInput(inputLength: number) {
    return (inputLength === INPUT_LENGTH_MAX)
        ? "success" :
        (inputLength > INPUT_LENGTH_MAX)
            ? "error" : "primary";
}