import {useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {RootStackParams} from '../../navigation/Navigation';
import {useMovie} from '../../hooks/useMovie';
import {MovieHeader} from '../../components/movie/MovieHeader';
import { MovieDetails } from '../../components/movie/MovieDetails';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const DetailsScreen = ({route}: Props) => {
  const {movieId} = route.params;

  const {isLoading, movie,cast=[]} = useMovie(movieId);
  //const {movieID} = useRoute().params;

  if (isLoading) {
    return <FullScreenLoader/>;
  }

  return (
    <ScrollView>
      <MovieHeader
        poster={movie!?.poster}
        originalTitle={movie!?.originalTitle}
        title={movie!?.title}
      />
      <MovieDetails movie={movie!} cast={cast!}/>
    </ScrollView>
  );
};
