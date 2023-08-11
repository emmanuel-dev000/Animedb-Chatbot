import { Box, Button, FormControlLabel, FormGroup, Checkbox, Typography } from "@mui/material";
import { UpdateTagListInAnimeById } from "../../hooks/HttpTag";
import { AnimeResponse, Tag } from "../../types/types";
import { useState, useEffect } from "react";
import axios from "axios";

interface TryTagProps {
    anime: AnimeResponse;
    selectedTagList: Array<Tag>;
    setSelectedTagList: React.Dispatch<React.SetStateAction<Array<Tag>>>;
}

export default function TryTag({ ...props } : TryTagProps) {
    // const [selectedTagList, setSelectedTagList] = useState<Array<Tag>>(props.anime.tagList);
    const [tagList, setTagList] = useState<Array<Tag>>([]);
    
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/tags")
            .then(res => {
                setTagList(res.data);
            });
    }, [tagList]);

    return (
        <Box>
            <Typography>
                { props.anime.title }
            </Typography>
            <FormGroup row>
            {
                tagList?.map((tag) => {
                    return <FormControlLabel
                                key={ tag.id }
                                label={ tag.name } 
                                control={<Checkbox 
                                            defaultChecked = { IsTagIncluded(props.anime, tag) }
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    props.selectedTagList.push(tag);
                                                    props.setSelectedTagList(props.selectedTagList);
                                                }

                                                if (!e.target.checked) {
                                                    const index = FindIndex(props.selectedTagList, tag);
                                                    if (index === undefined) {
                                                        return;
                                                    }

                                                    const REMOVE_ONE_ELEMENT_ONLY = 1;
                                                    props.selectedTagList.splice(index, REMOVE_ONE_ELEMENT_ONLY);
                                                    props.setSelectedTagList(props.selectedTagList);
                                                    
                                                }

                                                console.log("------UPDATED-----");
                                                console.log(" ");
                                                props.selectedTagList.map(tag => {
                                                    console.log(tag.id + " " + tag.name );
                                                });
                                                console.log(" ");
                                                console.log("------END-----");
                                            }}
                                            />
                                        } 
                            />;
                })
            }
            </FormGroup>
            <Button
                variant="contained"
                onClick={async (e) => {
                    const x  = await UpdateTagListInAnimeById(props.anime.id, props.selectedTagList);
                    x.tagList.map(tag => {
                        console.log(tag.name);
                    })
                    e.preventDefault();
                }}>
                Add Tag to List
            </Button>
        </Box>
    );
}

function IsTagIncluded(anime: AnimeResponse, tag: Tag,) : boolean {
    for (let index = 0; index < anime.tagList.length; index++) {
        const animeTag = anime.tagList[index];
        if (animeTag.id === tag.id) {
            return true;
        }
    }

    return false;
}

function FindIndex(tagList: Array<Tag>, tag: Tag) : number | undefined {
    for (let index = 0; index < tagList.length; index++) {
        const t = tagList[index];
        if (t.id === tag.id) {
            return index;
        }
    }

    return undefined;
}