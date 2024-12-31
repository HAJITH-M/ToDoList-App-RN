import { StyleSheet, View, Text, Animated } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useEffect, useRef, useState } from 'react';

export default function CarouselScreen() {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const numberOfPages = 3;
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const autoScroll = () => {
      interval = setInterval(() => {
        if (pagerRef.current) {
          const nextPage = (currentPage + 1) % numberOfPages;
          pagerRef.current.setPage(nextPage);
          setCurrentPage(nextPage);
        }
      }, 3000);
    };
    
    autoScroll();
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentPage]);

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < numberOfPages; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            { backgroundColor: currentPage === i ? '#fff' : 'rgba(255, 255, 255, 0.5)' }
          ]}
        />
      );
    }
    return dots;
  };

  return (
    <View style={styles.container}>
      <PagerView 
        style={styles.container} 
        initialPage={0}
        ref={pagerRef}
        scrollEnabled={true}
        orientation="horizontal"
        onPageSelected={(e) => {
          setCurrentPage(e.nativeEvent.position);
        }}
      >
        <View style={styles.page} key="1">
          <Text>First page</Text>
          <Text>Swipe ➡️</Text>
        </View>
        <View style={styles.page} key="2">
          <Text>Second page</Text>
        </View>
        <View style={styles.page} key="3">
          <Text>Third page</Text>
        </View>
      </PagerView>
      <View style={styles.paginationContainer}>
        {renderDots()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3fe3',
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});