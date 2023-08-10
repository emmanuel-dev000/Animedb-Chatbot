import axios from "axios";
import { AnimeResponse, Tag } from "../types/types";

export async function UpdateTagListInAnimeById(animeId: string, tagList: Array<Tag>) : Promise<AnimeResponse> {
    const { data } = await
        axios.patch(`http://localhost:8080/api/v1/anime/${ animeId }/tags`, tagList, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    return data;
}