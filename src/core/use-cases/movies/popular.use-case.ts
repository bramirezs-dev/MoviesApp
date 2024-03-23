import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { GeneralMovieDB } from "../../../infrastructure/interfaces/general-movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";

interface Options {
    page?: number,
    limit?: number,
    
}
export const moviePopularUseCase = async (fetcher:HttpAdapter,options?:Options):Promise<Movie[]> => {
    try {
        const popular = await fetcher.get<GeneralMovieDB>('/popular',{
            page: options?.page ?? 1
        });
        return popular.results.map(result=> MovieMapper.fromMovieDBResultEntity(result));
    } catch (error) {
        console.log(error)
        throw new Error('error fetching movies - popular')
    }
}