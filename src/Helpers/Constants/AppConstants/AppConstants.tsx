import images from "../../../../assets/assets";
import CarouselScreenComponentView from "../../../Pages/Components/CarouselScreenComponent/CarouselScreenComponentView";

export type CarouselItem = {
  key: string;
  component: JSX.Element;
};

export const AppConstants = (handleNext: () => void, handleGetStarted: () => void) => {
  return [
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
};