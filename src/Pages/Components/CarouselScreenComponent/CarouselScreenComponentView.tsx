import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CarouselScreenComponentProps } from './CarouselScreenComponentProps';
import ButtonComponentView from '../ButtonComponent/ButtonComponentView';



const CarouselScreenComponentView = (props: CarouselScreenComponentProps) => {
  return (
    <View style={[styles.container, { padding: props.containerPadding || 70}]}>
      <Image
        source={props.image}
        style={[styles.image, { width: props.imageWidth, height: props.imageHeight }]} // Use dynamic image width and height
      />
      <Text style={styles.heading}>{props.heading}</Text>
      <Text style={styles.description}>
        {props.description}
      </Text>
      <View style={styles.navigationContainer}>
       
        {/* <TouchableOpacity
          style={[styles.button]}
          onPress={props.handleNext}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity> */}

        <ButtonComponentView title={props.buttonText} onPress={props.handleNext}/>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 100,
    marginTop: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white'
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#fff',
    fontFamily: 'Arial',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    lineHeight: 22,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#667EAC',
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
  },
  visitedButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CarouselScreenComponentView;