import { Avatar } from "@mui/material";
import { AvatarType } from "../../../types/enums";

interface AvatarEmojiProps {
    avatarType: AvatarType;
}

export default function AvatarEmoji({ avatarType } : AvatarEmojiProps) {
    switch (avatarType) {
        case AvatarType.DEFAULT:
            return <Avatar>"😉"</Avatar>;

        case AvatarType.ANXIOUS:
            return <Avatar>"😰"</Avatar>;

        case AvatarType.HAPPY:
            return <Avatar>"😊"</Avatar>;

        case AvatarType.NERD:
            return <Avatar>"🤓"</Avatar>;
    }
}