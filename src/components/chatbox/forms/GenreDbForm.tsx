import { Slide, Box, AppBar, Toolbar, IconButton, Typography, Divider, Button, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogActions, DialogTitle, DialogContent, TextField, Grid } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { Spacing } from "../Spacing";
import { Genre } from "../../../types/types";
import { useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import axios from "axios";
import { AddNewGenre, DeleteGenreById, EditGenreById } from "../../../hooks/HttpGenre";

interface Props {
    openGenreDbForm: boolean;
    onCloseButtonClicked: () => void;
}

export default function GenreDbForm({ ...props }: Props) {
    return (
        <Slide
            direction="up"
            in={props.openGenreDbForm}
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

                {Form()}
            </Box>
        </Slide>
    );
}

function Header(props: Props) {
    return <AppBar position="static">
        <Toolbar>
            <IconButton
                color="inherit"
                edge="start"
                onClick={() => props.onCloseButtonClicked()}
            >
                <CloseSharpIcon />
            </IconButton>
        </Toolbar>
    </AppBar>;
}

function Form() {
    const [genreList, setGenreList] = useState<Array<Genre>>([]);

    const getGenreList = () => {
        // axios.get("http://localhost:8080/api/v1/genres")
        axios.get("https://animedb-yksz.onrender.com/api/v1/genres")
            .then(res => {
                setGenreList(res.data);
        });
    }
    
    useEffect(() => {
        // console.log("http://localhost:8080/api/v1/genres");
        console.log("https://animedb-yksz.onrender.com/api/v1/genres");
        getGenreList();
    }, []);

    const handleGetGenreList = () => getGenreList();

    let genreCounter = 1;
    const [genreSelected, setGenreSelected] = useState<Genre>();

    const [addSlideIn, setAddSlideIn] = useState<boolean>(false);
    const handleAddSlideIn = () => setAddSlideIn(true);
    const handleAddSlideOut = () => setAddSlideIn(false);

    const [editSlideIn, setEditSlideIn] = useState<boolean>(false);
    const handleEditSlideIn = () => setEditSlideIn(true);
    const handleEditSlideOut = () => setEditSlideIn(false);

    const [deleteSlideIn, setDeleteSlideIn] = useState<boolean>(false);
    const handleDeleteSlideIn = () => setDeleteSlideIn(true);
    const handleDeleteSlideOut = () => setDeleteSlideIn(false);

    function ResetGenreSelected() {
        setGenreSelected({ id: "", name: "" });
    }

    return <Box
        sx={{
            marginTop: 2,
            padding: 2,
            maxHeight: 650,
        }}>

            <Typography
                sx={{
                    fontSize: 38,
                    fontWeight: "bold",
                }}>
                GENRE DATABASE
            </Typography>
        <Spacing />

        <Divider />
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>
                        #
                    </TableCell>
                    <TableCell>
                        Genre
                    </TableCell>
                    <TableCell>
                        {/* EMPTY CELL to avoid broken line. */}
                    </TableCell>
                    <TableCell>
                        <Button variant="contained"
                            onClick={handleAddSlideIn}
                        >
                            Add
                        </Button>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                genreList.map(genre => {
                    return (
                        genre && (
                            <TableRow
                                key={ genre.id }
                                >
                                <TableCell>
                                    { genreCounter++ }
                                </TableCell>
                                <TableCell
                                    onClick={() => {
                                        console.log(genre.id + " " + genre.name);
                                    }}>
                                    { genre.name }
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => {
                                            const genreToEdit: Genre = {
                                                id: genre.id,
                                                name: genre.name
                                            }
                                            setGenreSelected(genreToEdit);
                                            handleEditSlideIn();
                                        }}>
                                        <BorderColorSharpIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => {
                                            const genreToEdit: Genre = {
                                                id: genre.id,
                                                name: genre.name
                                            }
                                            setGenreSelected(genreToEdit);
                                            handleDeleteSlideIn();
                                        }}>
                                        <DeleteSharpIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    );
            })}
            </TableBody>
        </Table>
        { 
            AddPopup(
                addSlideIn, 
                () => {
                    handleAddSlideOut();
                    handleGetGenreList();
            })
        }
        { 
            EditPopup(
                genreSelected,
                editSlideIn, 
                () => {
                    handleEditSlideOut();
                    ResetGenreSelected();
                    handleGetGenreList();
            })
        }

        {
            DeletePopup(
                genreSelected,
                deleteSlideIn,
                () => {
                    handleDeleteSlideOut();
                    ResetGenreSelected();
                    handleGetGenreList();
                }
            )
        }

    </Box>;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<unknown, React.JSXElementConstructor<unknown>>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function AddPopup(
    addSlideIn: boolean,
    handleAddSlideOut: () => void,
    ) {
    const [newGenreName, setNewGenreName] = useState<string>();
    return(
        <Dialog
            open={addSlideIn}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleAddSlideOut}
        >
            <DialogTitle>
                New Genre
            </DialogTitle>
            <DialogContent>
                <TextField
                    placeholder="Enter genre's name"
                    variant="standard"
                    id="genreName"
                    sx={{
                        marginY: 1,
                    }}
                    onChange={(e) => {
                        setNewGenreName(e.target.value);
                    }}
                />
                <Typography
                    align="left"
                    sx={{
                        fontSize: 12,
                    }}>
                        Enter the new genre's name.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        handleAddSlideOut();
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={async () => {
                        if (!newGenreName) return;

                        const newGenreResponse = await AddNewGenre({ name: newGenreName });
                        if (!newGenreResponse) {
                            alert("Error adding of tag");
                            return;
                        }

                        handleAddSlideOut();
                    }}
                >
                    Add
                </Button>
            </DialogActions>
    
        </Dialog>
    );
}

function EditPopup(
    genre: Genre | undefined,
    editSlideIn: boolean,
    handleEditSlideOut: () => void,
    ) {
    const [newGenreName, setNewGenreName] = useState<string>();
    return(
        <Dialog
            open={editSlideIn}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleEditSlideOut}
        >
            <DialogTitle>
                { genre?.name }
            </DialogTitle>
            <DialogContent>
                <TextField
                    placeholder="Edit name"
                    variant="standard"
                    id="tagName"
                    sx={{
                        marginY: 1,
                    }}
                    onChange={(e) => {
                        setNewGenreName(e.target.value);
                    }}
                />
                <Grid container>
                    <Typography
                        align="left"
                        sx={{
                            fontSize: 12,
                        }}>
                            Previous Name: 
                    </Typography>
                    <Typography
                        align="right"
                        sx={{
                            fontWeight: "bold",
                            fontSize: 12,
                            marginLeft: 0.5,
                        }}>
                            { genre?.name }
                    </Typography>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        handleEditSlideOut();
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={async () => {
                        if (!genre?.id || !newGenreName) return;
                        
                        if (genre?.name === newGenreName) {
                            handleEditSlideOut();
                            return;
                        }

                        const genreResponse = await EditGenreById(genre.id, { name: newGenreName });
                        if (!genreResponse) {
                            alert("Error adding of tag");
                            return;
                        }

                        handleEditSlideOut();
                    }}
                >
                    Edit
                </Button>
            </DialogActions>
    
        </Dialog>
    );
}

function DeletePopup(
    genre: Genre | undefined,
    deleteSlideIn: boolean,
    handleDeleteSlideOut: () => void,
    ) {
    return(
        <Dialog
            open={deleteSlideIn}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleDeleteSlideOut}
        >
            <DialogTitle>
               Delete { genre?.name } genre?
            </DialogTitle>
            <DialogContent>
                <Typography 
                    variant="body1"
                    gutterBottom
                >
                    Are you sure you want to delete the { genre?.name } genre?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        handleDeleteSlideOut();
                    }}
                >
                    Cancel
                </Button>
                <Button
                    color="error"
                    variant="contained"
                    onClick={async () => {
                        if (!genre?.id || !genre.name) return;
                        
                        const tagResponse = await DeleteGenreById(genre.id);
                        if (!tagResponse) {
                            alert("Error deleting tag");
                            return;
                        }

                        handleDeleteSlideOut();
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}