import axios from "axios";
import { AnimeResponse, Genre } from "../types/types";

export async function UpdateGenreListInAnimeById(animeId: string, genreList: Array<Genre>) : Promise<AnimeResponse> {
    const { data } = await
        axios.patch(`http://localhost:8080/api/v1/anime/${ animeId }/tags`, genreList, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    return data;
}