import axios from "axios";
import { AnimeResponse, Genre, GenreRequest } from "../types/types";

export async function UpdateGenreListInAnimeById(animeId: string, genreList: Array<Genre>) : Promise<AnimeResponse> {
    const { data } = await
        axios.patch(`http://localhost:8080/api/v1/anime/${ animeId }/genres`, genreList, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    return data;
}

export async function GetAllGenres() : Promise<Array<Genre>> {
    const { data } = await
        axios.get("http://localhost:8080/api/v1/genres");
    return data;
}

export async function AddNewGenre(newGenre: GenreRequest) : Promise<Genre> {
    const { data } = await
        axios.post("http://localhost:8080/api/v1/genres", newGenre, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    return data;
}

export async function EditGenreById(genreId: string, newGenre: GenreRequest) : Promise<Genre> {
    const { data } = await
        axios.patch(`http://localhost:8080/api/v1/genres/${ genreId }`, newGenre, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    return data;
}

export async function DeleteGenreById(genreId: string) : Promise<string> {
    const { data } = await
        axios.delete(`http://localhost:8080/api/v1/genres/${ genreId }`);
    return data;
}