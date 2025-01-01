import { useCallback, useRef, useState } from 'react';
import images from '../../../assets/assets';
import { CarouselScreenProps } from '../CarouselScreens/CarouselScreenProp';
import CarouselScreenComponentView from '../../Pages/Components/CarouselScreenComponent/CarouselScreenComponentView';
import { View } from 'react-native';
import { CarouselScreenStyles } from './CarouselScreen';

export const useCarouselScreenVM = (props: CarouselScreenProps) => {
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

  const carouselData = [
    {
      key: '1',
      component: (
        <CarouselScreenComponentView
          buttonText="Next"
          heading="Manage your tasks"
          description="You can easily manage all of your daily tasks in DoMe for free"
          image={images.IconCarouselSubScreenOne}
          handleNext={handleNext}
          imageHeight={400}
        imageWidth={400} 
        />
      ),
    },
    {
      key: '2',
      component: (
        <CarouselScreenComponentView
          buttonText="Next"
          heading="Create daily routine"
          description="In DoMe you can create your personalized routine to stay productive"
          image={images.IconCarouselSubScreenTwo}
          handleNext={handleNext}
          imageHeight={340}
          imageWidth={350}
          containerPadding={40}

        />
      ),
    },
    {
      key: '3',
      component: (
        <CarouselScreenComponentView
          buttonText="Get Started"
          heading="Organaize your tasks"
          description="You can organize your daily tasks Dy adding your tasks into separate cotegories"
          image={images.IconCarouselSubScreenThree}
          handleNext={handleGetStarted}
          imageHeight={340}
          imageWidth={350}
          containerPadding={50}
        />
      ),
    },
  ];

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

