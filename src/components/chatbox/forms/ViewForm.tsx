import { Slide, Box, AppBar, Toolbar, IconButton, Typography, Divider } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Spacing } from "../Spacing";
import { AnimeResponse } from "../../../types/types";

interface ViewFormProps {
    openViewForm: boolean;
    anime: AnimeResponse;
    onCloseButtonClicked: () => void;
}

export default function ViewForm({ ...props }: ViewFormProps) {
    return (
        <Slide
            direction="up"
            in={props.openViewForm}
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
                {Header(props)}

                {Form(props)}
            </Box>
        </Slide>
    );
}

function Header(props: ViewFormProps) {
    return <AppBar position="static">
        <Toolbar>
            <IconButton
                color="inherit"
                edge="start"
                onClick={() => props.onCloseButtonClicked()}
            >
                <CloseSharpIcon />
            </IconButton>
            <Typography
                sx={{
                    marginLeft: 0.5,
                }}>
                {props.anime.title}
            </Typography>
        </Toolbar>
    </AppBar>;
}

function Form(props: ViewFormProps) {
    return <Box
        sx={{
            marginTop: 2,
            padding: 2,
            maxHeight: 650,
            overflowY: "scroll",
        }}>

        <img src={props.anime.imageUrl}
            style={{
                width: 225,
                height: 330,
            }} />
        <Typography variant="subtitle2">
            {props.anime.title}
        </Typography>
        <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
                fontSize: 14,
            }}>
            {props.anime.id}
        </Typography>

        <Spacing />

        <Divider />

        <Spacing />

        <Typography
            variant="button"
            display="block"
            gutterBottom>
            TITLE (JAPANESE)
        </Typography>
        <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
                fontSize: 14,
            }}>
            {props.anime.japaneseTitle}, {props.anime.japaneseTitleHiragana}
        </Typography>

        <Typography
            variant="button"
            display="block"
            gutterBottom>
            STUDIO
        </Typography>
        <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
                fontSize: 14,
            }}>
            {props.anime.studio}
        </Typography>

        <Typography
            variant="button"
            display="block"
            gutterBottom>
            RATING
        </Typography>
        <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
                fontSize: 14,
            }}>
            {props.anime.rating}⭐
        </Typography>

        <Typography
            variant="button"
            display="block"
            gutterBottom>
            EPISODES
        </Typography>
        <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
                fontSize: 14,
            }}>
            {props.anime.episodes}
        </Typography>

        <Typography
            variant="button"
            display="block"
            gutterBottom>
            DURATION
        </Typography>
        <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
                fontSize: 14,
            }}>
            {props.anime.duration}
        </Typography>

        <Typography
            variant="button"
            display="block"
            gutterBottom>
            AIRED
        </Typography>
        <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
                fontSize: 14,
            }}>
            {props.anime.dateAired} - {props.anime.dateFinished}
        </Typography>

        <Typography
            variant="button"
            display="block"
            gutterBottom>
            TAGS
        </Typography>
        <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
                fontSize: 14,
            }}>
            {props.anime.tagList.map(tag => {
                const tagListLength = props.anime.tagList.length;
                const lastId = props.anime.tagList[tagListLength - 1].id;
                return (lastId === tag.id)
                    ? ` ${tag.name}` : ` ${tag.name},`;
            })}
        </Typography>

        <Typography
            variant="button"
            display="block"
            gutterBottom>
            GENRES
        </Typography>
        <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
                fontSize: 14,
            }}>
            {props.anime.genreList.map(genre => {
                const genreListLength = props.anime.genreList.length;
                const lastId = props.anime.genreList[genreListLength - 1].id;
                return (lastId === genre.id)
                    ? ` ${genre.name}` : ` ${genre.name},`;
            })}
        </Typography>

        <Spacing />

        <Divider />

        <Spacing />

        <Typography
            variant="button"
            display="block"
            gutterBottom>
            SYNOPSIS (ENGLISH)
        </Typography>
        <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
                fontSize: 14,
            }}>
            {props.anime.synopsis}
        </Typography>

        <Spacing />

        <Typography
            variant="button"
            display="block"
            gutterBottom>
            SYNOPSIS (JAPANESE)
        </Typography>
        <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
                fontSize: 14,
            }}>
            {props.anime.japaneseSynopsis}
        </Typography>
    </Box>;
}