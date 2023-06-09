import { Box, CheckIcon, HStack, Text, VStack } from 'native-base';
import { Plus } from 'phosphor-react-native';
import { Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
import { Select } from 'native-base';
import { useState } from 'react';
import { CardItem } from '@components/CardItem';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Header } from '@components/Header';

export function AdDetails() {
  const [service, setService] = useState('Todos');
  const width = Dimensions.get('window').width;

  const carouselData = [
    { id: 1, source: require('../assets/item.png') },
    { id: 2, source: require('../assets/item.png') },
    { id: 3, source: require('../assets/item.png') },
    // Adicione mais objetos para mais imagens
  ];

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1} px={6} mt={9}>
      <Header hideTitle onPress={handleBack} />
      <Box mt={4}>
        <FlatList
          data={carouselData}
          horizontal
          pagingEnabled
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Box>
              <Image
                source={item.source}
                style={{
                  width: Dimensions.get('window').width - 48,
                  height: 200,
                }}
              />
            </Box>
          )}
        />
      </Box>
    </VStack>
  );
}
