import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieByIDResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { FullMovie } from "../../entities/movie.entity";

export const getMovieByIdUseCase = async (fetcher:HttpAdapter, movieId:number):Promise<FullMovie>=>{
    try {
        const moviebyId = await fetcher.get<MovieByIDResponse>(`/${movieId}`)
        return MovieMapper.fromMovieDBEntity(moviebyId)
    } catch (error) {
        throw new Error(`Cannot get movid id ${movieId}`);
    }
}