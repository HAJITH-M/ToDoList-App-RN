import React from 'react'
import CarouselScreenComponentView from '../../../Pages/Components/CarouselScreenComponent/CarouselScreenComponentView';
import images from '../../../../assets/assets';
import { useCarouselScreenVM } from '../../../Screens/CarouselScreens/CarouselScreenVM';
import { CarouselScreenProps } from '../../../Screens/CarouselScreens/CarouselScreenProp';

const AppConstants = (props:CarouselScreenProps) => {

  const {
    handleNext,
    handleGetStarted,
    carouselRef  // Make sure to get carouselRef from VM
  } = useCarouselScreenVM(props);
  
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
        containerPadding={60}

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
    carouselData,
    carouselRef
  }
}

export default AppConstants