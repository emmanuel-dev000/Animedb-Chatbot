import axios from "axios";
import { AnimeImageDetail, AnimePage, AnimeRequest, AnimeResponse,  } from "../types/types";

export async function GetAnimeByPage(pageNumber: number, pageSize: number) : Promise<AnimePage> {
    const { data } = await 
        // axios.get(`http://localhost:8080/api/v1/anime/?pageNumber=${ pageNumber }&pageSize=${ pageSize }`);
        axios.get(`https://animedb-yksz.onrender.com/api/v1/anime/?pageNumber=${ pageNumber }&pageSize=${ pageSize }`);
    return data;
}

export async function AddNewAnime(animeRequest: AnimeRequest) : Promise<AnimeResponse> {
    const { data } = await
        // axios.post("http://localhost:8080/api/v1/anime", animeRequest,
        axios.post("https://animedb-yksz.onrender.com/api/v1/anime", animeRequest,
        {
            headers: {
                "Content-Type": "application/json"
            }
        });
    return data;
}

export async function GetAnimeImageDetailById(id: string) : Promise<AnimeImageDetail> {
    const { data } = await
        // axios.get(`http://localhost:8080/api/v1/anime/${ id }/image-detail`);
        axios.get(`https://animedb-yksz.onrender.com/api/v1/anime/${ id }/image-detail`);
    return data;
}

export async function GetAnimeById(id: string) : Promise<AnimeResponse> {
    const { data } = await
        // axios.get(`http://localhost:8080/api/v1/anime/${ id }`);
        axios.get(`https://animedb-yksz.onrender.com/api/v1/anime/${ id }`);
    return data;
}

export async function DeleteAnimeById(id: string) : Promise<string> {
    const { data } = await
        // axios.delete(`http://localhost:8080/api/v1/anime/${ id }`);
        axios.delete(`https://animedb-yksz.onrender.com/api/v1/anime/${ id }`);
    return data;
}

export async function EditAnimeById(id: string, updatedAnime: AnimeRequest) : Promise<AnimeResponse> {
    const { data } = await
        // axios.patch(`http://localhost:8080/api/v1/anime/${ id }`, updatedAnime, {
        axios.patch(`https://animedb-yksz.onrender.com/api/v1/anime/${ id }`, updatedAnime, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    return data;
}