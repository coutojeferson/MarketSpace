import { Box, FlatList } from 'native-base';
import { Dimensions, Image } from 'react-native';

export function Carousel() {
  const width = Dimensions.get('window').width;

  const carouselData = [
    { id: 1, source: require('../assets/item.png') },
    { id: 2, source: require('../assets/item.png') },
    { id: 3, source: require('../assets/item.png') },
    // Adicione mais objetos para mais imagens
  ];

  return (
    <FlatList
      data={carouselData}
      horizontal
      pagingEnabled
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Box>
          <Image
            source={item.source}
            resizeMode="cover"
            style={{
              width: Dimensions.get('window').width,
              height: 200,
            }}
          />
        </Box>
      )}
    />
  );
}
