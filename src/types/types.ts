
export type Exception = {
    title: string;
    errorMessage: string;
    timeStamp: string;
}

export type Genre = {
    id: string;
    name: string;
}

export type GenreRequest = {
    name: string;
}

export type Tag = {
    id: string;
    name: string;
}

export type TagRequest = {
    name: string;
}

export type AnimePage = {
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    animeContentList: Array<AnimeDefaultDetails>;
}

export type AnimeImageDetail = {
    id: string;
    title: string;
    imageUrl: string;
}

export type AnimeDefaultDetails = {
    id: string;
    title: string;
}

export type AnimeRequest = {
    title: string;
    rating: number;
    synopsis: string;
    
    japaneseTitle: string;
    japaneseTitleHiragana: string;
    japaneseSynopsis: string;

    dateAired: string;
    dateFinished: string;
    
    episodes: number;
    studio: string;
    duration: string;
    imageUrl: string;
}

export type AnimeResponse = {
    id: string;
    title: string;
    rating: number;
    synopsis: string;
    
    japaneseTitle: string;
    japaneseTitleHiragana: string;
    japaneseSynopsis: string;

    dateAired: string;
    dateFinished: string;
    
    episodes: number;
    studio: string;
    duration: string;
    imageUrl: string;

    genreList: Array<Genre>;
    tagList: Array<Tag>;
}
