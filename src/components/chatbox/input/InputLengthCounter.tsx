import { Typography } from "@mui/material"
import { InputLengthCounterByInput } from "../../../handlers/InputHandler";

interface InputLengthCounterProps {
    inputLength: number;
}

export function InputLengthCounter({ inputLength }: InputLengthCounterProps) {
    return (
        <Typography
            sx={{
                position: "absolute",
                right: 0,
                bottom: 0,
                padding: 1,
                fontSize: 12
            }}>
            {InputLengthCounterByInput(inputLength)}
        </Typography>
    );
}
