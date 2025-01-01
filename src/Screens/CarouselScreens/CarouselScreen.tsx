import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useCallback, useRef, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { CarouselScreenProps } from './CarouselScreenProp';
import CarouselScreenComponentView from '../../Pages/Components/CarouselScreenComponent/CarouselScreenComponentView';
import images from '../../../assets/assets';
import { useCarouselScreenVM } from './CarouselScreenVM';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CarouselScreen =(props: CarouselScreenProps) => {
  
  const carouselScreenVM =  useCarouselScreenVM(props);



  return (
    <View style={CarouselScreenStyles.container}>
      <View style={CarouselScreenStyles.carouselContainer}>
        <Carousel
          ref={carouselScreenVM.carouselRef}
          loop={false}
          width={screenWidth}
          height={screenHeight}
          autoPlay={false}
          data={carouselScreenVM.carouselData}
          scrollAnimationDuration={1000}
          onSnapToItem={carouselScreenVM.onSnapToItem}
          renderItem={({ item }) => (
            <View style={CarouselScreenStyles.slide}>
              {item.component}
            </View>
          )}
          style={CarouselScreenStyles.carousel}
          defaultIndex={0}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
        />
      </View>
      <View style={CarouselScreenStyles.paginationContainer}>{carouselScreenVM.renderDots()}</View>
    </View>
  );
}


export const CarouselScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  carouselContainer: {
    flex: 1,
    position: 'relative',
  },
  carousel: {
    width: '100%',
    height: '100%',
  },
  slide: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  }
});

export default CarouselScreen;