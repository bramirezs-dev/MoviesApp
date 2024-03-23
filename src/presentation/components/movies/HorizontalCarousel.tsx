
import { NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native'
import { Movie } from '../../../core/entities/movie.entity'
import { FlatList } from 'react-native-gesture-handler'
import { MoviesPoster } from './MoviesPoster'
import { useEffect, useRef } from 'react';


interface Props {
    movies: Movie[],
    title?: string,
    loadNextpage?:()=> void;
}
export const HorizontalCarousel = ({movies, title, loadNextpage}:Props) => {
    
    const isLoading = useRef(false);

    useEffect(() => {
      setTimeout(()=>{
        isLoading.current = false;
      },200)
    }, [movies])
    
    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>)=>{
        
        if(isLoading.current === true) return;
        
        const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
        const isEndReached = (contentOffset.x + layoutMeasurement.width +600) >=  contentSize.width;
        if(!isEndReached) return;

        isLoading.current=true;
        /*cargar las demas peliculas*/ 
        /*Si es null no ejecuta la funcion pero si tiene algun valor ejecuta la consulta*/
        loadNextpage && loadNextpage(); 
    }
  
    return (
    <View
    style={{height: title ? 260 : 220 }}
    >
        {
            title && (
                <Text
                    style={{
                        fontSize:30,
                        fontWeight:'300',
                        marginLeft:10,
                        marginBottom: 10
                    }}
                >{title}</Text>
            )
        }
        <FlatList
            data={ movies}
            renderItem={({item})=> (
                <MoviesPoster movie={item} width={140} height={200}/>
            )}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            onScroll={(event)=> onScroll(event)}
        />
        
    </View>
  )
}
