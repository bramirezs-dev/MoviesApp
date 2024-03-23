import React, {useEffect, useState} from 'react';
import {Movie} from '../../core/entities/movie.entity';

import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/http/movieDB.adapter';


let popularPage= 1;
export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [toprated, setToprated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    
    const nowPlayingMoviesPromise = UseCases.moviesNowPlayigUseCase(movieDBFetcher);
    const upcomingMoviesPromise = UseCases.movieUpcomingUseCase(movieDBFetcher);
    const topratedMoviesPromise = UseCases.movieTopReleatedUseCase(movieDBFetcher);
    const popularMoviesPromise = UseCases.moviePopularUseCase(movieDBFetcher);
    const [nowPlayingMovies,upcomingMovies,topratedMovies,popularMovies] = await Promise.all([
        nowPlayingMoviesPromise,
        upcomingMoviesPromise,
        topratedMoviesPromise,
        popularMoviesPromise,
    ]);
    setNowPlaying(nowPlayingMovies);
    setPopular(popularMovies);
    setToprated(topratedMovies);
    setUpcoming(upcomingMovies);

    setIsLoading(false);
  };

  return {
    isLoading,
    nowPlaying,
    upcoming,
    popular,
    toprated,

    /* Methods */
    popularNextpage: async() => {
      popularPage++;
      const popularmovies = await UseCases.moviePopularUseCase(movieDBFetcher, {
        page: popularPage,
      });
      setPopular(prev=> [...prev, ...popularmovies])

    }
  };
};
