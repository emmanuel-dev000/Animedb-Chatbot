import { Slide, Box, AppBar, Toolbar, IconButton, Typography, Divider, Button, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogActions, DialogTitle, DialogContent, TextField, Grid } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { Spacing } from "../Spacing";
import { Tag } from "../../../types/types";
import { useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { AddNewTag, DeleteTagById, EditTagById } from "../../../hooks/HttpTag";
import axios from "axios";

interface Props {
    openViewForm: boolean;
    onCloseButtonClicked: () => void;
}

export default function TagDbForm({ ...props }: Props) {
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
    const [tagList, setTagList] = useState<Array<Tag>>([]);

    const getTagList = () => {
        axios.get("http://localhost:8080/api/v1/tags")
            .then(res => {
                setTagList(res.data);
        });
    }
    
    useEffect(() => {
        console.log("http://localhost:8080/api/v1/tags");
        getTagList();
    }, []);

    const handleGetTagList = () => getTagList();

    let tagCounter = 1;
    const [tagSelected, setTagSelected] = useState<Tag>();

    const [addSlideIn, setAddSlideIn] = useState<boolean>(false);
    const handleAddSlideIn = () => setAddSlideIn(true);
    const handleAddSlideOut = () => setAddSlideIn(false);

    const [editSlideIn, setEditSlideIn] = useState<boolean>(false);
    const handleEditSlideIn = () => setEditSlideIn(true);
    const handleEditSlideOut = () => setEditSlideIn(false);

    const [deleteSlideIn, setDeleteSlideIn] = useState<boolean>(false);
    const handleDeleteSlideIn = () => setDeleteSlideIn(true);
    const handleDeleteSlideOut = () => setDeleteSlideIn(false);

    function ResetTagSelected() {
        setTagSelected({ id: "", name: "" });
    }

    return <Box
        sx={{
            marginTop: 2,
            padding: 2,
            maxHeight: 650,
        }}>

            <Typography
                sx={{
                    fontSize: 42,
                    fontWeight: "bold",
                }}>
                TAGS DATABASE
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
                        Tag
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
                tagList.map(tag => {
                    return (
                        tag && (
                            <TableRow
                                key={ tag.id }
                                >
                                <TableCell>
                                    { tagCounter++ }
                                </TableCell>
                                <TableCell
                                    onClick={() => {
                                        console.log(tag.id + " " + tag.name);
                                    }}>
                                    { tag.name }
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => {
                                            const tagToEdit: Tag ={
                                                id: tag.id,
                                                name: tag.name
                                            }
                                            setTagSelected(tagToEdit);
                                            handleEditSlideIn();
                                        }}>
                                        <BorderColorSharpIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => {
                                            const tagToEdit: Tag ={
                                                id: tag.id,
                                                name: tag.name
                                            }
                                            setTagSelected(tagToEdit);
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
                    handleGetTagList();
            })
        }
        { 
            EditPopup(
                tagSelected,
                editSlideIn, 
                () => {
                    handleEditSlideOut();
                    ResetTagSelected();
                    handleGetTagList();
            })
        }

        {
            DeletePopup(
                tagSelected,
                deleteSlideIn,
                () => {
                    handleDeleteSlideOut();
                    ResetTagSelected();
                    handleGetTagList();
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
    const [newTagName, setNewTagName] = useState<string>();
    return(
        <Dialog
            open={addSlideIn}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleAddSlideOut}
        >
            <DialogTitle>
                New Tag
            </DialogTitle>
            <DialogContent>
                <TextField
                    placeholder="Enter tag's name"
                    variant="standard"
                    id="tagName"
                    sx={{
                        marginY: 1,
                    }}
                    onChange={(e) => {
                        setNewTagName(e.target.value);
                    }}
                />
                <Typography
                    align="left"
                    sx={{
                        fontSize: 12,
                    }}>
                        Enter the new tag's name.
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
                        if (!newTagName) return;

                        const newTagResponse = await AddNewTag({ name: newTagName });
                        if (!newTagResponse) {
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
    tag: Tag | undefined,
    editSlideIn: boolean,
    handleEditSlideOut: () => void,
    ) {
    const [newTagName, setNewTagName] = useState<string>();
    return(
        <Dialog
            open={editSlideIn}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleEditSlideOut}
        >
            <DialogTitle>
                { tag?.name }
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
                        setNewTagName(e.target.value);
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
                            { tag?.name }
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
                        if (!tag?.id || !newTagName) return;
                        
                        if (tag?.name === newTagName) {
                            handleEditSlideOut();
                            return;
                        }

                        const tagResponse = await EditTagById(tag.id, { name: newTagName });
                        if (!tagResponse) {
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
    tag: Tag | undefined,
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
               Delete { tag?.name } tag
            </DialogTitle>
            <DialogContent>
                <Typography 
                    variant="body1"
                    gutterBottom
                >
                    Are you sure you want to delete the { tag?.name } tag?
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
                        if (!tag?.id || !tag.name) return;
                        
                        const tagResponse = await DeleteTagById(tag.id);
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