import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { GeneralMovieDB } from "../../../infrastructure/interfaces/general-movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";


export const movieTopReleatedUseCase = async (fetcher:HttpAdapter):Promise<Movie[]>=> {
    try {
        const toprated = await fetcher.get<GeneralMovieDB>('/top_rated')
        return toprated.results.map(result=> MovieMapper.fromMovieDBResultEntity(result))    
    } catch (error) {
        console.log(error)
        throw new Error('error fetching movies - toprated')
    }
    

}