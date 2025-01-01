export type CarouselScreenComponentProps = {
  handleNext: () => void;
  image: any;
  heading: string;
  description: string;
  buttonText: string;
  imageWidth: number;
  imageHeight: number;
  containerPadding?: number;
  carouselRef?: any
};
