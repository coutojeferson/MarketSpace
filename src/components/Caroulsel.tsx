import { Box, FlatList } from 'native-base';
import { Dimensions, Image } from 'react-native';

type ImageProps = {
  name: string;
  uri: string;
  type: string;
};

type Props = {
  active?: boolean;
  images?: Array<ImageProps>;
};

export function Carousel({ active = true, images }: Props) {
  const width = Dimensions.get('window').width;

  // const carouselData = [
  //   { id: 1, source: require('../assets/item.png') },
  //   { id: 2, source: require('../assets/item.png') },
  //   { id: 3, source: require('../assets/item.png') },
  //   // Adicione mais objetos para mais imagens
  // ];

  const carouselData = images;
  return (
    <FlatList
      opacity={active ? 1 : 0.6}
      data={images}
      horizontal
      pagingEnabled
      keyExtractor={(item) => item.uri}
      renderItem={({ item }) => (
        <Box>
          <Image
            source={{ uri: item.uri }}
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
