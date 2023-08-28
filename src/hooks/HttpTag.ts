import axios from "axios";
import { AnimeResponse, Tag, TagRequest } from "../types/types";

export async function UpdateTagListInAnimeById(animeId: string, tagList: Array<Tag>) : Promise<AnimeResponse> {
    const { data } = await
        // axios.patch(`http://localhost:8080/api/v1/anime/${ animeId }/tags`, tagList, {
        axios.patch(`https://animedb-yksz.onrender.com/api/v1/anime/${ animeId }/tags`, tagList, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    return data;
}

export async function GetAllTags() : Promise<Array<Tag>> {
    const { data } = await
        // axios.get("http://localhost:8080/api/v1/tags");
        axios.get("https://animedb-yksz.onrender.com/api/v1/tags");
    return data;
}

export async function AddNewTag(newTag: TagRequest) : Promise<Tag> {
    const { data } = await
        // axios.post("http://localhost:8080/api/v1/tags", newTag, {
        axios.post("https://animedb-yksz.onrender.com/api/v1/tags", newTag, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    return data;
}

export async function EditTagById(tagId: string, newTag: TagRequest) : Promise<Tag> {
    const { data } = await
        // axios.patch(`http://localhost:8080/api/v1/tags/${ tagId }`, newTag, {
        axios.patch(`https://animedb-yksz.onrender.com/api/v1/tags/${ tagId }`, newTag, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    return data;
}

export async function DeleteTagById(tagId: string) {
    const { data } = await
        // axios.delete(`http://localhost:8080/api/v1/tags/${ tagId }`);
        axios.delete(`https://animedb-yksz.onrender.com/api/v1/tags/${ tagId }`);
    return data;
}