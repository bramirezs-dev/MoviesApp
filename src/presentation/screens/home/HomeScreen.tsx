import React from 'react';
import {Text, View} from 'react-native';
import {useMovies} from '../../hooks/useMovies';
import {ScrollView} from 'react-native-gesture-handler';
import {PosterCarousel} from '../../components/movies/PosterCarousel';
import {HorizontalCarousel} from '../../components/movies/HorizontalCarousel';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';

export const HomeScreen = () => {
  const {isLoading, nowPlaying, popular, toprated, upcoming, popularNextpage} =
    useMovies();
  if (isLoading) {
    return <FullScreenLoader/>;
  }
  return (
    <ScrollView>
      <View style={{marginTop: 20, paddingBottom: 30}}>
        {/* Principal */}
        <PosterCarousel movies={nowPlaying} />
        {/* Populares */}
        <HorizontalCarousel
          movies={popular}
          title="Popular"
          loadNextpage={popularNextpage}
        />

        {/* Top Rated */}
        <HorizontalCarousel movies={toprated} title="Mejor Calificadas" />

        {/* upcoming */}
        <HorizontalCarousel movies={upcoming} title="Proximamente" />
      </View>
    </ScrollView>
  );
};
