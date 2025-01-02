import { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { CarouselScreenProps } from './CarouselScreenProp';
import { CarouselScreenStyles } from './CarouselScreen';
import { AppConstants } from '../../Helpers/Constants/AppConstants/AppConstants';

export const CarouselScreenVM = (props: CarouselScreenProps) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const carouselRef = useRef(null);

  const numberOfPages = 3;

  const renderDots = useCallback(() => {
    const dots = [];
    for (let i = 0; i < numberOfPages; i++) {
      dots.push(
        <View
          key={i}
          style={[
            CarouselScreenStyles.dot,
            { backgroundColor: currentPage === i ? '#fff' : 'rgba(255, 255, 255, 0.5)', width: currentPage === i ? 24 : 8 },
          ]}
        />
      );
    }
    return dots;
  }, [currentPage]);

  const onSnapToItem = useCallback((index: number) => {
    setCurrentPage(index);
  }, []);

  const handleNext = useCallback(() => {
    if (currentPage < numberOfPages - 1) {
      carouselRef.current?.scrollTo({ index: currentPage + 1, animated: true });
    }
  }, [currentPage]);

  const handleGetStarted = () => {
    props.navigation.navigate('login');
  };

  const carouselData = AppConstants(handleNext, handleGetStarted);

  return {
    currentPage,
    carouselRef,
    numberOfPages,
    carouselData,
    renderDots,
    onSnapToItem,
    handleNext,
    handleGetStarted,
  };
};