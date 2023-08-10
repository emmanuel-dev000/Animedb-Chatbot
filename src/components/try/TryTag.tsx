import { Box, Button, FormControlLabel, FormGroup, Checkbox, Typography } from "@mui/material";
import { UpdateTagListInAnimeById } from "../../hooks/HttpTag";
import { AnimeResponse, Tag } from "../../types/types";
import { useState } from "react";

export default function TryTag() {
    const animeTagList : Array<Tag> = [
        {
            "id": "64a37fb960d9f31cb1ac01d3",
            "name": "upcoming"
        },
        {
            "id": "64a37fce60d9f31cb1ac01d4",
            "name": "trending"
        },
        {
            "id": "64a37fd460d9f31cb1ac01d5",
            "name": "hot"
        },
        {
            "id": "64a37fd860d9f31cb1ac01d6",
            "name": "top"
        }
    ];

    const LoveLiveSuperstar : AnimeResponse = {
        "id": "64accad2f8be5e7219c93e23",
        "title": "Love Live! Superstar!!",
        "rating": 5.0,
        "synopsis": "Love Live",
        "japaneseTitle": "ラブライブ",
        "japaneseTitleHiragana": "らぶらいぶ！",
        "japaneseSynopsis": "Love Live",
        "dateAired": "Love Live",
        "dateFinished": "Love Live",
        "episodes": 25,
        "studio": "Sunshine",
        "duration": "Love Live",
        "imageUrl": "https://cdn.myanimelist.net/images/anime/1758/115692.jpg",
        "genreList": [
            {
                "id": "64c735a2805bed3225f33a8a",
                "name": "Idol"
            },
            {
                "id": "64c735b8805bed3225f33a8b",
                "name": "Cute Girls Doing Cute Things (CGDCT)"
            },
            {
                "id": "64d34a8a6ab8ec3d3712aad8",
                "name": "School"
            }
        ],
        "tagList": [
            {
                "id": "64a37fb960d9f31cb1ac01d3",
                "name": "upcoming"
            },
            {
                "id": "64a37fce60d9f31cb1ac01d4",
                "name": "trending"
            },
            {
                "id": "64a37fd460d9f31cb1ac01d5",
                "name": "hot"
            },
            {
                "id": "64a37fd860d9f31cb1ac01d6",
                "name": "top"
            }
        ]
    };
    const [selectedTagList, setSelectedTagList] = useState<Array<Tag>>(LoveLiveSuperstar.tagList);
    
    return (
        <Box>
            <Typography>
                { LoveLiveSuperstar.title }
            </Typography>
            <FormGroup row={3}>
            {
                animeTagList.map((tag) => {
                    return <FormControlLabel
                                key={ tag.id }
                                label={ tag.name } 
                                control={<Checkbox 
                                            defaultChecked = { IsTagIncluded(LoveLiveSuperstar, tag) }
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    selectedTagList.push(tag);
                                                    setSelectedTagList(selectedTagList);
                                                }

                                                if (!e.target.checked) {
                                                    const index = FindIndex(selectedTagList, tag);
                                                    if (index === undefined) {
                                                        return;
                                                    }

                                                    const REMOVE_ONE_ELEMENT_ONLY = 1;
                                                    selectedTagList.splice(index, REMOVE_ONE_ELEMENT_ONLY);
                                                    setSelectedTagList(selectedTagList);
                                                    
                                                }

                                                console.log("------UPDATED-----");
                                                console.log(" ");
                                                selectedTagList.map(tag => {
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
                onClick={async () => {
                    const x  = await UpdateTagListInAnimeById(LoveLiveSuperstar.id, selectedTagList);
                    console.log(x.title);
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