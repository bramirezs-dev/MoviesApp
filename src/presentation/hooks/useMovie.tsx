import { useEffect, useState } from "react";

import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/http/movieDB.adapter';
import { FullMovie } from "../../core/entities/movie.entity";
import { Cast } from "../../core/entities/cast.entity";
export const useMovie = (movieId:number) => {
    const [isLoading, setisLoading] = useState(true);
    const [movie, setmovie] = useState<FullMovie>()
    const [cast, setCast] = useState<Cast[]>()

    useEffect(() => {
        loadMovie();
    }, [movieId])
    
    const loadMovie= async()=>{
        setisLoading(true);
        const getMovieByIdPromise = UseCases.getMovieByIdUseCase(movieDBFetcher,movieId)
        const actorPromise = UseCases.getMovieCastUseCase(movieDBFetcher,movieId)

        const [getMovieById,cast] = await Promise.all([getMovieByIdPromise,actorPromise])

        setmovie(getMovieById);
        setCast(cast);
        setisLoading(false);
        console.log(getMovieById.originalTitle)
        console.log(getMovieById?.poster)
        console.log(getMovieById?.title)
    }
  
    return {
        isLoading, movie, cast
  }
}
