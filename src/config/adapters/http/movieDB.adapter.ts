import { THE_MOVIE_DB_KEY } from "@env";
import { AxiosAdapter } from "./axios.adapter";

export const movieDBFetcher = new AxiosAdapter({
    baseUrl:'https://api.themoviedb.org/3/movie',
    params:{
        //api_key:'dfb9b32a7ce3056eb514629b2573477a',
        api_key:THE_MOVIE_DB_KEY,
        language: 'es'
    }
})