import { api } from '@services/api';
import { Box, FlatList } from 'native-base';
import { Dimensions, Image } from 'react-native';

type Images = ImageProps & ImagePropsFromApi;

type ImageProps = {
  name: string;
  uri: string;
  type: string;
};
type ImagePropsFromApi = {
  id: string;
  path: string;
};
type Props = {
  active?: boolean;
  images?: Array<Images>;
};

export function Carousel({ active = true, images }: Props) {
  return (
    <FlatList
      opacity={active ? 1 : 0.6}
      data={images}
      horizontal
      pagingEnabled
      keyExtractor={(item: Images) => (item.uri ? item.uri : item.path)}
      renderItem={({ item }) => (
        <Box>
          <Image
            source={{
              uri: item.uri
                ? item.uri
                : `${api.defaults.baseURL}/images/${item.path}`,
            }}
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
