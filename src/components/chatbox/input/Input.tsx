import { Paper, Stack, TextField } from "@mui/material";
import { INPUT_LENGTH_MAX, IsInputEqualsList, IsInputEqualsDelete, IsInputEqualsEdit, IsInputEqualsAdd, IsInputEqualsShow, IsInputNotEqualsToAnyCommand, IsInputEqualsTag, IsInputEqualsGenre } from "./InputHandler";
import Footer from "../Footer";
import { SendButton } from "./SendButton";
import React from "react";

interface InputProps {
    isButtonDisabled: boolean;
    input: string;
    inputLength: number;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    setInputLength: React.Dispatch<React.SetStateAction<number>>;
    onInputError: () => void;
    onInputEqualsList: () => Promise<void>;
    onInputEqualsShow: () => Promise<void>;
    onInputEqualsAdd: () => void;
    onInputEqualsEdit: () => Promise<void>;
    onInputEqualsDelete: () => Promise<void>;
    onInputEqualsTag: () => void;
    onInputEqualsGenre: () => void;
}

export default function Input({ ...props }: InputProps) {
    return (
        <Paper
            elevation={2}
            sx={{
                borderRadius: 0,
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "175px",
            }}>
            <Stack
                direction="column"
                spacing={1.5}
                sx={{
                    paddingX: "15px",
                    paddingY: "15px",
                }}>
                <TextField
                    value={props.input}
                    autoFocus
                    placeholder="Chat"
                    sx={{ borderRadius: 0 }} 
                    onChange={(e) => {
                        if ((e.target.value.length) > INPUT_LENGTH_MAX + 5)
                            return;

                        props.setInput(e.target.value);
                        props.setInputLength(e.target.value.length);
                    }}/>
                <SendButton 
                    isSendButtonDisabled={props.isButtonDisabled} 
                    inputLength={props.inputLength} 
                    input={props.input} 
                    onSendButtonClicked={ async () => {
                        if (props.inputLength > INPUT_LENGTH_MAX)
                            return;

                        if (IsInputNotEqualsToAnyCommand(props.input)) {
                            props.onInputError();
                            return;
                        }

                        if (IsInputEqualsList(props.input)) {
                            await props.onInputEqualsList();
                            return;
                        }

                        if (IsInputEqualsShow(props.input)) {
                            await props.onInputEqualsShow();
                            return;
                        }

                        if (IsInputEqualsDelete(props.input)) {
                            await props.onInputEqualsDelete();
                            return;
                        }

                        if (IsInputEqualsAdd(props.input)) {
                            props.onInputEqualsAdd();
                            return;
                        }

                        if (IsInputEqualsEdit(props.input)) {
                            await props.onInputEqualsEdit();
                            return;
                        }

                        if (IsInputEqualsTag(props.input)) {
                            props.onInputEqualsTag();
                            return;
                        } 

                        if (IsInputEqualsGenre(props.input)) {
                            props.onInputEqualsGenre();
                            return;
                        } 
                    }} />
                <Footer />
            </Stack>
        </Paper>
    );
}