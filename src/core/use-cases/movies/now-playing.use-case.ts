import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { NowPlayingResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";


export const moviesNowPlayigUseCase = async (fetcher: HttpAdapter):Promise<Movie[]>=> {
    try {
        const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing');
        return nowPlaying.results.map(result=> MovieMapper.fromMovieDBResultEntity(result));
    } catch (error) {
        console.log(error);
        throw new Error('error fetching movies - NowPlaying');
    }
}