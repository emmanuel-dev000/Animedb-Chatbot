import { Button } from "@mui/material";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import { ButtonColorByInput } from "./InputHandler";
import { InputLengthCounter } from "./InputLengthCounter";

interface SendButtonProps {
    isSendButtonDisabled: boolean;
    inputLength: number; 
    input: string;
    onSendButtonClicked: () => Promise<void>;
}

export function SendButton({ ...props } : SendButtonProps) {
    return (
        <Button
            disabled={props.isSendButtonDisabled}
            color={ButtonColorByInput(props.inputLength)}
            variant="contained"
            endIcon={<SendSharpIcon />}
            sx={{ borderRadius: 0 }}
            onClick={ props.onSendButtonClicked }>
            Send
            <InputLengthCounter inputLength={props.inputLength} />
        </Button>
    );
}