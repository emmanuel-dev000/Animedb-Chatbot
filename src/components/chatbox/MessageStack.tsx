import { Box } from "@mui/material";

interface MessageStackProps {
    messageList: Array<React.JSX.Element>;
}

export default function MessageStack({ messageList }: MessageStackProps) {
    return (
        <Box
            sx={{
                zIndex: 1,
                marginTop: 7,
                maxHeight: 540,
                overflowY: "scroll",
            }}
        >
            {
                messageList.map(message => {
                    return message;
                })
            }
        </Box>
    );
}
