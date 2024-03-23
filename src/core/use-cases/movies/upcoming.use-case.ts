import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { GeneralMovieDB } from "../../../infrastructure/interfaces/general-movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";


export const movieUpcomingUseCase = async (fetcher : HttpAdapter) : Promise<Movie[]> => {
    try {
        const upcoming = await fetcher.get<GeneralMovieDB>('/upcoming')
        return upcoming.results.map(result => MovieMapper.fromMovieDBResultEntity(result));
    } catch (error) {
        console.log(error)
        throw new Error('error fetching movies - Upcoming')
    }
}